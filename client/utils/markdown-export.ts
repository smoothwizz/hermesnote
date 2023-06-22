import jsPDF from "jspdf";
import { FileMetadata } from "./../types/markdown";
import { saveFile } from "./save-utils";
import "./fonts/Montserrat-bold";
import "./fonts/Montserrat-bolditalic";
import "./fonts/Montserrat-italic";
import "./fonts/Montserrat-normal";

const MarkdownExport = {
  exportMarkdown,
  exportToPDF,
};

function formatTags(metadataTags: string) {
  const tags = metadataTags.split(",");
  let formattedTags = ``;

  tags.forEach((tag) => {
    formattedTags += `  - ${tag.toString().trim()}\n`;
  });

  return formattedTags;
}

function formatFrontMatter(metadata: FileMetadata) {
  let text = ``;

  text =
    "---\n" +
    `title: ${metadata.title}\n` +
    `description: ${metadata.description}\n` +
    `tags:\n` +
    `${formatTags(metadata.tags)}` +
    `---`;

  return text;
}

function exportMarkdown(
  content: string | undefined,
  frontMatter: FileMetadata,
  fileName: string
) {
  if (!content) {
    return;
  }

  const blob = new Blob([formatFrontMatter(frontMatter), content], {
    type: "text/markdown",
  });

  saveFile({ blob, fileName });
}

function exportToPDF(
  elementId: string,
  reportName: string,
  metadata: FileMetadata
) {
  const report = new jsPDF("portrait", "pt", "a4");
  const reportElement = document.querySelector(elementId) as HTMLElement;

  if (!reportElement) {
    return;
  }

  report.setProperties({
    title: metadata.title,
    keywords: metadata.tags,
  });

  const pdfMargin = {
    y: 5,
    x: 10,
  };

  const currentColor = reportElement.style.color;
  reportElement.style.color = "#131313";

  const htmlCanvasScale =
    (report.internal.pageSize.getWidth() - pdfMargin.x * 2) /
    reportElement.offsetWidth;
  //    report.internal.pageSize.width -
  //    (pdfMargin * 2) / document.body.clientWidth;

  return report
    .html(reportElement, {
      margin: [pdfMargin.y, pdfMargin.x, pdfMargin.y, pdfMargin.x],
      autoPaging: "text",
      html2canvas: {
        scale: htmlCanvasScale,
      },
    })
    .then(() => {
      report.save(reportName || "File.pdf");
    })
    .finally(() => {
      reportElement.style.color = currentColor;
    });
}

export default MarkdownExport;
