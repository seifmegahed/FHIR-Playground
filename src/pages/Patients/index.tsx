import { getPatients } from "../../server/patient";
import { useEffect } from "react";

const itemsPerPage = 10;
const pageIndex = 0;

export default function PatientsPage() {
  useEffect(() => {
    const print = async () => {
      const data = await getPatients(itemsPerPage, pageIndex);
      console.log(data.total);
      data.patients.map((patient) => {
        console.log(
          patient.name?.[0]?.family + ", " + patient.name?.[0]?.given?.[0] ??
            "No name",
          "- Id: " + patient.id,
          "- Organization: " + patient.managingOrganization?.reference
        );
      });
    };
    print();
  }, []);
  return <div className="text-4xl">Patients</div>;
}
