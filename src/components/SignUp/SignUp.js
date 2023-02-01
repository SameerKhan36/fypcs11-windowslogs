import React, {useState} from 'react';
import SignUpCSS from "./SignUp.module.css";
import img1 from "../../assets/windows.png";
import axios from 'axios';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { SignupValidationSchema } from "../Validations/Validations";
// import { useEffect } from "react";
import Button from 'react-bootstrap/Button';

const ErrorToast = (msg) => {
    toast.error(msg);
}

const successToast = (msg) => {
    toast.success(msg);
}
const SignUp = () => {
    const [data, setData] = useState(null);
    // const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            user: "",
            ipAdd: "",
            passWord: "",
            pathSys: ""
        },
        // validationSchema: SignupValidationSchema
    })

    const signUp = () => {
        // const myUrl = 'http://172.104.174.187:4000/api/signup';
        const myUrl = 'http://localhost:4068/api/windows-logs';
        axios.post(myUrl, formik?.values)
            .then((response) => {
                successToast("Registered Successfully");
                // navigate("/login"); 
                setData(response.data)
            })
            .catch((error) => {
                console.log(error);
                ErrorToast("Unexpected Error!");
            })
        // axios.get(myUrl)
        //     .then(function(response) {
        //         response.data.forEach(function(event) {
        //             document.getElementById('logs').innerHTML += event.message + '<br>';
        //             });
        //         })
        //     .catch(function(error) {
        //         console.error(error);
        //     });
    };
    return (
        <div className={SignUpCSS["main-container"]}>
            <div className={SignUpCSS["sign-up-container"]}>
                <div className={SignUpCSS["sign-up-title"]}>
                    <img src={img1} alt="" />
                    <span> Windows Connector</span>
                </div>
                <form className={SignUpCSS["signup-form"]}>
                    <div className={SignUpCSS["resizing-input-fields"]}>
                        <label for="">User</label>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            value={formik.values.user}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {/* {formik.touched.email && formik.errors.email ? (
                            <span className={SignUpCSS["error-message"]} >{formik.errors.email}</span>
                        ) : null} */}
                    </div>
                    <div className={SignUpCSS["resizing-input-fields"]}>
                        <label for="" >IP Address</label>
                        <input type="text"
                            id="ipAdd"
                            name="ipAdd"
                            value={formik.values.ipAdd}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {/* {formik.touched.userName && formik.errors.userName ? (
                            <span className={SignUpCSS["error-message"]} >{formik.errors.userName}</span>
                        ) : null} */}
                    </div>

                    <div className={SignUpCSS["resizing-input-fields"]}>
                        <label for="">Password</label>
                        <input type="password"
                            id="passWord"
                            name="passWord"
                            value={formik.values.passWord}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {/* {formik.touched.passWord && formik.errors.passWord ? (
                            <span className={SignUpCSS["error-message"]} >{formik.errors.passWord}</span>
                        ) : null} */}
                    </div>
                    <div className={SignUpCSS["resizing-input-fields"]}>
                        <label for="">Path</label>
                        <input type="text"
                            id="pathSys"
                            name="pathSys"
                            value={formik.values.confirmPassword}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {/* {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <span className={SignUpCSS["error-message"]} >{formik.errors.confirmPassword}</span>
                        ) : null} */}
                    </div>
                    <div className={SignUpCSS["signup-btn"]}>
                        <input type="button" name="" value="Connect" onClick={() => signUp()} />
                    </div>
                    {/* <div className={SignUpCSS["back-to-login"]}>
                    <Button variant="link" onClick={()=>navigate("/")}>Back to Main</Button> 
                    </div> */}
                </form>
            </div>
            <ToastContainer />
        
        
        {
            data &&
            <div className={SignUpCSS["main-container"]}>
            <div className={SignUpCSS["output-card"]}>
            <h2>Data Recieved:</h2>
            <p></p>
            {data.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
            </div>
                    </div>
        }
        </div>
    )
}

export default SignUp