import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  contentEdited: string;
  pdfAreaName: string;
};

const FilePreviewPane = ({ contentEdited, pdfAreaName }: Props) => {
  return (
    <article className="file">
      <div className="file__export">
        <div className="file__pdf-export" id={pdfAreaName}>
          <div className="file__pdf-export-window">
            <ReactMarkdown
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            >
              {contentEdited}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FilePreviewPane;
