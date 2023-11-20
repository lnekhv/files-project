import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FileShortModel } from "../../models/File";
import { downloadFile } from "../../services/FileService";
import "./BasicTable.css";

type Props = {
  data: FileShortModel[];
  onEnrichedData: (fileId: number) => void;
  onPreviewData: (fileId: number) => void;
};

const columnHelper = createColumnHelper<any>();

const handleDownload = (info: any) => {
  downloadFile(info.row.original.id, info.row.original.name);
};

const BasicTable = ({ data, onEnrichedData, onPreviewData }: Props) => {
  const handleEditClick = (info: any) => {
    onEnrichedData(info.row.original.id);
  };

  const handlePreviewData = (info: any) => {
    onPreviewData(info.row.original.id);
  };

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("action", {
      header: "Action",
      cell: (info) => (
        <div className="action-buttons">
          <button
            className="action-button"
            onClick={() => handleDownload(info)}
          >
            Download
          </button>
          <button
            className="action-button"
            onClick={() => handleEditClick(info)}
          >
            Edit
          </button>
          <button
            className="action-button"
            onClick={() => handlePreviewData(info)}
          >
            Preview
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="base-table-container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default BasicTable;
