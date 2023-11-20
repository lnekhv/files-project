import { IconButton } from "@mui/material";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFileDataById } from "../../services/FileService";
import { FaArrowLeft } from "react-icons/fa";

import "./CsvPreview.css";

const PreviewPage = () => {
  const { id } = useParams();
  const [fileData, setFileData] = useState<any | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    getFileDataById(+id!)
      .then((response) => {
        const responseData = response.data;
        setFileName(responseData.name);

        const data = responseData.data;
        const results = Papa.parse(data, { header: true });
        setFileData(results.data);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, [id]);

  return (
    fileData && (
      <div>
        <div className="preview-header">
          <IconButton aria-label="back" onClick={() => navigate(`/files`)}>
            <FaArrowLeft />
          </IconButton>
          <h2>{fileName}</h2>
        </div>
        <div className="preview-table-container">
          <table>
            <thead>
              <tr>
                {fileData.length > 0 &&
                  Object.keys(fileData[0]).map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {fileData.map((row: any, index: any) => (
                <tr key={index}>
                  {Object.values(row).map((value: any, columnIndex) => (
                    <td key={columnIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default PreviewPage;
