import { Patient, Person, Practitioner } from "fhir/r4";

export default function PersonGeneralDetailsSection(props: {
  person: Person | Patient | Practitioner;
  prefix?: string;
}) {
  const { person, prefix } = props;
  return (
    <>
      <div className="col-span-2">
        <div className="flex justify-between text-2xl font-bold mb-3">
          <h1>
            {(prefix ? prefix + " " : "") +
              person.name![0].given![0] +
              " " +
              person.name![0].family}
          </h1>
          <h1>{person.address![0].city}</h1>
        </div>
        <hr></hr>
      </div>
      <div className="flex flex-col gap-2">
        <p>
          <strong>ID: </strong>
          {person.id}
        </p>
        <p>
          <strong>Date of Birth: </strong>
          {person.birthDate}
        </p>
        <p>
          <strong>Gender: </strong>
          {person.gender}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p>
          <strong>Address: </strong>
          {person.address![0].city + ", " + person.address![0].country}
        </p>
        <p>
          <strong>Phone Number: </strong>
          {person.telecom![0].value}
        </p>
        <p>
          <strong>Email: </strong>
          {person.telecom![1].value}
        </p>
      </div>
    </>
  );
}
