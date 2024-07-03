import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../../../components/Loader";
import SectionTitle from "../../../components/SectionTitle";
import PersonGeneralDetailsSection from "../../../components/PersonGeneralDetailsSection";
import { getPractitioner } from "../../../server/practitioner";
import { Practitioner } from "fhir/r4";

export default function PractitionerPage() {
  const [practitioner, setPractitioner] = useState<Practitioner>();

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getPractitioner(id).then((res) => {
      setPractitioner(res);
    });
  }, [id]);

  if (practitioner === undefined) return <Loader />;

  return (
    <>
      <SectionTitle title="Practitioner" />
      <div className="flex-grow w-full bg-white m-10 rounded-2xl p-10">
        <div className="grid md:grid-cols-2 gap-4 w-full">
          <PersonGeneralDetailsSection person={practitioner} prefix="Dr." />
        </div>
      </div>
    </>
  );
}
