import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [studentID, setStudentID] = useState(() => {
    return localStorage.getItem('studentID') || null;
  });

  const [examID, setExamID] = useState(() => {
    return localStorage.getItem('examID') || null;
  });

  useEffect(() => {
    localStorage.setItem('studentID', studentID);
  }, [studentID]);

  useEffect(() => {
    localStorage.setItem('examID', examID);
  }, [examID]);

  return (
    <AppContext.Provider value={{ studentID, setStudentID, examID, setExamID }}>
      {children}
    </AppContext.Provider>
  );
};
