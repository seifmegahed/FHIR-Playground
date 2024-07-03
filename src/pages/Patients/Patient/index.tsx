import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Patient, Practitioner } from "fhir/r4";
import { getPatient } from "../../../server/patient";

import Loader from "../../../components/Loader";
import SectionTitle from "../../../components/SectionTitle";
import GeneralPractitionerUpdateSection from "./GeneralPractitionerUpdateSection";
import PatientGeneralDetailsSection from "./PatientGeneralDetailsSection";
import { getPractitionerByReference } from "../../../server/practitioner";

export default function PatientPage() {
  const [patient, setPatient] = useState<Patient>();
  const [generalPractitioner, setGeneralPractitioner] =
    useState<Practitioner>();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getPatient(id).then((res) => {
      setPatient(res);
    });
  }, [id]);

  useEffect(() => {
    if (
      patient !== undefined &&
      patient!.generalPractitioner![0].reference !== undefined
    )
      getPractitionerByReference(
        patient!.generalPractitioner![0].reference as string
      ).then((res) => {
        setGeneralPractitioner(res);
      });
  }, [patient]);

  if (patient === undefined) return <Loader />;

  return (
    <>
      <SectionTitle title="Patient" />
      <div className="flex-grow w-full bg-white m-10 rounded-2xl p-10">
        <div className="grid md:grid-cols-2 gap-4 w-full">
          <PatientGeneralDetailsSection patient={patient} />
          <div className="flex flex-col gap-2">
            <p>
              <strong>General Practitioner: </strong>
              {generalPractitioner === undefined ? (
                "None"
              ) : (
                <a
                  className="text-blue-500 underline"
                  href={`/practitioners/${generalPractitioner!.id}`}
                >
                  {generalPractitioner!.name?.[0]!.given![0] +
                    " " +
                    generalPractitioner.name?.[0]!.family}
                </a>
              )}
            </p>
          </div>
          <GeneralPractitionerUpdateSection
            updatePatient={setPatient}
            patient={patient}
          />
        </div>
      </div>
    </>
  );
}
