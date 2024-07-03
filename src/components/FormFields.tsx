import InputField from "./InputField";
import SelectField from "./SelectField";

export type TextFieldType = {
  label: string;
  name: string;
  required: boolean;
  type: "text";
};

export type SelectFieldType = {
  label: string;
  name: string;
  required: boolean;
  type: "select";
  options: string[];
};

export default function FormFields(
  props: {
    fields: (TextFieldType | SelectFieldType)[];
    onChange: (name: string, value: string) => void;
    values: { [key: string]: string }
  },
) {
  return (
    <>
      {props.fields.map((field) =>
        field.type === "text" ? (
          <InputField
            key={field.name}
            label={field.label}
            value={props.values[field.name]}
            required={field.required}
            onChange={(value) => props.onChange(field.name, value)}
          />
        ) : (
          <SelectField
            key={field.name}
            label={field.label}
            value={props.values[field.name]}
            options={field.options}
            required={field.required}
            onChange={(value) => props.onChange(field.name, value)}
          />
        )
      )}
    </>
  );
}
