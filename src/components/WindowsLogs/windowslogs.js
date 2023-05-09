import React, {useState} from 'react';
import WindowsCSS from "./windowslogs.module.css";
import img1 from "../../assets/add-user.png";
import axios from 'axios';
import { useFormik } from 'formik';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { emitData, listenerData, listenerWatch } from '../../socket';
import { SignupValidationSchema } from "../Validations/Validations";
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';

// const inputString = '2023-03-20T11:46:59.4010000Z'
// console.log(moment.utc(inputString).format('MMMM Do YYYY, h:mm:ss a'));

const ErrorToast = (msg) => {
    toast.error(msg);
}

const successToast = (msg) => {
    toast.success(msg);
}

const dateFormat = (d) => {
    const dateString = d.split('\r\n')[3];
    // console.log(dateString);
    if (dateString) {
    // Extract the date string from the input string
    const dateIndex = dateString.indexOf(':') + 2; // Add 2 to skip past ': '
    const dateStr = dateString.substring(dateIndex);
    // Convert the date string to a Moment object
    const dateObj = moment.utc(dateStr);
    // Format the date object in the desired format
    const formattedDate = dateObj.format(`MMMM Do YYYY hh:mm:ss a`);
    // console.log(formattedDate);
    return formattedDate;
    }
}
const SignUp1 = () => {
    const [data, setData] = useState(null);
    const [lines, setLines] = useState([]);

//     useEffect(()=>{
//         /*
//         Query logic
//         */
//         console.log('i fire once');
//   },[]);

    useEffect(() => {
        return listenerData('pp')
    }, [])

    const navigate = useNavigate();

    // const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            user: "",
            ipAdd: "",
            passWord: "",
            logType: ""
        },
        // validationSchema: SignupValidationSchema
    })

    const signUp = () => {
        // const myUrl = 'http://172.104.174.187:4068/api/signup';
        const myUrl = 'http://localhost:4068/windowslogs';
        axios.post(myUrl, formik?.values)
            .then((response) => {
                successToast("Registered Successfully");
                // navigate("/login");
                // console.log(response.data); 
                setData(response.data)
                emitData("hello")
                const newD = response.data;

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
        <div className={WindowsCSS["main-container"]}>
        <div className={WindowsCSS["header-button"]}>
<Button variant="primary" onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
</svg>
</div>
            <div className={WindowsCSS["sign-up-container"]}>
                <div className={WindowsCSS["sign-up-title"]}>
                    <img src={img1} alt="" />
                    <span> Windows Connector</span>
                </div>
                <form className={WindowsCSS["signup-form"]}>
                    <div className={WindowsCSS["resizing-input-fields"]}>
                        <label htmlFor="">User</label>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            value={formik.values.user}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {/* {formik.touched.email && formik.errors.email ? (
                            <span className={WindowsCSS["error-message"]} >{formik.errors.email}</span>
                        ) : null} */}
                    </div>
                    <div className={WindowsCSS["resizing-input-fields"]}>
                        <label htmlFor="" >IP Address</label>
                        <input type="text"
                            id="ipAdd"
                            name="ipAdd"
                            value={formik.values.ipAdd}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {/* {formik.touched.userName && formik.errors.userName ? (
                            <span className={WindowsCSS["error-message"]} >{formik.errors.userName}</span>
                        ) : null} */}
                    </div>

                    <div className={WindowsCSS["resizing-input-fields"]}>
                        <label htmlFor="">Password</label>
                        <input type="password"
                            id="passWord"
                            name="passWord"
                            value={formik.values.passWord}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {/* {formik.touched.passWord && formik.errors.passWord ? (
                            <span className={WindowsCSS["error-message"]} >{formik.errors.passWord}</span>
                        ) : null} */}
                    </div>
                    <div className={WindowsCSS["resizing-input-fields"]}>
                        <label htmlFor="">Log Type</label>
                        <input type="text"
                            id="pathSys"
                            name="pathSys"
                            value={formik.values.confirmPassword}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {/* {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <span className={WindowsCSS["error-message"]} >{formik.errors.confirmPassword}</span>
                        ) : null} */}
                    </div>
                    <div className={WindowsCSS["signup-btn"]}>
                        <input type="button" name="" value="Archive Logs" onClick={() => signUp()} />
                    </div>
                    {/* <div className={WindowsCSS["back-to-login"]}>
                    <Button variant="link" onClick={()=>navigate("/")}>Back to Main</Button> 
                    </div> */}
                </form>
            </div>
            <ToastContainer />
            <div id="output" className={WindowsCSS["output-all"]}>        
            {/* <div className={WindowsCSS["main-container"]}> */}
            {/* <h2>System Logs:</h2>
            {data} */}
  {
    data
    &&
        (
            
            // <div className={WindowsCSS["output-card"]}>
            <div id="my-table" className={WindowsCSS["users-table"]}>
            <table className='table'>
                <thead className='table-dark'>
                <tr>
                <th scope='col'> Date </th>
                <th scope='col'> Log Property </th>
                <th scope='col'> ID </th>
                <th scope='col'> Level Detail </th>
                <th scope='col'> Description </th>
                {/* <th scope='col'> Date </th> 
                <th scope='col'> Level </th>
                <th scope='col'> Description </th> */}
                </tr>
                </thead>
                {
                    data.map((d, index) => (
                        <tbody>
                        <tr key={index}>
                            <th scope='row'> {dateFormat(d)}</th>
                            <td> {d.split('\r\n')[1]}</td>
                            <td> {d.split('\r\n')[4]}</td>
                            <td> {d.split('\r\n')[6]}</td>
                            <td> {d.split('\r\n')[13]}</td>
                            {/* <td> {item.server_id} </td>
                            <td> {item.command_type} </td>
                            <td> {item.qu}</td> */}
                        </tr>
                        </tbody>
  
                        // console.log(JSON.stringify(newD));
                        // console.log(`Date: `, JSON.parse(newD[4]))
                        // console.log(`EventID: `, newD[4])
                        // console.log(`Description: `, newD[13])
                        
                    ))
                }

                    </table>
                    </div>
                    // </div>
    )
    }
                  </div>
                    
        </div>
    )
}

export default SignUp1