import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from './routes/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='body-wrapper'>
        <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);

reportWebVitals();
