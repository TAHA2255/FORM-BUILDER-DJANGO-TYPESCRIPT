import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import FormsPage from "./Pages/FormsPage";
import { FieldProvider } from "./Helpers/FieldContext";

const App = () => {
  return (
    <div>
      <Navbar />

      <Router>
        <FieldProvider>
          <Routes>
            <Route path="/" element={<FormsPage />} />
          </Routes>
        </FieldProvider>
      </Router>
    </div>
  );
};

export default App;
