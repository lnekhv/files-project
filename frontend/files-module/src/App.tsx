import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import PreviewPage from "./pages/CsvPreview/CsvPreview";
import FilesList from "./pages/FilesList/FilesList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/files" element={<FilesList />} />
          <Route path="/files/preview/:id" element={<PreviewPage />} />
          <Route path="*" element={<Navigate to="/files" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
