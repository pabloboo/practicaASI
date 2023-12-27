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
import InscriptionForm from "./Admin/addInscription";
import ScheduleForm from "./Admin/addSchedule";
import ClassScheduleForm from "./Admin/addClassSchedule";
import VisualizeCalendar from "./Teacher/VisualizeTeacherCalendar";
import VisualizeStudentCalendar from "./Student/VisualizeStudentCalendar";
import ModifyClassForm from "./Admin/modifyClass";

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
        <Route path="/seton" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
        {isAdmin && <Route path="/admin/home" element={<AdminHome/>}/>}
        {isAdmin && <Route path="/admin/addTeacher" element={<TeacherForm/>}/>}
        {isAdmin && <Route path="/admin/addStudent" element={<StudentForm/>}/>}
        {isAdmin && <Route path="/admin/addClass" element={<ClassForm/>}/>}
        {isAdmin && <Route path="/admin/addInscription" element={<InscriptionForm/>}/>}
        {isAdmin && <Route path="/admin/addSchedule" element={<ScheduleForm/>}/>}
        {isAdmin && <Route path="/admin/addClassSchedule" element={<ClassScheduleForm/>}/>}
        {isAdmin && <Route path="/admin/modifyClass" element={<ModifyClassForm/>}/>}
        {isStudent && <Route path="/student/home" element={<StudentHome/>}/>}
        {isStudent && <Route path="/student/visualizeSchedule" element={<VisualizeStudentCalendar/>}/>}
        {isTeacher && <Route path="/teacher/home" element={<TeacherHome/>}/>}
        {isTeacher && <Route path="/teacher/visualizeSchedule" element={<VisualizeCalendar/>}/>}
        <Route path="/admin/addClass" element={<div/>} />
      </Route>
    </Routes>
  );
};

export default Body;
