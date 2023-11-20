import axios from "axios";
import { Config } from "../config/config";
import { FileModel, FileShortModel } from "../models/File";

export const getFilesList = async () => {
  return axios.get<FileShortModel[]>(
    `http://${Config.backendHost}:${Config.backendPort}/files`
  );
};

export const getFileDataById = async (id: number) => {
  return axios.get<FileModel>(
    `http://${Config.backendHost}:${Config.backendPort}/files/${id}`
  );
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post<FileShortModel>(
    `http://${Config.backendHost}:${Config.backendPort}/files`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const downloadFile = async (id: number, name: string) => {
  try {
    axios
      .get<FileModel>(
        `http://${Config.backendHost}:${Config.backendPort}/files/${id}`
      )
      .then((response) => {
        const responseData = response.data;

        const blob = new Blob([responseData.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${name.split(".")[0] ?? "file"}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      });
  } catch (error) {
    throw error;
  }
};
