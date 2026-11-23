import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SITE } from "@/lib/site";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const themeScript = `(function(){
  var root = document.documentElement;
  function apply(next){
    root.setAttribute("data-theme", next);
    root.style.colorScheme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    var dark = next !== "light";
    var label = dark ? "Dark theme on, switch to light" : "Light theme on, switch to dark";
    var nodes = document.querySelectorAll(".theme-switch");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].setAttribute("data-dark", dark ? "true" : "false");
      nodes[i].setAttribute("aria-checked", dark ? "true" : "false");
      nodes[i].setAttribute("aria-label", label);
    }
  }
  try {
    var saved = localStorage.getItem("theme");
    apply(saved === "light" || saved === "dark" ? saved : "dark");
  } catch (e) {
    apply("dark");
  }
  if (window.__themeBound) return;
  window.__themeBound = true;
  document.addEventListener("click", function(event){
    var target = event.target;
    if (!target || !target.closest) return;
    if (!target.closest(".theme-switch")) return;
    apply(root.getAttribute("data-theme") === "light" ? "dark" : "light");
  });
})();`;

export const metadata: Metadata = {
  title: {
    template: "%s · Devyanshu",
    default: "Devyanshu Jadon — AI & Software Developer",
  },
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Sans is served from Google's CDN but is not in the
            next/font catalog, so it is loaded with a plain stylesheet. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${sans.variable} antialiased`}
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
