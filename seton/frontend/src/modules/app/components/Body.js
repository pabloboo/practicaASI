import React from "react";

import { Route, Routes } from "react-router-dom";

import Test from "./Test";
import RegisterUser from "./RegisterUser";
import Login from "./Login";
import AdminHome from "./Admin/adminHome";
import AdminLogin from "./Admin/adminLogin";
import TeacherForm from "./Admin/addTeacher";

const Body = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index exact element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/addTeacher" element={<TeacherForm />} />
      </Route>
    </Routes>
  );
};

export default Body;
