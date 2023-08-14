import React, { useRef } from 'react';
import { ErrorToast, IsEmail, IsEmpty } from '../../helpers/FormHelper';
import { UserEmailVerification } from '../../apiRequests/UserAPIRequest';
import { useNavigate } from 'react-router-dom'

const SendOTP = () => {
    let emailRef = useRef();
    const navigate = useNavigate()

    const OnEmailVerification = async () => {
        const email = emailRef.value;

        if (IsEmpty(email)) {
            ErrorToast("Email required")
        }
        else if (IsEmail(email)) {
            ErrorToast("Invalid email")
        }
        else {
            const res = await UserEmailVerification(email);
            if (res === true) {
                navigate('/VerifyOTP')
            }
        }
    }
    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-lg-5 center-screen'>
                    <div className='card w-100'>
                        <div className='card-body'>
                            <h4 className='font-weight-bolder'>Email Address</h4>
                            <hr className='bg-light'></hr>

                            <div className='form-group text-start'>
                                <label className='form-label'>Email</label>
                                <input ref={(input) => emailRef = input} type='email' className='form-control animated fadeInUp' placeholder='Enter email'></input>
                            </div>

                            <div className='form-group'>
                                <button onClick={OnEmailVerification} className='btn btn-success w-100 animated fadeInUp'>Send OTP</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendOTP;