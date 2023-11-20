import "./UploadFile.css";

interface FileUploaderProps {
  onFileUpload: (data: File) => void;
}

const FileUploader = ({ onFileUpload }: FileUploaderProps) => {
  return (
    <div className="upload-container">
      <input type="file" onChange={(e) => onFileUpload(e.target.files![0])} />
    </div>
  );
};

export default FileUploader;
