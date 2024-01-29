import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from './routes/Home';
import CreateForm from './routes/CreateForm';
import { ToastContainer } from 'react-toastify';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/create-form",
    element: <CreateForm/>,
  },
  {
    path: "/edit-form/:id",
    element: <CreateForm/>,
  },
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='body-wrapper'>
        <RouterProvider router={router} />
    </div>
    <ToastContainer />
  </React.StrictMode>
);

reportWebVitals();
