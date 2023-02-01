
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import classes from './SignIn.module.css';
import img1 from "../../assets/add-user.png";
import img2 from "../../assets/show.png";
import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { SignupValidationSchema } from "../Validations/Validations";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const ErrorToast = (msg) => {
    toast.error(msg);
}

const successToast = () => {
    toast.success("Login Sucessfully!");
}
const SignIn = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            userName: "",
            passWord:""
        },
        validationSchema: SignupValidationSchema
    })
    
    // useEffect(() => {
    //     formik.setFieldValue("userName", "")
    // }, [])
    const login = () => {
        const myUrl = 'http://172.104.174.187:4000/api/login';    
        // const  myUrl = 'http://localhost:4000/api/login'
        console.log("values: ", formik?.values);
        const data = {
            loginUser: formik?.values.userName,
            loginPass: formik?.values.passWord
        }
        // console.log()

        axios.post(myUrl, data)
        .then(function (response) {       
            // const userDetail = response.data;
            console.log(response.data);
            if (formik.values.userName === "" || formik.values.passWord ==="") {
                ErrorToast("Please enter Username and Password");
            }
            else if (formik.values.userName === "admin" && formik.values.passWord === "admin") {
                console.log("admin");
                successToast();
                // window.open("../dashboard","_self");
                navigate("/dashboard");  
            }
            else if (response.data) {
                // console.log(response.data);
                successToast();
                // window.open("../dashboard","_self");
                navigate("/dashboard");  
            }
            else if (response.data === false) {
                ErrorToast("No data found!");
            }
            else {
                ErrorToast("Incorrect Username or Password");
            }
        }
        ) 
    }
    return (
        <>
    <div className={classes["main-container"]}>
        <div className={classes["login-container"]}>
            <div className={classes["login-title"]}>
                <img src={img1} alt="" />
                <span>Login</span>
            </div>
            <form className={classes["login-form"]}>
                <div className={classes["resizing-input-fields"]}>
                    <label htmlFor="">Username</label>
                    <input 
                    type="text" 
                    id="userName"
                    name="userName"
                    value={formik.values.userName}
                    onChange={formik?.handleChange}
                    onBlur={formik.handleBlur}
                    />
                     {formik.touched.userName && formik.errors.userName ? (
                            <span className={classes["error-message"]}>{formik.errors.userName}</span>
                        ) : null}
                </div>
                <div className={classes["resizing-input-fields"]}>
                    <label htmlFor="">Password</label>
                    <input 
                    type="password" 
                    id="passWord" 
                    name="passWord"
                    value={formik.values.passWord}
                    onChange={formik?.handleChange}
                    onBlur={formik.handleBlur}
                    />
                     {formik.touched.passWord && formik.errors.passWord ? (
                            <span className={classes["error-message"]} >{formik.errors.passWord}</span>
                        ) : null}
                    <img src={img2} alt="" />
                </div>
                <div className={classes["login-btn"]}>
                    <input type="button" name="" value="Login" onClick={() => {login()}}/>
                </div>
                <div className={classes["back-to-signup"]}>
                {/* <a href="/">Back to Main</a> */}
                {/* <a href="../signup">Create an Account</a> */}
                <Button variant="link" onClick={()=>navigate("/")}>Back to Main</Button> 
                <Button variant="link" onClick={()=>navigate("/signup")}>Create an Account</Button> 
                </div>
            </form>
        </div>
    </div>
    <ToastContainer />
    </>
    )
}

export default SignIn