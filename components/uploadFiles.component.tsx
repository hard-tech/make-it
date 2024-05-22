"use client";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import UploadService from "../services/upload-files.service";
import { checkConnection } from "@/services/axiosConfig";
import { title } from "@/components/primitives";
import {Button, ButtonGroup} from "@nextui-org/button";

import "../styles/dropzone.css";

interface ProgressInfo {
  percentage: number;
  fileName: string;
}

interface FileInfo {
  name: string;
  url: string;
}

const UploadFiles: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [progressInfos, setProgressInfos] = useState<ProgressInfo[]>([]);
  const [message, setMessage] = useState<string[]>([]);
  const [fileInfos, setFileInfos] = useState<FileInfo[]>([]);
  const [connection, setConnection] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkConnectionAndFetchFiles() {
      const isConnected = await checkConnection();
      console.log(isConnected);

      setConnection(isConnected);

      if (isConnected) {
        UploadService.getFiles()
          .then((response) => {
            setFileInfos(response.data);
          })
          .catch((error) => {
            console.error("Error fetching files: ", error);
            setConnection(false);
          });
      }
    }

    checkConnectionAndFetchFiles();
  }, []);

  const onDrop = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const uploadFiles = () => {
    const _progressInfos = selectedFiles.map((file) => ({
      percentage: 0,
      fileName: file.name,
    }));

    setProgressInfos(_progressInfos);
    setMessage([]);

    selectedFiles.forEach((file, index) => {
      upload(index, file);
    });
  };

  const upload = (idx: number, file: File) => {
    const _progressInfos = [...progressInfos];

    UploadService.upload(file, (event: ProgressEvent) => {
      _progressInfos[idx] = _progressInfos[idx] || {
        percentage: 0,
        fileName: file.name,
      };
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setProgressInfos(_progressInfos);
    })
      .then((response) => {
        setMessage((prevMessage) => [
          ...prevMessage,
          `Uploaded the file successfully: ${file.name}`,
        ]);

        return UploadService.getFiles();
      })
      .then((files) => {
        setFileInfos(files.data);
      })
      .catch(() => {
        _progressInfos[idx] = _progressInfos[idx] || {
          percentage: 0,
          fileName: file.name,
        };
        _progressInfos[idx].percentage = 0;
        setProgressInfos(_progressInfos);
        setMessage((prevMessage) => [
          ...prevMessage,
          `Could not upload the file: ${file.name}`,
        ]);
      });
  };

  // Rendering based on connection status
  let content;
  if (connection === null) {
    content = <div>Checking connection...</div>;
  } else if (!connection) {
    content = (
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height: "100vh", textAlign: "center" }}
      >
        <h2 className={title({ size: "sm" })}>
          <br />
          <span className="text-secondary mt-10"><u>Failed to Connect to Server</u></span>
          <br />
          </h2>
          <p className="mt-4">
            Please check your internet connection and try again. If the issue
            persists, contact the administrator for assistance.
          </p>
          <Button
            color="secondary"
            className="mt-4"
            onClick={() => {
              window.location.reload();
            }}
          >
            Retry
          </Button>
      </div>
    );
  } else {
    content = (
      <div className="m-5">
        {progressInfos.map((progressInfo, index) => (
          <div className="mb-2" key={index}>
            <span>{progressInfo.fileName}</span>
            <div className="progress">
              <div
                className="progress-bar progress-bar-info"
                role="progressbar"
                aria-valuenow={progressInfo.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: `${progressInfo.percentage}%` }}
              >
                {progressInfo.percentage}%
              </div>
            </div>
          </div>
        ))}

        <div className="my-3">
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  {selectedFiles.length > 0 ? (
                    <div className="selected-file">
                      {selectedFiles.length > 3
                        ? `${selectedFiles.length} files`
                        : selectedFiles.map((file) => file.name).join(", ")}
                    </div>
                  ) : (
                    `Drag and drop files here, or click to select files`
                  )}
                </div>
                <aside className="selected-file-wrapper">
                  <button
                    className="btn btn-success"
                    disabled={selectedFiles.length === 0}
                    onClick={uploadFiles}
                  >
                    Upload
                  </button>
                </aside>
              </section>
            )}
          </Dropzone>
        </div>

        {message.length > 0 && (
          <div className="alert alert-secondary" role="alert">
            <ul>
              {message.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {fileInfos.length > 0 && (
          <div className="card">
            <div className="card-header">List of Files</div>
            <ul className="list-group list-group-flush">
              {fileInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return content;
};

export default UploadFiles;
