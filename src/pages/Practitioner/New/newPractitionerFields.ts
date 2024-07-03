
import { TextFieldType, SelectFieldType } from "../../../components/FormFields";
import {
  genderOptions,
  monthOptions,
  yearOptions,
  dayOptions,
} from "../../../utils/constants";

export const newPractitionerFields: (TextFieldType | SelectFieldType)[] = [
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