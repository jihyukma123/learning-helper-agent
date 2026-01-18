// script to fetch the latest commited file for the TIL repo
// use node native .env file loading when executing this file
// node --env-file=.env .opencode/skill/study-mentor/scripts/get_latest_file.js
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

const getLatestCommittedFileContents = async () => {
  // 1. get latest commits (fetch up to 10 to find a valid one)
  const commitRes = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?per_page=10`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    },
  );

  if (!commitRes.ok) {
    throw new Error(`Failed to fetch commits: ${commitRes.status}`);
  }

  const commits = await commitRes.json();

  let targetFile = null;
  let targetCommitSha = null;

  // Iterate through commits to find the first one with a valid (non-removed) file
  for (const commit of commits) {
    const commitDetailFetch = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits/${commit.sha}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!commitDetailFetch.ok) continue;

    const commitDetail = await commitDetailFetch.json();

    if (!commitDetail.files || commitDetail.files.length === 0) continue;

    const foundFile = commitDetail.files.find((f) => f.status !== "removed");

    if (foundFile) {
      targetFile = foundFile;
      targetCommitSha = commit.sha;
      break;
    }
  }

  if (!targetFile) {
    console.log("No valid (non-removed) files found in the latest 10 commits.");
    return;
  }

  const file = targetFile;
  const latestCommit = { sha: targetCommitSha };

  // get contents of that file
  const fileContentsFetch = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${file.filename}?ref=${latestCommit.sha}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    },
  );

  if (!fileContentsFetch.ok) {
    const errorText = await fileContentsFetch.text();
    throw new Error(
      `Failed to fetch file content for ${file.filename}: ${fileContentsFetch.status} - ${errorText}`,
    );
  }

  const fileContent = await fileContentsFetch.json();

  if (!fileContent.content) {
    throw new Error(
      `No content found in file response for ${file.filename}. It might be a directory or too large.`,
    );
  }

  const decodedContent = Buffer.from(fileContent.content, "base64").toString(
    "utf-8",
  );

  console.log(decodedContent);
};

getLatestCommittedFileContents();
