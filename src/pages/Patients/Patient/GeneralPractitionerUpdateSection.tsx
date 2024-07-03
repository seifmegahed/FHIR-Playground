import InputField from "../../../components/InputField";
import SearchButton from "../../../components/SearchButton";
import SaveButton from "../../../components/SaveButton";

export default function GeneralPractitionerUpdateSection() {
  return (
    <>
      <div className="col-span-2 mt-4">
        <h1 className="text-2xl font-bold mb-3">Update GP</h1>
        <hr></hr>
      </div>
      <div className="col-span-2">
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
          <div
            className="mt-2"
            onClick={() => {
              console.log("save");
            }}
          >
            <SaveButton />
          </div>
        </div>
      </div>
    </>
  );
}
