import { useState } from "react";

import SectionTitle from "../../../components/SectionTitle";
import FormFields from "../../../components/FormFields";
import SaveButton from "../../../components/SaveButton";
import MagicFillButton from "../../../components/MagicFillButton";
import Loader from "../../../components/Loader";

import { newPractitionerFields } from "./newPractitionerFields";
import { createPractitioner } from "../../../server/practitioner";
import { useNavigate } from "react-router-dom";

const practitionerInitialState = newPractitionerFields.reduce(
  (acc: { [key: string]: string }, field) => {
    acc[field.name] = "";
    return acc;
  },
  {}
);

export default function NewPractitionerPage() {
  const [practitioner, setPractitioner] = useState(practitionerInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      setIsLoading(true);
      createPractitioner({
        resourceType: "Practitioner",
        name: [
          {
            family: practitioner.lastName,
            given: [practitioner.firstName],
          },
        ],
        birthDate: `${practitioner.yearOfBirth}-${
          Number(practitioner.monthOfBirth) < 10 ? "0" : ""
        }${practitioner.monthOfBirth}-${
          Number(practitioner.dayOfBirth) < 10 ? "0" : ""
        }${practitioner.dayOfBirth}`,
        gender: practitioner.gender as "male" | "female" | "other",
        telecom: [
          {
            system: "phone",
            value: practitioner.phone,
          },
          {
            system: "email",
            value: practitioner.email,
          },
        ],
        address: [
          {
            city: practitioner.city,
            country: practitioner.country,
          },
        ],
      })
        .then((res) => {
          res.json().then((data) => {
            navigate(`/practitioners/${data.id}`)
            // setPractitioner(practitionerInitialState);
          });
        })
        .catch((err) => {
          console.error("Error creating practitioner", err);
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
          setPractitioner({
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
      <SectionTitle title="New Practitioner" />
      <div className="h-full flex-grow w-full relative">
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-x-5 px-12 pt-5 pb-8 bg-white shadow-lg rounded-3xl w-full"
        >
          <div className="flex justify-end md:col-span-2">
            <MagicFillButton onClick={handleMagicFill} />
          </div>
          <FormFields
            fields={newPractitionerFields}
            values={practitioner}
            onChange={(name, value) =>
              setPractitioner({ ...practitioner, [name]: value })
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
