import { Practitioner } from "fhir/r4";

export async function getPractitioner(id: string): Promise<Practitioner> {
  return await fetch(`https://spark.incendi.no/fhir/Practitioner/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/fhir+json",
      Accept: "application/fhir+json",
    },
  }).then((res) => res.json());
}

export async function getPractitionerByReference(
  ref: string
): Promise<Practitioner> {
  return await fetch(`https://spark.incendi.no/fhir/${ref}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/fhir+json",
      Accept: "application/fhir+json",
    },
  }).then((res) => res.json());
}

export async function getPractitioners(
  count: number,
  page: number
): Promise<{
  total: number;
  practitioners: Practitioner[];
}> {
  const _offset = page * count;
  return await fetch(
    // `https://spark.incendi.no/fhir/Practitioner?_count=${count}&_offset=${_offset}&_sort=name&_sortDirection=asc&organization=${organizationId}`,
    `https://spark.incendi.no/fhir/Practitioner?_count=${count}&_offset=${_offset}&_sort=name&_sortDirection=asc`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/fhir+json",
        Accept: "application/fhir+json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => ({
      total: data.total,
      practitioners: data.entry.map(
        (entry: { resource: Practitioner }) => entry.resource
      ),
    }));
}
