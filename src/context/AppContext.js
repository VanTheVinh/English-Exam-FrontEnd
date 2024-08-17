import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [studentID, setStudentID] = useState(null);
  const [examID, setExamID] = useState(null);

  return (
    <AppContext.Provider value={{ studentID, setStudentID, examID, setExamID }}>
      {children}
    </AppContext.Provider>
  );
};
