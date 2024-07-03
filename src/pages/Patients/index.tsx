import { useEffect, useState } from "react";
import { Patient } from "fhir/r4";

import SectionTitle from "../../components/SectionTitle";
import { getPatients } from "../../server/patient";
import Loader from "../../components/Loader";
import Pagination from "../../components/pagination/";

const itemsPerPage = 10;

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [numPages, setNumPages] = useState(1);
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
      <PatientsTable patients={patients} loading={loading} />
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

function PatientsTable(props: { patients: Patient[]; loading: boolean }) {
  const { patients, loading } = props;
  return (
    <table className="w-full table-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <thead className="text-left text-lg h-16 bg-blue-100">
        <tr>
          <th className="w-12"></th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody className="relative">
        {patients.map((patient, index) => (
          <tr
            className="border-t border-gray-200 hover:bg-gray-100 h-12 cursor-pointer"
            key={patient.id}
          >
            <td className="text-center">{index + 1}</td>
            <td>{patient.name?.[0]?.family || ""}</td>
            <td>{patient.name?.[0]?.given?.[0] || ""}</td>
            <td>{patient.birthDate || ""}</td>
            <td>{patient.gender || ""}</td>
          </tr>
        ))}
        {loading && <Loader />}
      </tbody>
    </table>
  );
}
