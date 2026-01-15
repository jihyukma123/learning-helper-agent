// script to fetch the latest commited file for the TIL repo
// use node native .env file loading when executing this file
// node --env-file=.env .opencode/skill/study-mentor/scripts/get_latest_file.js
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

const getLatestCommittedFileContents = async () => {
  // 1. get the latest commit
  const commitRes = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?per_page=1`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!commitRes.ok) {
    throw new Error(`Failed to fetch commits: ${commitRes.status}`);
  }

  // get latest commit
  const [latestCommit] = await commitRes.json();

  // 2. 커밋 상세 정보 가져오기 (파일 목록 포함)
  const commitDetailFetch = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits/${latestCommit.sha}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  const commitDetail = await commitDetailFetch.json();

  // get changed file
  const [file] = commitDetail.files;

  // get contents of that file
  const fileContentsFetch = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${file.filename}?ref=${latestCommit.sha}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  const fileContent = await fileContentsFetch.json();

  const decodedContent = Buffer.from(fileContent.content, "base64").toString(
    "utf-8"
  );

  console.log(decodedContent);
};

getLatestCommittedFileContents();
