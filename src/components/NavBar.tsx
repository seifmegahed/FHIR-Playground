import { useNavigate } from "react-router-dom";

const links = [
  {
    name: "Patients",
    path: "/patients",
  },
  {
    name: "Practitioners",
    path: "/practitioners",
  },
  {
    name: "Medicine",
    path: "/medicine",
  },
];

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-blue-400 h-24 flex items-center justify-between text-3xl text-white">
      <div
        className="flex h-full items-center justify-center p-5 hover:bg-white/50 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <p>FHIR Tests</p>
      </div>
      <div className="flex items-center h-full">
        {links.map((link) => (
          <div
            className="flex h-full items-center justify-center p-5 hover:bg-white/50 cursor-pointer"
            onClick={() => navigate(link.path)}
          >
            <p>{link.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
