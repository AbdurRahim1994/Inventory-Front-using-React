import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ErrorToast, IsEmail, IsEmpty } from '../../helpers/FormHelper';
import { UserLogin } from '../../apiRequests/UserAPIRequest';

const Login = () => {
    let emailRef = useRef();
    let passwordRef = useRef();

    const OnLogin = async () => {
        const email = emailRef.value;
        const password = passwordRef.value;

        if (IsEmpty(email)) {
            ErrorToast("Email required")
        }
        else if (IsEmail(email)) {
            ErrorToast("Invalid email")
        }
        else if (IsEmpty(password)) {
            ErrorToast("Password required")
        }
        else {
            const res = await UserLogin(email, password);
            if (res === true) {
                window.location.href = '/Dashboard'
            }
        }
    }
    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-lg-5 center-screen'>
                    <div className='card w-100'>
                        <div className='card-body'>
                            <h4 className='font-weight-bolder'>Login</h4>
                            <hr className='bg-light'></hr>

                            <div className='form-group text-start'>
                                <label className='form-label'>Email</label>
                                <input ref={(input) => emailRef = input} type='text' className='form-control' placeholder='Enter email'></input>
                            </div>

                            <div className='form-group text-start'>
                                <label className='form-label'>Password</label>
                                <input ref={(input) => passwordRef = input} type='password' className='form-control' placeholder='Enter password'></input>
                            </div>

                            <div className='form-group'>
                                <button onClick={OnLogin} className='btn btn-success w-100'>Log in</button>
                            </div>

                            <div>
                                <NavLink to='/registration' className='ms-3 h6 text-info'><span className='text-xs' style={{ color: "black" }}>Are you new? click here</span> Register</NavLink>
                                <br></br>
                                <NavLink to='/SendOTP' className='ms-3 h6 text-primary'>Forgot Password</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;