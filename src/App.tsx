import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import PageWrapper from "./components/PageWrapper";
import NotFoundPage from "./pages/NotFound";
import HomePage from "./pages/Home";
import PatientsPage from "./pages/Patients";

function App() {
  return (
    <div className="font-inter w-screen min-h-screen bg-gray-100 flex flex-col items-center gap-5">
      <NavBar />
      <PageWrapper>
        <Routes>
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/patients" element={<PatientsPage />} />
        </Routes>
      </PageWrapper>
    </div>
  );
}

export default App;
