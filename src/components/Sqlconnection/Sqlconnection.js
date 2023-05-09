import {useState} from 'react';
import Sqlconnection from "./Sqlconnection.module.css";
import img1 from "../../assets/Connector.png";
// import img1 from "../../CS-11 Rockstar/connector.png";
import axios from 'axios';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { SignupValidationSchema } from "../Validations/Validations";
import Table from "react-bootstrap/Table";
// import { useEffect } from "react";
import Button from 'react-bootstrap/Button';

const ErrorToast = (msg) => {
    toast.error(msg);
}

const successToast = (msg) => {
    toast.success(msg);
}
const SignUp = () => {
    const [res, setRes] = useState(null);

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            user: "",
            host: "",
            password: "",
            database: ""
        },
        validationSchema: SignupValidationSchema
    })

    const signUp = () => {
        // const myUrl = 'http://172.104.174.187:4120/api/sqlconnection';
        const myUrl = 'http://localhost:4120/api/sqlconnection';
        axios.post(myUrl, formik?.values)
            .then((response) => {
                    // responseText = response.data
                    setRes(response.data);
                    console.log(response.data)
                successToast("Connection Established Successfully");
                // navigate("/login"); 
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                ErrorToast("Unexpected Error!");
            })
    };
    return (
        <div className={Sqlconnection["main-container"]}>
            <div className={Sqlconnection["sign-up-container"]}>
                <div className={Sqlconnection["sign-up-title"]}>
                    <img src={img1} alt="" />
                    <span>Connector MySQL</span>
                </div>
                <form className={Sqlconnection["signup-form"]}>
                    <div className={Sqlconnection["resizing-input-fields"]}>
                        <label htmlFor="">User</label>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            value={formik.values.user}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.user && formik.errors.user ? (
                            <span className={Sqlconnection["error-message"]} >{formik.errors.user}</span>
                        ) : null}
                    </div>
                    <div className={Sqlconnection["resizing-input-fields"]}>
                        <label htmlFor="" >Host</label>
                        <input type="text"
                            id="host"
                            name="host"
                            value={formik.values.host}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.host && formik.errors.host ? (
                            <span className={Sqlconnection["error-message"]} >{formik.errors.host
                            }</span>
                        ) : null}
                    </div>

                    <div className={Sqlconnection["resizing-input-fields"]}>
                        <label htmlFor="">Password</label>
                        <input type="password"
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <span className={Sqlconnection["error-message"]} >{formik.errors.password}</span>
                        ) : null}
                    </div>
                    <div className={Sqlconnection["resizing-input-fields"]}>
                        <label htmlFor="">Database</label>
                        <input type="text"
                            id="database"
                            name="database"
                            value={formik.values.database}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.database && formik.errors.database ? (
                            <span className={Sqlconnection["error-message"]} >{formik.errors.database}</span>
                        ) : null}
                    </div>
                    <div className={Sqlconnection["signup-btn"]}>
                        <input type="button"
                             name="" value="Establish Connection" onClick={() => signUp()} />
                    </div>
                    <div className={Sqlconnection["back-to-login"]}>
                    </div>
                </form>
            </div>
            <ToastContainer />
{
    res &&
    // <div className={Sqlconnection["connection-msg"]}>
    <div className="users-table">

                    <table className='table'>
                        <thead className='table-dark'>
                        <tr>
                        <th scope='col'> Event Time </th>
                        <th scope='col'> User Host </th>
                        <th scope='col'> Server ID </th> 
                        <th scope='col'> Command Type </th>
                        </tr>
                        </thead>
                    {res.map((item, index) => (
                        <tbody>
                        <tr key={index}>
                            <th scope='row'> {item.event_time}</th>
                            <td> {item.user_host} </td>
                            <td> {item.server_id} </td>
                            <td> {item.command_type}</td>
                        </tr>
                        </tbody>))}

                        {/* <div key={index}>{"Event Time: " + item.event_time}</div> */}
                
                    </table>
                    {/* // "HELLO WORLD" */}
                
            </div>
}
        </div>
    )
                        }
export default SignUp