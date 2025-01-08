import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './pages/login';
import { Home } from './pages/home/index';
import { Rents } from './pages/rents-page';
import { RegisterBook } from './pages/register-book';
import { RegisterStudent } from './pages/register-student';
import { StudentsPage } from './pages/students-page';
import { Error } from './pages/not-found';
import { RentsPending } from './pages/rents-pending';
import { RentsReturned } from './pages/rents-returned';
import { BooksCatalog } from './pages/books-catalog';
import { Credits } from './pages/credits';
import { GroupsPage } from './pages/groups-page';
import { RegisterUser } from './pages/register-user';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/registerUser",
    element: <RegisterUser />
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/books",
    element: <BooksCatalog />
  },
  {
    path: "/rents",
    element: <Rents/>
  },
  {
    path: "/rents-pending",
    element: <RentsPending/>
  },
  {
    path: "/rents-returned",
    element: <RentsReturned/>
  },  
  {
    path: "/registerBook",
    element: <RegisterBook/>
  },
  {
    path: "/registerStudent",
    element: <RegisterStudent/>
  },
  {
    path: "/groups",
    element: <GroupsPage/>
  },
  {
    path: "/students",
    element: <StudentsPage/>
  },
  {
    path: "/credits",
    element: <Credits />
  },
  {
    path: "*",
    element: <Error/>
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
