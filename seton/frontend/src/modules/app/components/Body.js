import React, { useState, useEffect } from "react";

import { Route, Routes, useLocation } from "react-router-dom";

import Test from "./Test";
import Login from "./Login";
import AdminHome from "./Admin/adminHome";
import AdminLogin from "./Admin/adminLogin";
import TeacherForm from "./Admin/addTeacher";
import StudentForm from "./Admin/addStudent";
import StudentHome from "./Student/studentHome";
import TeacherHome from "./Teacher/teacherHome";
import ClassForm from "./Admin/addClass";

const Body = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'ADMIN') {
      setIsAdmin(true);
    } else if (role === 'STUDENT') {
      setIsStudent(true);
    } else if (role === 'TEACHER') {
      setIsTeacher(true);
    }
    setLoading(false);
  }, [location.pathname]); // Observa cambios en la ubicación (ruta)

  if (loading) {
    return <div>Loading...</div>; // Indicador de carga mientras se cargan los roles
  }

  return (
    <Routes>
      <Route path="/">
        <Route index exact element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/admin" element={<AdminLogin />} />
        {isAdmin && <Route path="/admin/home" element={<AdminHome/>}/>}
        {isAdmin && <Route path="/admin/addTeacher" element={<TeacherForm/>}/>}
        {isAdmin && <Route path="/admin/addStudent" element={<StudentForm/>}/>}
        {isAdmin && <Route path="/admin/addClass" element={<ClassForm/>}/>}
        {isStudent && <Route path="/student/home" element={<StudentHome/>}/>}
        {isTeacher && <Route path="/teacher/home" element={<TeacherHome/>}/>}
        <Route path="/admin/addClass" element={<div/>} />
      </Route>
    </Routes>
  );
};

export default Body;
