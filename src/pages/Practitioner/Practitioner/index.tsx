import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Patient, Practitioner } from "fhir/r4";

import { getPractitioner } from "../../../server/practitioner";
import { getPatientsByPractitioner } from "../../../server/patient";

import Loader from "../../../components/Loader";
import SectionTitle from "../../../components/SectionTitle";
import PersonGeneralDetailsSection from "../../../components/PersonGeneralDetailsSection";
import PatientsTable from "../../../components/PatientsTable";
import Pagination from "../../../components/pagination/";

const itemsPerPage = 10;

export default function PractitionerPage() {
  const [practitioner, setPractitioner] = useState<Practitioner>();
  const [patientsInCare, setPatientsInCare] = useState<Patient[]>();
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [numPages, setNumPages] = useState(1);

  const { id } = useParams();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    getPractitioner(id).then((res) => {
      setPractitioner(res);
    });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getPatientsByPractitioner(id, pageIndex, itemsPerPage)
      .then((res) => {
        setPatientsInCare(res.patients);
        setNumPages(Math.ceil(res.total / itemsPerPage));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pageIndex, id]);

  if (practitioner === undefined) return <Loader />;

  return (
    <>
      <SectionTitle title="Practitioner" />
      <div className="flex-grow w-full bg-white m-10 rounded-2xl p-10">
        <div className="grid md:grid-cols-2 gap-12 w-full">
          <PersonGeneralDetailsSection person={practitioner} prefix="Dr." />
          {patientsInCare !== undefined && patientsInCare.length > 0 && (
            <div className="col-span-2 flex flex-col gap-2 justify-center items-center">
              <div className="w-full">
                <p className="text-2xl font-bold mb-3">Patients in Care:</p>
              </div>
              <PatientsTable
                patients={patientsInCare}
                loading={loading}
                pageIndex={pageIndex}
                itemsPerPage={itemsPerPage}
                onClick={(patient) => navigate(`/patients/${patient.id}`)}
              />
              <Pagination
                pageIndex={pageIndex}
                numPages={numPages}
                onPageChange={setPageIndex}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
