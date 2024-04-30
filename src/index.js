import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/home/home';
import { RegisterBook } from './pages/register-book';
import { RegisterStudent } from './pages/register-student';
import { Students } from './pages/students/index'
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "registerBook",
    element: <RegisterBook/>
  },
  {
    path: "registerStudent",
    element: <RegisterStudent/>
  },
  {
    path: "students",
    element: <Students/>
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
