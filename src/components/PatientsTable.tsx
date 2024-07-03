import { Patient } from "fhir/r4";
import Loader from "./Loader";

export default function PatientsTable(props: {
  patients: Patient[];
  loading: boolean;
  pageIndex: number;
  itemsPerPage: number;
  onClick: (patient: Patient) => void;
}) {
  const { patients, loading, pageIndex, itemsPerPage, onClick } = props;

  return (
    <table className="w-full table-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <thead className="text-left text-lg h-16 bg-blue-100">
        <tr>
          <th className="w-12"></th>
          <th>Name</th>
          <th>City</th>
          <th>Date of Birth</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody className="relative">
        {!loading ? (
          <>
            {patients.map((patient, index) => (
              <tr
                key={patient.id}
                className="border-t border-gray-200 hover:bg-gray-100 h-12 cursor-pointer"
                onClick={() => onClick(patient)}
              >
                <td className="text-center">
                  {index + 1 + pageIndex * itemsPerPage}
                </td>
                <td>
                  {patient.name?.[0]?.given?.[0] +
                    " " +
                    patient.name?.[0]?.family || ""}
                </td>
                <td>{patient.address?.[0]?.city || ""}</td>
                <td>{patient.birthDate || ""}</td>
                <td>{patient.gender || ""}</td>
              </tr>
            ))}
          </>
        ) : (
          <tr>
            <td className="h-96">
              <Loader />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
