import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import FileUploader from "./UploadFile/UploadFile";
import "./UploadDialog.css";

export interface DialogProps {
  open: boolean;
  onClose: (value: any) => void;
}

const UploadDialog = (props: DialogProps) => {
  const { onClose, open } = props;
  const [selectedFile, setFile] = useState<File | null>(null);

  const handleClose = () => {
    onClose(selectedFile);
  };

  const handleListItemClick = () => {
    onClose(selectedFile);
  };

  const handleFileUpload = (data: File) => {
    setFile(data);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm">
      <DialogTitle>Set backup account</DialogTitle>
      <FileUploader onFileUpload={handleFileUpload} />
      <div className="button-container">
        <Button
          className="save-button"
          variant="contained"
          onClick={handleListItemClick}
        >
          Save
        </Button>
      </div>
    </Dialog>
  );
};
export default UploadDialog;
