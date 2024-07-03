import { useState } from "react";

import SectionTitle from "../../../components/SectionTitle";
import FormFields from "../../../components/FormFields";
import SaveButton from "../../../components/SaveButton";
import MagicFillButton from "../../../components/MagicFillButton";

import { newPatientFields } from "./newPatientFields";

const patientInitialState = newPatientFields.reduce(
  (acc: { [key: string]: string }, field) => {
    acc[field.name] = "";
    return acc;
  },
  {}
);

export default function NewPatientPage() {
  const [patient, setPatient] = useState(patientInitialState);

  return (
    <>
      <SectionTitle title="New Patient" />
      <div className="h-full flex-grow w-full">
        <form className="grid md:grid-cols-2 gap-x-5 px-12 pt-5 pb-8 bg-white shadow-lg rounded-3xl w-full">
          <div className="flex justify-end md:col-span-2">
            <MagicFillButton onClick={() => {}} />
          </div>
          <FormFields
            fields={newPatientFields}
            onChange={(name, value) =>
              setPatient({ ...patient, [name]: value })
            }
          />
          <div className="flex justify-end md:col-span-2">
            <SaveButton onClick={() => {}} />
          </div>
        </form>
      </div>
    </>
  );
}
