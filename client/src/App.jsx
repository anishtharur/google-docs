import TextEditor from "./TextEditor";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={<Navigate to={`/document/${uuidV4()}`} />}
          />
          <Route path="/document/:id" element={<TextEditor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
