import { Navigate, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import PageWrapper from "./components/PageWrapper";
import NotFoundPage from "./pages/NotFound";
import PatientsPage from "./pages/Patients";
import NewPatientPage from "./pages/Patients/New";
import PatientPage from "./pages/Patients/Patient";
import PractitionersPage from "./pages/Practitioner";
import NewPractitionerPage from "./pages/Practitioner/New";
import PractitionerPage from "./pages/Practitioner/Practitioner";

function App() {
  return (
    <div className="font-inter w-screen min-h-screen bg-gray-100 flex flex-col items-center gap-5">
      <NavBar />
      <PageWrapper>
        <Routes>
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/" element={<Navigate to="/patients" />} />
          <Route path="/practitioners" element={<PractitionersPage />} />
          <Route path="/practitioners/new" element={<NewPractitionerPage />} />
          <Route path="/practitioners/:id" element={<PractitionerPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients/new" element={<NewPatientPage />} />
          <Route path="/patients/:id" element={<PatientPage />} />
        </Routes>
      </PageWrapper>
    </div>
  );
}

export default App;
