import MagicIcon from "../../../icons/MagicIcon";
import InputField from "../../../components/InputField";
import SelectField from "../../../components/SelectField";
import SectionTitle from "../../../components/SectionTitle";

import { genderOptions, monthOptions, yearOptions, dayOptions } from "../../../utils/constants";

import { useState } from "react";

type TextField = {
  label: string;
  name: string;
  required: boolean;
  type: "text";
};

type SelectField = {
  label: string;
  name: string;
  required: boolean;
  type: "select";
  options: string[];
};

const formFields: (TextField | SelectField)[] = [
  {
    label: "First Name",
    name: "firstName",
    required: true,
    type: "text",
  },
  {
    label: "Last Name",
    name: "lastName",
    required: true,
    type: "text",
  },
  {
    label: "Email",
    name: "email",
    required: true,
    type: "text",
  },
  {
    label: "Phone",
    name: "phone",
    required: true,
    type: "text",
  },
  {
    label: "City",
    name: "city",
    required: true,
    type: "text",
  },
  {
    label: "Country",
    name: "country",
    required: true,
    type: "text",
  },
  {
    label: "Gender",
    name: "gender",
    required: true,
    type: "select",
    options: genderOptions,
  },
  {
    label: "Year of Birth",
    name: "yearOfBirth",
    required: true,
    type: "select",
    options: yearOptions,
  },
  {
    label: "Month of Birth",
    name: "monthOfBirth",
    required: true,
    type: "select",
    options: monthOptions,
  },
  {
    label: "Day of Birth",
    name: "dayOfBirth",
    required: true,
    type: "select",
    options: dayOptions,
  },
];


const patientInitialState = formFields.reduce((acc: { [key: string]: string }, field) => {
  acc[field.name] = "";
  return acc;
}, {});

/*{
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  country: "",
  gender: "",
  yearOfBirth: "",
  monthOfBirth: "",
  dayOfBirth: "",
};*/

export default function NewPatientPage() {
  const [patient, setPatient] = useState(patientInitialState);

  return (
    <>
      <SectionTitle title="New Patient" />
      <div className="h-full flex-grow w-full">
        <form className="grid md:grid-cols-2 gap-x-5 px-12 pt-5 pb-8 bg-white shadow-lg rounded-3xl w-full">
          <div className="flex justify-end md:col-span-2">
            <button
              className=" hover:bg-gray-200 p-4 rounded-full transition-all duration-300 ease-in-out"
              onClick={() => {}}
              color="primary"
            >
              <MagicIcon />
            </button>
          </div>
          {formFields.map((field) => field.type === "text" ? 
          (
            <InputField
              key={field.name}
              label={field.label}
              value={patient[field.name]}
              required={field.required}
              onchange={(value) => setPatient({ ...patient, [field.name]: value })}
            />
          ) : (
            <SelectField
              key={field.name}
              label={field.label}
              value={patient[field.name]}
              options={field.options}
              onchange={(value) => setPatient({ ...patient, [field.name]: value })}
            />
          ))} 
          <div className="flex justify-end md:col-span-2">
            <button
              className="bg-blue-500 hover:bg-blue-300 text-white font-bold text-lg py-2 px-4 my-4 rounded-lg w-48 transition-all duration-300 ease-in-out"
              onClick={() => {}}
              color="primary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
