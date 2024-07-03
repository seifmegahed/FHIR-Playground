import { Patient } from "fhir/r4";
import { organizationId } from "./organization";

export async function createPatient(patient: Patient) {
  return await fetch("https://spark.incendi.no/fhir/Patient", {
    method: "POST",
    headers: {
      "Content-Type": "application/fhir+json",
    },
    body: JSON.stringify({
      ...patient,
      managingOrganization: { reference: `Organization/${organizationId}` },
    }),
  });
}

export async function getPatients(
  count: number,
  page: number
): Promise<{
  total: number;
  patients: Patient[];
}> {
  const _offset = page * count;
  return await fetch(
    `https://spark.incendi.no/fhir/Patient?_count=${count}&_offset=${_offset}&_sort=name&_sortDirection=asc&organization=${organizationId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/fhir+json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => ({
      total: data.total,
      patients: data.entry.map(
        (entry: { resource: Patient }) => entry.resource
      ),
    }));
}
