import { useEffect, useState } from "react";
import { Patient, Practitioner } from "fhir/r4";

import { getPractitioners } from "../../../server/practitioner";
import { addGP } from "../../../server/patient";

import InputField from "../../../components/InputField";
import SearchButton from "../../../components/SearchButton";
import SaveButton from "../../../components/SaveButton";
import DropDownSection from "../../../components/DropDownSection";
import Pagination from "../../../components/pagination/";
import Loader from "../../../components/Loader";

const itemsPerPage = 10;

export default function GeneralPractitionerUpdateSection(props: {
  patient: Patient;
  updatePatient: (patient: Patient) => void;
}) {
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [numPages, setNumPages] = useState(1);
  const [selectedPractitioner, setSelectedPractitioner] =
    useState<Practitioner | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getPractitioners(itemsPerPage, pageIndex);
      setNumPages(Math.ceil(data.total / itemsPerPage));
      setPractitioners(data.practitioners);
      setLoading(false);
    }
    setLoading(true);
    fetchData();
  }, [pageIndex]);

  function saveGP() {
    if (!selectedPractitioner?.id) return;
    setLoading(true);
    addGP(props.patient, selectedPractitioner.id)
      .then((res) => {
        setSelectedPractitioner(null);
        setOpen(false);
        return res.json();
      })
      .then((res) => {
        props.updatePatient(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <DropDownSection
        open={open}
        toggleOpen={() => setOpen((prev) => !prev)}
        className="col-span-2 mt-4"
        title="Update GP"
      >
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex gap-2 justify-center items-center w-1/2 h-16">
              <InputField
                label="Search"
                value=""
                onChange={(val) => {
                  console.log(val);
                }}
              />
              <div className="mt-8">
                <SearchButton onClick={() => {}} />
              </div>
            </div>
            <div className="mt-2">
              <SaveButton
                onClick={saveGP}
                disabled={selectedPractitioner === null}
              />
            </div>
          </div>
          <PractitionerTable
            practitioners={practitioners}
            loading={loading}
            pageIndex={pageIndex}
            itemsPerPage={itemsPerPage}
            selectedPractitioner={selectedPractitioner}
            onClick={(practitioner) =>
              setSelectedPractitioner((prev) =>
                prev?.id === practitioner.id ? null : practitioner
              )
            }
          />
          <div className="p-5 flex gap-2 w-full justify-center">
            <Pagination
              pageIndex={pageIndex}
              numPages={numPages}
              onPageChange={setPageIndex}
            />
          </div>
        </div>
      </DropDownSection>
    </>
  );
}

function PractitionerTable(props: {
  practitioners: Practitioner[];
  loading: boolean;
  pageIndex: number;
  itemsPerPage: number;
  selectedPractitioner: Practitioner | null;
  onClick: (practitioner: Practitioner) => void;
}) {
  const {
    practitioners,
    loading,
    pageIndex,
    itemsPerPage,
    selectedPractitioner,
    onClick,
  } = props;
  return (
    <table className="w-full table-auto bg-white rounded-xl overflow-hidden">
      <thead className="text-left text-lg h-16 bg-blue-100">
        <tr>
          <th className="w-12"></th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody className="relative">
        {!loading ? (
          <>
            {practitioners.map((practitioner, index) => (
              <tr
                key={practitioner.id}
                onClick={() => onClick(practitioner)}
                className={`border-t border-gray-200 h-12 cursor-pointer ${
                  selectedPractitioner?.id === practitioner.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <td className="text-center">
                  {index + 1 + pageIndex * itemsPerPage}
                </td>
                <td>
                  {practitioner.name?.[0]?.given?.[0] +
                    " " +
                    practitioner.name?.[0]?.family || ""}
                </td>
                <td>{practitioner.telecom?.[0]?.value || ""}</td>
                <td>{practitioner.telecom?.[1]?.value || ""}</td>
                <td>{practitioner.address?.[0]?.city || ""}</td>
              </tr>
            ))}
          </>
        ) : (
          <tr>
            <td className="h-96">
              <Loader />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
