import { NavLink } from "react-router";
import SearchByRadius from "./search/SearchByRadius";
import SearchByArea from "./search/SearchByArea";

const Navbar = () => {
  return (
    <div className="flex items-center justify-around gap-x-10 p-3 bg-zinc-400 top-0 sticky z-30 ">
      <NavLink
        to="/"
        className={({ isActive }) => {
          return `${
            isActive ? "border-b-2 border-orange-400" : ""
          } justify-start `;
        }}
      >
        Home
      </NavLink>
      <SearchByArea />
      <SearchByRadius />

      <NavLink
        to="/booked-studio"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-orange-400" : ""
        }
      >
        Booked-Sudio
      </NavLink>
    </div>
  );
};

export default Navbar;
