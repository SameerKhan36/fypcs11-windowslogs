import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import Sqlconnection from "./components/Sqlconnection/Sqlconnection"
// import Sidebar from "./components/Sidebar/Sidebar"
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.css';
// import Main from "./components/main/Main"
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp1 from './components/WindowsLogs/windowslogs';


const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Main/>,
  // },
  {
    path: "/",
    element: <SignUp1/>,
  },
  // {
  //   path: "/dashboard",
  //   element: <Dashboard/>,
  // },
  // {
  //   path: "/users",
  //   element: <Users/>,
  // },
  // {
  //   path: "/data-analysis",
  //   element: <DataAnalysis/>,
  // },
  // {
  //   path: "/data-management",
  //   element: <DataManagement/>,
  // },
  // {
  //   path: "/reports",
  //   element: <Reports/>,
  // },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <RouterProvider router={router} />
    //     <React.StrictMode>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
