import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Patient } from "fhir/r4";

import { getPatients } from "../../server/patient";

import SectionTitle from "../../components/SectionTitle";
import Pagination from "../../components/pagination/";
import PatientsTable from "../../components/PatientsTable";

const itemsPerPage = 10;

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [numPages, setNumPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await getPatients(itemsPerPage, pageIndex);
      setNumPages(Math.ceil(data.total / itemsPerPage));
      setPatients(data.patients);
      setLoading(false);
    };
    getData();
  }, [pageIndex]);

  return (
    <>
      <SectionTitle title="Patients" />
      <div className="flex justify-end w-full">
        <button
          className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 mb-4 rounded-lg"
          onClick={() => navigate("/patients/new")}
        >
          Add Patient
        </button>
      </div>
      <PatientsTable
        patients={patients}
        loading={loading}
        pageIndex={pageIndex}
        itemsPerPage={itemsPerPage}
        onClick={(patient) => navigate(`/patients/${patient.id}`)}
      />
      <div className="flex-grow p-5 flex gap-2">
        <Pagination
          pageIndex={pageIndex}
          numPages={numPages}
          onPageChange={setPageIndex}
        />
      </div>
    </>
  );
}
