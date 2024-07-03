import { Patient } from "fhir/r4";

export async function getPatients(page: number, count: number): Promise<{
  total: number;
  patients: Patient[];
}> {
  const _offset = page * count;
  return await fetch(`https://spark.incendi.no/fhir/Patient?_count=${count}&_offset=${_offset}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/fhir+json",
    },
  })
    .then((res) => res.json())
    .then((data) => ({
      total: data.total,
      patients: data.entry.map(
        (entry: { resource: Patient }) => entry.resource
      ),
    }));
}
