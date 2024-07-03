import { useState } from "react";

import SectionTitle from "../../../components/SectionTitle";
import FormFields from "../../../components/FormFields";
import SaveButton from "../../../components/SaveButton";
import MagicFillButton from "../../../components/MagicFillButton";
import Loader from "../../../components/Loader";

import { newPatientFields } from "./newPatientFields";
import { createPatient } from "../../../server/patient";

const patientInitialState = newPatientFields.reduce(
  (acc: { [key: string]: string }, field) => {
    acc[field.name] = "";
    return acc;
  },
  {}
);

export default function NewPatientPage() {
  const [patient, setPatient] = useState(patientInitialState);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      setIsLoading(true);
      createPatient({
        resourceType: "Patient",
        name: [
          {
            family: patient.lastName,
            given: [patient.firstName],
          },
        ],
        birthDate: `${patient.yearOfBirth}-${
          Number(patient.monthOfBirth) < 10 ? "0" : ""
        }${patient.monthOfBirth}-${Number(patient.dayOfBirth) < 10 ? "0" : ""}${
          patient.dayOfBirth
        }`,
        gender: patient.gender as "male" | "female" | "other",
        telecom: [
          {
            system: "phone",
            value: patient.phone,
          },
          {
            system: "email",
            value: patient.email,
          },
        ],
        address: [
          {
            city: patient.city,
            country: patient.country,
          },
        ],
      })
        .then((res) => {
          console.log(
            "Successfully created patient",
            res.json().then((data) => data)
          );
        })
        .catch((err) => {
          console.error("Error creating patient", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  async function handleMagicFill() {
    setIsLoading(true);
    await fetch("https://randomuser.me/api/?nat=NL&results=1")
      .then((res) =>
        res.json().then((data) => {
          const dob = new Date(data.results[0].dob.date);
          setPatient({
            firstName: data.results[0].name.first,
            lastName: data.results[0].name.last,
            email: data.results[0].email,
            phone: data.results[0].phone,
            city: data.results[0].location.city,
            country: data.results[0].location.country,
            gender: data.results[0].gender,
            yearOfBirth: String(dob.getFullYear()),
            monthOfBirth: String(dob.getMonth() + 1),
            dayOfBirth: String(dob.getDate()),
          });
        })
      )
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <SectionTitle title="New Patient" />
      <div className="h-full flex-grow w-full relative">
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-x-5 px-12 pt-5 pb-8 bg-white shadow-lg rounded-3xl w-full"
        >
          <div className="flex justify-end md:col-span-2">
            <MagicFillButton onClick={handleMagicFill} />
          </div>
          <FormFields
            fields={newPatientFields}
            values={patient}
            onChange={(name, value) =>
              setPatient({ ...patient, [name]: value })
            }
          />
          <div className="flex justify-end md:col-span-2">
            <SaveButton />
          </div>
          {isLoading && <Loader />}
        </form>
      </div>
    </>
  );
}
