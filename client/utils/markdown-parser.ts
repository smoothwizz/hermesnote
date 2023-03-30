import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BacklogFile } from "../types/markdown";

const FILE_FOLDER = "docs";

function getPath(folder: string) {
  return path.join(process.cwd(), `/${folder}`); // Get full path
}

function getFileContent(filename: string, fileFolder = FILE_FOLDER) {
  const DOCS_PATH = getPath(fileFolder);
  return fs.readFileSync(path.join(DOCS_PATH, filename), "utf8");
}

const getAllFilesDescriptions = (fileFolder = FILE_FOLDER) => {
  const DOCS_PATH = getPath(fileFolder);

  return fs
    .readdirSync(DOCS_PATH)
    .filter((file) => file.endsWith(".md"))
    .map((fileName) => {
      // map over each file
      const source = getFileContent(fileName, fileFolder); // retrieve the file contents
      const slug = fileName.replace(".md", ""); // get the slug from the filename
      const { data } = matter(source); // extract frontmatter
      return {
        frontMatter: data,
        slug: slug,
      };
    });
};

const getFileDescription = (slug: string | unknown) => {
  if (!slug) {
    console.error("No slug" + slug);
    return;
  }

  const source = getFileContent(`${slug}.md`);
  const { data: frontMatter, content } = matter(source);
  const file: BacklogFile = {
    frontMatter,
    content,
  };

  return file;
};

const MarkdownParser = {
  getAllFilesDescriptions,
  getFileDescription,
};

export default MarkdownParser;
