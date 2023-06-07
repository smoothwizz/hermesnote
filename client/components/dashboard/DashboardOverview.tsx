import { FileMetadata } from "@/types/markdown";
import React from "react";
import Button from "../Forms/Button";
import FileEditor from "../file/FileEditor";
import FileInfo from "../file/FileInfo";
import { TabListItem, TAB_LIST } from "./constants";
import DashboardActions from "./DashboardActions";

type Props = {
  fileSelectorLabel: string;
  isSelectedFileParsed: boolean;
  selectedTab: string;
  metadata: FileMetadata;
  contentEdited: string;
  pdfSettings: { areaName: string; fileName: string };
  fileNameEdited: string;
  setContentEdited: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTab: React.Dispatch<React.SetStateAction<TabListItem>>;
  handleOpenFile: () => Promise<void>;
  handleCreateFile: () => void;
  handleFileNameChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleMetadataChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleExportToMD: (fileName: string) => void;
  handleExportToPDF: () => void;
};

const DashboardOverview = (props: Props) => {
  const {
    fileSelectorLabel,
    handleOpenFile,
    handleCreateFile,
    isSelectedFileParsed,
    selectedTab,
    setSelectedTab,
    fileNameEdited,
    handleFileNameChange,
    metadata,
    handleMetadataChange,
    contentEdited,
    setContentEdited,
    pdfSettings,
    handleExportToMD,
    handleExportToPDF,
  } = props;

  const dashboardActionsProps = {
    fileSelectorLabel,
    handleOpenFile,
    handleCreateFile,
  };

  return (
    <div className="dashboard-container">
      <DashboardActions {...dashboardActionsProps} />

      {isSelectedFileParsed && (
        <div>
          {renderTabs()}
          {selectedTab === "info" && (
            <FileInfo
              fileNameEdited={fileNameEdited}
              handleFileNameChange={handleFileNameChange}
              metadata={metadata}
              handleMetadataChange={handleMetadataChange}
            />
          )}

          {selectedTab === "editor" && (
            <FileEditor
              contentEdited={contentEdited}
              setContentEdited={setContentEdited}
              pdfAreaName={pdfSettings.areaName}
            />
          )}
          {selectedTab === "editor" && renderExportButtons()}
        </div>
      )}
    </div>
  );

  function renderExportButtons(): React.ReactNode {
    return (
      <div className="dashboard-container__file-controls">
        <Button
          variant="primary"
          handleClick={() => handleExportToMD(fileNameEdited || "File.md")}
          label={"Export to .md"}
        />

        <Button
          variant="primary"
          handleClick={() => handleExportToPDF()}
          label={"Export to .pdf"}
        />
      </div>
    );
  }

  function renderTabs() {
    return (
      <nav className="tabs">
        <ul>
          {TAB_LIST.map((tab) => {
            return (
              <li
                className={`tab ${
                  tab.id === selectedTab ? "tab--is-active" : ""
                }`}
              >
                <button onClick={() => setSelectedTab(tab.id)}>
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
};

export default DashboardOverview;