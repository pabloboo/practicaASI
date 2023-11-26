import React from "react";

import { Route, Routes } from "react-router-dom";

import Test from "./Test";
import Login from "./Login";
import AdminHome from "./Admin/adminHome";
import AdminLogin from "./Admin/adminLogin";
import TeacherForm from "./Admin/addTeacher";
import StudentForm from "./Admin/addStudent";

const Body = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index exact element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/addTeacher" element={<TeacherForm />} />
        <Route path="/admin/addStudent" element={<StudentForm />} />
      </Route>
    </Routes>
  );
};

export default Body;
