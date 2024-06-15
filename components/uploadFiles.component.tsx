"use client"

import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import UploadService from "../services/comPyling/upload-files.service";
// import { checkConnection } from "@/services/axiosConfig";
import { title } from "@/components/primitives";
import { Button, ButtonGroup } from "@nextui-org/button";
import "../styles/dropzone.css";

// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from "@nextui-org/input";
import { generateRandomString } from "@/utils/generateRandomString";

interface FileInfo {
  name: string;
  url: string;
}

const UploadFiles: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileInfos, setFileInfos] = useState<FileInfo[]>([]);
  const [connection, setConnection] = useState<boolean | null>(null);
  const [folderName, setFolderName] = useState<string>('');

  useEffect(() => {

    // set in folder name a random string length of 126 characters
    if(localStorage.getItem('folderName') === null) {
      let randomString = generateRandomString(126);
      localStorage.setItem('folderName', randomString);
      setFolderName(randomString);
    } else {
      setFolderName(localStorage.getItem('folderName') as string);
    }

    async function checkConnectionStatus() {
      const isConnected = true; // Tout le temps liée au back-end (en attendant le déploiement)
      setConnection(isConnected);
    }

    checkConnectionStatus();
  }, []);

  const onDrop = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const uploadFiles = () => {
    selectedFiles.forEach((file, index) => {
      upload(index, file);
    });
  };
  
  const upload = async (idx: number, file: File) => {
    try {
      const response = UploadService.upload(file, folderName);
  
      toast.promise(response, {
        pending: "Le fichier est en cours de téléchargement...",
        success: `Le fichier ${file.name} a été téléchargé avec succès!`,
        error: `Le fichier ${file.name} n'a pas pu être téléchargé!`,
      });
  
      const res = await response;
  
      if (res.status === 200 || res.status === 201) {
        console.log(`Uploaded the file successfully: ${file.name}`);
      } else {
        console.error(`Could not upload the file: ${file.name}`, res.statusText);
      }
    } catch (error) {
      console.error(`Could not upload the file: ${file.name}`, error);
    }
  };
  

  const getCompilePictures = async () => {
    const response = UploadService.compileFile(folderName);

    toast.promise(response, {
      pending: "Le fichier est en cours de téléchargement...",
      success: `Le fichier ${folderName}.pdf a été compiler avec succès!`,
      error: `Le fichier ${folderName}.pdf n'a pas pu être compiler!`,
    });

    const res = await response;

    if (res.status === 200 || res.status === 201) {
      console.log(`Compilie the file successfully: ${folderName}.pdf`); 
      window.location.href = `outputs/${folderName}.pdf`;
    } else {
      console.error(`Could not compilie the file: ${folderName}.pdf`, res.statusText);
    }
  };

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
          <span className="text-secondary mt-10">
            <u>Failed to Connect to Server</u>
          </span>
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
        {/* <div className="mb-4 flex items-center">
          <label htmlFor="folderName" className="min-w-max me-2">Folder Name</label>
          <Input
            type="text"
            id="folderName"
            variant="bordered"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="form-control"
          />
        </div> */}

        <div className="my-3">
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className="flex items-center flex-col">
                <div
                  {...getRootProps({
                    className:
                      "dropzone inline-block max-w-lg hover:brightness-50 max-w-full duration-300 text-center justify-center p-8 m-8 border-2 flex items-center rounded-[25px]",
                  })}
                >
                  <input {...getInputProps()} />
                  {selectedFiles.length > 0 ? (
                    <h1>
                      <div className="selected-file">
                        {selectedFiles.length > 3
                          ? `${selectedFiles.length} files`
                          : selectedFiles.map((file) => file.name).join(", ")}
                      </div>
                    </h1>
                  ) : (
                    <h1 className="">
                      <b>Drag and drop files here, or click to select files</b>
                    </h1>
                  )}
                </div>
                <aside className="selected-file-wrapper">
                  <Button
                    color="secondary"
                    className="btn btn-success mx-2"
                    disabled={selectedFiles.length === 0}
                    isDisabled={selectedFiles.length === 0}
                    onClick={uploadFiles}
                  >
                    Upload
                  </Button>
                  <Button
                    color="success"
                    isDisabled={selectedFiles.length === 0}
                    className="btn btn-success mx-2 text-white"
                    onClick={getCompilePictures}
                  >
                    Compile
                  </Button>
                  <Button
                    color="danger"
                    className="btn btn-success mx-2"
                    isDisabled={selectedFiles.length === 0}
                    onClick={() => {
                      localStorage.removeItem('folderName')

                      let randomString = generateRandomString(126);
                      localStorage.setItem('folderName', randomString);
                      setFolderName(randomString);

                      toast.success('Folder name is changed', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        rtl: true,
                        pauseOnFocusLoss: true,
                        progress: undefined,
                      })
                    }}
                  >
                    renow folder name
                  </Button>
                </aside>
              </section>
            )}
          </Dropzone>
        </div>

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
        <ToastContainer />
      </div>
    );
  }

  return content;
};

export default UploadFiles;