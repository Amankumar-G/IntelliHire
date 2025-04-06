

import { Button, Switch } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useState } from "react";
import { useToggle } from "../context/ToggleContext";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Moon icon
import WbSunnyIcon from "@mui/icons-material/WbSunny"; // Sun icon

function Header() {
  const location = useLocation();
  const { setUser } = useUser();
  // const [checked, setChecked] = useState(false);
  const { toggleDarkMode, setToggleDarkMode } = useToggle();

  const handleChange = (event) => {
    // setChecked(event.target.checked);
    setToggleDarkMode(event.target.checked);
  };
  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "ScreenWithAi", path: "/ScreenWithAi" },
    { name: "AgentStatus", path: "/AgentStatus" },
    { name: "ShortListed Candidate", path: "/ShortListedCandidate" },
    { name: "Interview", path: "/Interview" },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo & Title */}
        <h1 className="text-gray-800 dark:text-gray-200 flex items-center gap-2 text-lg font-bold">
          <PersonIcon className="text-gray-500 dark:text-gray-400" />
          IntelliHire
        </h1>

        {/* Navigation Links */}
        <nav className="flex gap-4 items-center">
          {navLinks.map((link) => (
            <div key={link.path} className="relative">
              <Link
                to={link.path}
                className={`text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors ${
                  location.pathname === link.path ? "font-bold" : ""
                }`}
              >
                {link.name}
              </Link>
              {location.pathname === link.path && (
                <div className="absolute bottom-0 left-1/2 w-4/5 h-0.5 bg-black dark:bg-white transform -translate-x-1/2 transition-all" />
              )}
            </div>
          ))}
          {/* <Switch
            checked={toggleDarkMode}
            onChange={handleChange}
            icon={<WbSunnyIcon className="text-yellow-500" />} // Sun when off
            checkedIcon={<Brightness4Icon className="text-gray-500" />} // Moon when on
          /> */}
        </nav>
      </div>
    </header>
  );
}

export default Header;
