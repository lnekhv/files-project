import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./EnrichComponent.css";
import Papa from "papaparse";
import { Button } from "@mui/material";
import { uploadFile } from "../../services/FileService";
import { useForm } from "react-hook-form";
import { Options, jsonToPlainText } from "json-to-plain-text";

const jsonToStringOptions: Options = {
  color: false,
  spacing: true,
  seperator: ":",
  squareBracketsForArray: false,
  doubleQuotesForKeys: false,
  doubleQuotesForValues: false,
};

interface DataEnricherProps {
  csvData: string;
  onClose: (data: any) => void;
}

const DataEnricher = ({ csvData, onClose }: DataEnricherProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [columns, setColumns] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const columns = csvData.split("\r\n")[0].split(",");
    setColumns(columns);

    setValue("apiEndpoint", "https://jsonplaceholder.typicode.com/posts/");
    setValue("keyColumnName", columns[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createFile = useCallback((data: any) => {
    const newCsvData = Papa.unparse(data);
    const blob = new Blob([newCsvData], { type: "text/csv;charset=utf-8;" });
    return new File([blob], "new_file.csv", {
      type: "text/csv;charset=utf-8;",
    });
  }, []);

  const enrichData = async (data: any) => {
    const { apiEndpoint, keyColumnName, apiKeyName } = data;
    try {
      //get all rows from csv
      const rows = csvData
        .split("\r\n")
        .slice(1)
        .map((line) => line.split(","));

      //parse it to json
      const jsonData = rows.map((row) => {
        const rowData: any = {};
        columns.forEach((column, index) => {
          rowData[column.trim()] = row[index].trim();
        });
        return rowData;
      });

      // get file from selected endpoint
      let apiData: any = null;
      await axios.get(apiEndpoint).then((response) => {
        apiData = response.data;
      });

      //stringlify objects in json
      let keyExists = false;
      if (apiKeyName && keyColumnName && apiData) {
        apiData = apiData.map((apiRow: any) => {
          const newRow = Object.entries(apiRow).reduce(
            (acc: any, [key, value]: [any, any]) => {
              keyExists = keyExists || key === apiKeyName;
              if (typeof value === "object") {
                acc[key] = jsonToPlainText(value, jsonToStringOptions);
              } else {
                acc[key] = value.toString();
              }
              return acc;
            },
            {}
          );

          return newRow;
        });

        //merge files
        if (keyExists) {
          let enrichedData = jsonData.map((row) => {
            const apiRow = apiData.find(
              (apiRow: any) => apiRow[apiKeyName] === row[keyColumnName]
            );

            //fill blank lines with null values
            if (!apiRow) {
              Object.keys(apiData[0]).forEach((apiKey) => {
                if (!(apiKey in row)) {
                  row[apiKey] = null;
                }
              });
            }

            const mergedRow = { ...row, ...apiRow };

            // delete apiKeyName from the merged object
            delete mergedRow[apiKeyName];

            return mergedRow;
          });

          const newFile = createFile(enrichedData);

          uploadFile(newFile)
            .then((response) => {
              onClose(response.data);
            })
            .catch((error) => {
              console.error("Error uploading file:", error);
            });
        } else {
          setError("There is no such API key");
        }
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(enrichData)}>
      <div className="content">
        <div className="content-element">
          <label>API Endpoint:</label>
          <input
            className="input"
            type="text"
            {...register("apiEndpoint", { required: true })}
          />
          {errors.apiEndpoint && <span>This field is required</span>}
        </div>
        <div className="content-element">
          <label>Key Column Name:</label>
          <select
            className="input"
            {...register("keyColumnName", { required: true })}
          >
            {columns &&
              columns.map((key, index) => (
                <option key={index} value={key}>
                  {key}
                </option>
              ))}
          </select>
          {errors.keyColumnName && <span>This field is required</span>}
        </div>
        <div className="content-element">
          <label>API Key Name:</label>
          <input
            className="input"
            type="text"
            {...register("apiKeyName", { required: true })}
          />
          {errors.apiKeyName && <span>This field is required</span>}
          {error && <span>Error: {error}</span>}
        </div>

        <div className="buttons">
          <Button variant="contained" type="submit">
            Enrich Data
          </Button>

          <Button variant="outlined" onClick={() => onClose(true)}>
            close
          </Button>
        </div>
      </div>
    </form>
  );
};

export default DataEnricher;
