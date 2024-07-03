import { Practitioner } from "fhir/r4";
import Loader from "./Loader";

export default function PractitionersTable(props: {
  practitioners: Practitioner[];
  loading: boolean;
  pageIndex: number;
  itemsPerPage: number;
  selectedPractitioner?: Practitioner | null;
  onClick: (practitioner: Practitioner) => void;
}) {
  const {
    practitioners,
    loading,
    pageIndex,
    itemsPerPage,
    selectedPractitioner,
    onClick,
  } = props;
  return (
    <table className="w-full table-auto bg-white rounded-xl overflow-hidden">
      <thead className="text-left text-lg h-16 bg-blue-100">
        <tr>
          <th className="w-12"></th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody className="relative">
        {!loading ? (
          <>
            {practitioners.map((practitioner, index) => (
              <tr
                key={practitioner.id}
                onClick={() => onClick(practitioner)}
                className={`border-t border-gray-200 h-12 cursor-pointer ${
                  selectedPractitioner?.id === practitioner.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <td className="text-center">
                  {index + 1 + pageIndex * itemsPerPage}
                </td>
                <td>
                  {practitioner.name?.[0]?.given?.[0] +
                    " " +
                    practitioner.name?.[0]?.family || ""}
                </td>
                <td>{practitioner.telecom?.[0]?.value || ""}</td>
                <td>{practitioner.telecom?.[1]?.value || ""}</td>
                <td>{practitioner.address?.[0]?.city || ""}</td>
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
