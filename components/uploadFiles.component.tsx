"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import UploadService from "../services/upload-files.service";

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

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setFileInfos(response.data);
    });
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
      _progressInfos[idx] = _progressInfos[idx] || { percentage: 0, fileName: file.name }; // Vérifie si l'élément existe, sinon le crée
      _progressInfos[idx].percentage = Math.round((100 * event.loaded) / event.total);
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
        _progressInfos[idx] = _progressInfos[idx] || { percentage: 0, fileName: file.name }; // Vérifie si l'élément existe, sinon le crée
        _progressInfos[idx].percentage = 0;
        setProgressInfos(_progressInfos);
        setMessage((prevMessage) => [
          ...prevMessage,
          `Could not upload the file: ${file.name}`,
        ]);
      });
  };
  

  return (
    <div>
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
};

export default UploadFiles;
