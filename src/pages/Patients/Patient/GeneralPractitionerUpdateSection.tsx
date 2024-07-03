import { useEffect, useState } from "react";
import { Patient, Practitioner } from "fhir/r4";

import { getPractitioners } from "../../../server/practitioner";
import { addGP } from "../../../server/patient";

import InputField from "../../../components/InputField";
import SearchButton from "../../../components/SearchButton";
import SaveButton from "../../../components/SaveButton";
import DropDownSection from "../../../components/DropDownSection";
import Pagination from "../../../components/pagination/";
import PractitionersTable from "../../../components/PractitionersTable";

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
          <PractitionersTable
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
