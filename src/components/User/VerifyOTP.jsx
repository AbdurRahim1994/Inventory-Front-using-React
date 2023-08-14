import React, { useState } from 'react';
import ReactCodeInput from 'react-code-input';
import { UserOTPVerification } from '../../apiRequests/UserAPIRequest';
import { GetEmail } from '../../helpers/SessionHelper';
import { useNavigate } from 'react-router-dom'
import { ErrorToast } from '../../helpers/FormHelper';

const VerifyOTP = () => {
    const [OTP, SetOTP] = useState("");
    const navigate = useNavigate();

    const OnOTPVerify = async () => {
        const email = GetEmail()
        if (OTP.length === 6) {
            const res = await UserOTPVerification(email, OTP)
            if (res === true) {
                navigate('/CreatePassword')
            }
        }
        else {
            ErrorToast("Enter 6 digit code")
        }
    }

    const inputStyle = {
        fontFamily: 'monospace',
        margin: '4px',
        MozAppearance: 'textfield',
        width: '45px',
        borderRadius: '3px',
        fontSize: '32px',
        height: '45px',
        paddingLeft: '8px',
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid lightskyblue',
        boxSizing: 'border-box',
        borderColor: 'lightgrey'
    }
    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-lg-5 center-screen'>
                    <div className='card w-100'>
                        <div className='card-body'>
                            <h4 className='font-weight-bolder'>OTP VERIFICATION</h4>
                            <p className='font-weight-bolder'>A 6 digit verification code has been sent to your email</p>
                            <hr className='bg-light'></hr>

                            <ReactCodeInput onChange={(value) => SetOTP(value)} type='number' fields={6} inputStyle={inputStyle}></ReactCodeInput>
                            <br></br>
                            <button onClick={OnOTPVerify} className='btn btn-success w-70 mt-4'>Verify OTP</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;