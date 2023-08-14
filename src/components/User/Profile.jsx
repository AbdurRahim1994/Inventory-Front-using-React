import React, { useEffect, useRef } from 'react';
import { UserDetailInformation, UserUpdate } from '../../apiRequests/UserAPIRequest';
import { useSelector } from 'react-redux';
import { ErrorToast, GetBase64, IsEmail, IsEmpty, IsMobile } from '../../helpers/FormHelper';
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    let firstNameRef = useRef();
    let lastNameRef = useRef();
    let emailRef = useRef();
    let mobileRef = useRef();
    let passwordRef = useRef();
    let imageRef = useRef();
    let imagePreviewRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        UserDetailInformation()
    }, [])

    const profileData = useSelector((state) => state.profile.profile)

    const OnImagePreview = async () => {
        const imageFile = imageRef.files[0]
        const image = await GetBase64(imageFile)
        imagePreviewRef.src = image;

    }

    const OnUserUpdate = async () => {
        const fName = firstNameRef.value;
        const lName = lastNameRef.value;
        const email = emailRef.value;
        const mobile = mobileRef.value;
        const password = passwordRef.value;
        const photo = imagePreviewRef.src;

        if (IsEmpty(fName)) {
            ErrorToast("First name required")
        }
        else if (IsEmpty(lName)) {
            ErrorToast("Last name required")
        }
        else if (IsEmpty(email)) {
            ErrorToast("Email is required")
        }
        else if (IsEmail(email)) {
            ErrorToast("Invalid email")
        }
        else if (IsEmpty(mobile)) {
            ErrorToast("Mobile number required")
        }
        else if (IsMobile(mobile)) {
            ErrorToast("Invalid mobile")
        }
        else if (IsEmpty(password)) {
            ErrorToast("Password required")
        }
        else {
            const res = await UserUpdate(fName, lName, email, mobile, photo, password);
            if (res === true) {
                navigate('/')
            }
        }
    }
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-10'>
                    <div className='card w-100'>
                        <div className='card-body'>
                            <img ref={(input) => imagePreviewRef = input} src={profileData.photo} alt='' className='icon-nav-img-lg'></img>

                            <div className='row'>
                                <div className='col-lg-4'>
                                    <div className='form-group text-start'>
                                        <label className='form-label'>Profile Picture</label>
                                        <input onChange={OnImagePreview} ref={(input) => imageRef = input} type='file' className='form-control animated fadeInUp'></input>
                                    </div>
                                </div>

                                <div className='col-lg-4'>
                                    <div className='form-group text-start'>
                                        <label className='form-label'>Email</label>
                                        <input ref={(input) => emailRef = input} type='email' defaultValue={profileData.email} className='form-control animated fadeInUp' readOnly={true}></input>
                                    </div>
                                </div>

                                <div className='col-lg-4'>
                                    <div className='form-group text-start'>
                                        <label className='form-label'>First Name</label>
                                        <input ref={(input) => firstNameRef = input} type='text' className='form-control animated fadeInUp' defaultValue={profileData.firstName}></input>
                                    </div>
                                </div>

                                <div className='col-lg-4'>
                                    <div className='form-group text-start'>
                                        <label className='form-label'>Last Name</label>
                                        <input ref={(input) => lastNameRef = input} type='text' className='form-control animated fadeInUp' defaultValue={profileData.lastName}></input>
                                    </div>
                                </div>

                                <div className='col-lg-4'>
                                    <div className='form-group text-start'>
                                        <label className='form-label'>Mobile</label>
                                        <input ref={(input) => mobileRef = input} type='text' className='form-control animated fadeInUp' defaultValue={profileData.mobile}></input>
                                    </div>
                                </div>
                                <div className='col-lg-4'>
                                    <div className='form-group text-start'>
                                        <label className='form-label'>Password</label>
                                        <input ref={(input) => passwordRef = input} type='password' className='form-control animated fadeInUp' defaultValue={profileData.password}></input>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-lg-4'>
                                    <button onClick={OnUserUpdate} className='btn btn-success w-100 animated fadeInUp'>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;