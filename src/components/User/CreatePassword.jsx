import React, { useRef } from 'react';
import { GetEmail, GetOTP } from '../../helpers/SessionHelper'
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';
import { UserPasswordReset } from '../../apiRequests/UserAPIRequest';
import { useNavigate } from 'react-router-dom'

const CreatePassword = () => {
    const email = GetEmail()
    let passwordRef = useRef();
    let confirmPasswordRef = useRef();
    const navigate = useNavigate()

    const OnPasswordReset = async () => {
        const password = passwordRef.value;
        const confirmPassword = confirmPasswordRef.value;

        if (IsEmpty(password)) {
            ErrorToast("Password required")
        }
        else if (IsEmpty(confirmPassword)) {
            ErrorToast("Confirm password required")
        }
        else if (password !== confirmPassword) {
            ErrorToast("Password do not match")
        }
        else {
            const res = await UserPasswordReset(GetOTP(), GetEmail(), password)
            if (res === true) {
                navigate('/')
            }
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-lg-5 center-screen'>
                    <div className='card w-100'>
                        <div className='card-body'>
                            <h4 className='font-weight-bolder text-center'>PASSWORD RESET</h4>
                            <hr className='bg-light'></hr>

                            <div className='form-group text-start'>
                                <label className='form-label'>Email</label>
                                <input defaultValue={email} readOnly={true} type='email' className='form-control animated fadeInUp'></input>
                            </div>

                            <div className='form-group text-start'>
                                <label className='form-label'>Password</label>
                                <input ref={(input) => passwordRef = input} type='password' className='form-control animated fadeInUp'></input>
                            </div>

                            <div className='form-group text-start'>
                                <label className='form-label'>Confirm Password</label>
                                <input ref={(input) => confirmPasswordRef = input} type='password' className='form-control animated fadeInUp'></input>
                            </div>

                            <div className='form-group'>
                                <button onClick={OnPasswordReset} className='btn btn-success w-100 animated fadeInUp'>Reset Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePassword;