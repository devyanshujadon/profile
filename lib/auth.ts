import { AuthOptions, getServerSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

/**
 * GitHub logins allowed to use the CMS.
 * Set ADMIN_GITHUB_USERS="you,coauthor" (comma-separated), or fall back to GITHUB_OWNER.
 */
export function getAdminLogins(): string[] {
  const raw =
    process.env.ADMIN_GITHUB_USERS ||
    process.env.GITHUB_OWNER ||
    "devyanshujadon";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminLogin(login?: string | null): boolean {
  if (!login) return false;
  return getAdminLogins().includes(login.toLowerCase());
}

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
      // CMS only needs identity — no repo write scope
      authorization: {
        params: { scope: "read:user user:email" },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // profile.login is the GitHub username for the GitHub provider
      const login =
        (profile as { login?: string } | undefined)?.login || null;
      if (!isAdminLogin(login)) {
        console.warn(
          `[auth] Rejected GitHub sign-in for non-admin: ${login ?? "unknown"}`
        );
        return false;
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile && "login" in profile) {
        token.githubLogin = String(
          (profile as { login?: string }).login || ""
        );
      }
      // Stamp admin flag for session checks
      token.isAdmin = isAdminLogin(
        (token.githubLogin as string | undefined) || null
      );
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      session.githubLogin = (token.githubLogin as string) || undefined;
      session.isAdmin = Boolean(token.isAdmin);
      return session;
    },
  },
  pages: {
    // Failed allowlist sign-in lands here with error=AccessDenied
    error: "/blog/admin",
    signIn: "/blog/admin",
  },
};

/** Session only if the user is on the admin allowlist. */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.isAdmin) return null;
  return session;
}
