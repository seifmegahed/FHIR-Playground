import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Practitioner } from "fhir/r4";

import { getPractitioners } from "../../server/practitioner";

import SectionTitle from "../../components/SectionTitle";
import Pagination from "../../components/pagination/";
import PractitionersTable from "../../components/PractitionersTable";

const itemsPerPage = 10;

export default function PractitionersPage() {
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [numPages, setNumPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await getPractitioners(itemsPerPage, pageIndex);
      setNumPages(Math.ceil(data.total / itemsPerPage));
      setPractitioners(data.practitioners);
      setLoading(false);
    };
    getData();
  }, [pageIndex]);

  return (
    <>
      <SectionTitle title="Practitioners" />
      <div className="flex justify-end w-full">
        <button
          className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 mb-4 rounded-lg"
          onClick={() => navigate("/practitioners/new")}
        >
          Add Practitioner
        </button>
      </div>
      <PractitionersTable
        practitioners={practitioners}
        loading={loading}
        pageIndex={pageIndex}
        itemsPerPage={itemsPerPage}
        onClick={(practitioner) => navigate(`/practitioners/${practitioner.id}`)}
      />
      <div className="flex-grow p-5 flex gap-2">
        <Pagination
          pageIndex={pageIndex}
          numPages={numPages}
          onPageChange={setPageIndex}
        />
      </div>
    </>
  );
}
