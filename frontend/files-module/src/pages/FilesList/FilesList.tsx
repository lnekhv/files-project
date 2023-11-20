import { Button, Dialog, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicTable from "../../components/BasicTable/BasicTable";
import DataEnricher from "../../components/EnrichComponent/EnrichComponent";
import UploadDialog from "../../components/UploadDialog/UploadDialog";
import {
  getFileDataById,
  getFilesList,
  uploadFile,
} from "../../services/FileService";
import "./FilesList.css";

const FileList = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [enrichedFile, setEnrichedFile] = useState<any | null>(null);
  const [files, setFiles] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handlePreview = (fileId: number) => {
    navigate(`/files/preview/${fileId}`);
  };

  const handleUploadDialogOpen = () => {
    setIsUploadDialogOpen(true);
  };

  const handleUploadDialogClose = (file: File) => {
    setIsUploadDialogOpen(false);
    handleUploadFile(file);
  };

  const handleUploadFile = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    uploadFile(file)
      .then((response) => {
        setUploadedFile(file);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const fetchFiles = () => {
    getFilesList()
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  };

  const handleEnrichData = async (id: number) => {
    getFileDataById(id)
      .then((response) => {
        const { data } = response.data;
        setEnrichedFile(data);
        setIsEditDialogOpen(true);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  useEffect(() => {
    fetchFiles();
  }, [uploadedFile, enrichedFile]);

  return (
    <div>
      <div className="header-container">
        <h2 className="title">File List</h2>
        <Button
          className="upload-button"
          variant="outlined"
          onClick={handleUploadDialogOpen}
        >
          Upload file
        </Button>
        <UploadDialog
          open={isUploadDialogOpen}
          onClose={handleUploadDialogClose}
        ></UploadDialog>
      </div>
      {files.length > 0 ? (
        <BasicTable
          data={files}
          onEnrichedData={handleEnrichData}
          onPreviewData={handlePreview}
        ></BasicTable>
      ) : (
        <div>No files</div>
      )}

      <Dialog
        onClose={handleEditDialogClose}
        open={isEditDialogOpen}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit</DialogTitle>
        <DataEnricher
          csvData={enrichedFile}
          onClose={(data) => {
            setEnrichedFile(data);
            setIsEditDialogOpen(false);
          }}
        ></DataEnricher>
      </Dialog>
    </div>
  );
};

export default FileList;
