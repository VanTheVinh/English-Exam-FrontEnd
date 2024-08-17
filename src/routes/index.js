import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '~/pages/home';
import Login from '../pages/login/Login.js';
import ForgotPassword from '~/pages/forgotPassword';
import Profile from '~/pages/profile';
import StudentDashboard from '~/pages/student/dashboard';
import StudentExamsPage from '~/pages/student/examsPage';
import TaskExam from '~/pages/student/takeExam';
import TeacherDashboard from '~/pages/teacher/dashboard';
import ManageClasses from '~/pages/teacher/manageClasses';
import ManageExams from '~/pages/teacher/manageExams';
import ManageQuestions from '~/pages/teacher/manageQuestions';
import ManageStudents from '~/pages/teacher/manageStudents';
import PublishResults from '~/pages/teacher/publishResults';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/exams-page/take-exam" element={<TaskExam />} />
        <Route path="/student/exams-page/:classId" element={<StudentExamsPage />}/>

        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/manage-classes" element={<ManageClasses />} />
        <Route path="/teacher/manage-exams" element={<ManageExams />} />
        <Route path="/teacher/manage-questions" element={<ManageQuestions />} />
        <Route path="/teacher/manage-students" element={<ManageStudents />} />
        <Route path="/teacher/publishResults" element={<PublishResults />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
