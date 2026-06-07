const GITHUB_API_URL = 'https://api.github.com';
const OWNER = process.env.GITHUB_OWNER || 'devyanshujadon';
const REPO = process.env.GITHUB_REPO || 'profile';

export interface GitHubUser {
  login: string;
  id: number;
  name: string;
  email: string;
}

export async function getGitHubUser(accessToken: string): Promise<GitHubUser> {
  const response = await fetch(`${GITHUB_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub user');
  }
  
  return response.json();
}

export async function createFile(
  accessToken: string,
  path: string,
  content: string,
  message: string
): Promise<void> {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${OWNER}/${REPO}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString('base64'),
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `[createFile] target=${OWNER}/${REPO} path=${path} status=${response.status} body=${errorText}`
    );
    let detail = `GitHub API ${response.status}`;
    try {
      const parsed = JSON.parse(errorText);
      if (parsed.message) detail = parsed.message;
    } catch {}
    throw new Error(`[${OWNER}/${REPO}] ${detail}`);
  }
}

export async function getFile(
  accessToken: string,
  path: string
): Promise<{ content: string; sha: string } | null> {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${OWNER}/${REPO}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to fetch file');
  }

  const data = await response.json();
  return {
    content: Buffer.from(data.content, 'base64').toString('utf-8'),
    sha: data.sha,
  };
}

export async function updateFile(
  accessToken: string,
  path: string,
  content: string,
  message: string,
  sha: string
): Promise<void> {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${OWNER}/${REPO}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString('base64'),
        sha,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update file');
  }
}