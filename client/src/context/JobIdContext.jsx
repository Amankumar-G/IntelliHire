import React, { createContext, useState, useContext } from "react";

const JobIdContext = createContext();

export function JobIdProvider({ children }) {
  const [jobIdcurr, setJobIdcurr] = useState();

  return (
    <JobIdContext.Provider value={{ jobIdcurr, setJobIdcurr }}>
      {children}
    </JobIdContext.Provider>
  );
}

export function useJobID() {
  return useContext(JobIdContext);
}
