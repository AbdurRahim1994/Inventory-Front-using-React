import React, { useRef } from 'react';
import { ErrorToast, IsEmail, IsEmpty, IsMobile } from '../../helpers/FormHelper';
import { UserRegistration } from '../../apiRequests/UserAPIRequest';
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const navigate = useNavigate();
    let firstNameRef = useRef();
    let lastNameRef = useRef();
    let emailRef = useRef();
    let mobileRef = useRef();
    let passwordRef = useRef();

    const OnRegistration = async () => {
        const fName = firstNameRef.value;
        const lName = lastNameRef.value;
        const email = emailRef.value;
        const mobile = mobileRef.value;
        const password = passwordRef.value;
        const image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAnNJREFUOE91U89rE1EQ/mZ3adNs2mwTEjBJjTYUIXhTkRw8pJdePAgKWi+eBdGLIIJFEG8eelFP3qyi8dSD1L8gF6NI6JY91LIVktRSDPmxqWn7duQt2bg1OPDg7cybb2e+b4YQMNM0x1RVTTPzDWa+yMznAByoqlpm5m/M/NkwjEoqler5aSQvzEy2bUcdx7lEREtEdCEIPLgzEf1yXfd5KBRazuVyLemXAGSa5jSAp0R0209kZgnsfRKRdwZ2QEQfNU1bnJub61O5XJ4wDOMmgFf+CyEEer0enG5XZkPXde8oiuI/6TDzvXw+/5osyzrjuu4nAKdkVCbvNBrY3d0ddiET4/E40uk06C9IUwhxWZZ/n4ieDbhAu9XC1tbWCAWqqiKTySAWj/uxfSJ6QRsbG28BLEqv67po1OvH/j5kmwjTsRiy2aznYuZDRVHWJIANwPO6QqBWq2Fvb2+kAkliNBrF6dlZP+YysyVbsInIA5CsN5tN/NjeHirgv5YtnEilkEgkfGWEnA0J8IGIrgUV2LZttNvtYzJGIhHM5nJDJYjoNzO/ofX19SVFUZ4EAWTyz50d9Pt9zz0+Po5kMomoYUBWMrAuMz+karV6RdO0FQD60dGRR+L/OIjFYsjMzMgq5FTWAFynSqUS1nX9rhDicaNeDwX1/5fJ4TxkMk0iepTP519682lZ1mSr1Vr+vrl5i5m1EQkCDk3T9k9ms2uFQuGqN+aDGK2uriYVYKXT7Z6X7QDQ5JINdoFBdEiAo4fDXyMTEw/mFxa+BAE8nFKpNJZIJOZ7jnOn0+mcFUKE5C6oiuJMTk1Vw+Hw+2Kx+C5Y4R8x5RSExpfCKwAAAABJRU5ErkJggg=="

        if (IsEmpty(fName)) {
            ErrorToast("First name required")
        }
        else if (IsEmpty(lName)) {
            ErrorToast("Last name required")
        }
        else if (IsEmpty(email)) {
            ErrorToast("Email required")
        }
        else if (IsEmail(email)) {
            ErrorToast("Invalid email")
        }
        else if (IsEmpty(mobile)) {
            ErrorToast("Mobile number required")
        }
        else if (IsMobile(mobile)) {
            ErrorToast("Invalid mobile number")
        }
        else if (IsEmpty(password)) {
            ErrorToast("Password required")
        }
        else {
            const res = await UserRegistration(fName, lName, mobile, email, password, image)
            if (res === true) {
                navigate('/login')
            }
        }
    }
    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-lg-10 center-screen'>
                    <div className='card w-100'>
                        <div className='card-body'>
                            <h4 className='font-weight-bolder'>Registration</h4>
                            <hr className='bg-light'></hr>
                            <div className='row'>
                                <div className='col-lg-4 form-group text-start'>
                                    <label className='form-label'>First Name</label>
                                    <input ref={(input) => firstNameRef = input} type='text' className='form-control animated fadeInUp' placeholder='Enter first name'></input>
                                </div>

                                <div className='col-lg-4 form-group text-start'>
                                    <label className='form-label'>Last Name</label>
                                    <input ref={(input) => lastNameRef = input} type='text' className='form-control animated fadeInUp' placeholder='Enter last name'></input>
                                </div>

                                <div className='col-lg-4 form-group text-start'>
                                    <label className='form-label'>Mobile</label>
                                    <input ref={(input) => mobileRef = input} type='number' className='form-control animated fadeInUp' placeholder='Enter mobile number'></input>
                                </div>

                                <div className='col-lg-4 form-group text-start'>
                                    <label className='form-label'>Email</label>
                                    <input ref={(input) => emailRef = input} type='email' className='form-control animated fadeInUp' placeholder='Enter email'></input>
                                </div>

                                <div className='col-lg-4 form-group text-start'>
                                    <label className='form-label'>Password</label>
                                    <input ref={(input) => passwordRef = input} type='password' className='form-control animated fadeInUp' placeholder='Enter password'></input>
                                </div>

                                <div className='row'>
                                    <div className='col-lg-4'>
                                        <button onClick={OnRegistration} className='btn btn-success w-100 mt-3 animated fadeInUp'>Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;