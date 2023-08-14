import axios from "axios"
import { BaseURL } from '../helpers/Config'
import { ErrorToast, SuccessToast } from "../helpers/FormHelper";
import store from '../../src/redux/store/store'
import { hideLoader, showLoader } from "../redux/state-slice/setting-slice";
import { GetToken, SetEmail, SetOTP, SetToken, SetUserDetail } from '../helpers/SessionHelper'
import { setProfile } from "../redux/state-slice/profile-slice";

const token = GetToken();
axios.defaults.headers.common['token'] = token

export const UserRegistration = async (firstName, lastName, mobile, email, password, photo) => {
    try {
        store.dispatch(showLoader())
        const postBody = {
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            email: email,
            password: password,
            photo: photo
        }
        const res = await axios.post(BaseURL + '/Registration', postBody);
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === "fail") {
                if (res?.data?.data?.keyPattern?.email === 1) {
                    ErrorToast("Email already exists")
                    return false
                }
            }
            else {
                SuccessToast("Registration Successful")
                return true
            }
        }
        else {
            ErrorToast("Something went wrong")
            return false
        }
    }
    catch (error) {
        ErrorToast("Something went wrong")
        store.dispatch(hideLoader())
        return false
    }
}

export const UserLogin = async (email, passoword) => {
    try {
        store.dispatch(showLoader())
        const postBody = {
            email: email,
            password: passoword
        }
        const res = await axios.post(BaseURL + '/Login', postBody)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === "success") {
                SuccessToast("Login Successful");
                SetToken(res?.data?.token);
                SetUserDetail(res?.data?.data)
                return true
            }
            else {
                ErrorToast(res?.data?.status)
                return false
            }
        }
        else {
            ErrorToast("Something went wrong");
            return false
        }
    }
    catch (error) {
        ErrorToast("Something went wrong");
        console.log(error)
        store.dispatch(hideLoader())
        return false;
    }
}

export const UserDetailInformation = async () => {
    try {
        store.dispatch(showLoader())
        const res = await axios.get(BaseURL + '/ProfileDetails')
        store.dispatch(hideLoader())
        if (res.status === 200) {
            store.dispatch(setProfile(res?.data?.data[0]))
        }
        else {
            ErrorToast("Something went wrong")
            return false;
        }
    }
    catch (error) {
        ErrorToast("Something went wrong");
        store.dispatch(hideLoader())
        return false;
    }
}

export const UserUpdate = async (firstName, lastName, email, mobile, photo, passoword) => {
    try {
        store.dispatch(showLoader())
        const postBody = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            photo: photo,
            passoword: passoword
        }

        const userDetail = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            photo: photo,
        }
        const res = await axios.post(BaseURL + '/ProfileUpdate', postBody)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            SuccessToast("Profile Successfully Updated")
            SetUserDetail(userDetail)
            return true
        }
        else {
            ErrorToast("Something went wrong")
            return false
        }
    }
    catch (error) {
        ErrorToast("Something went wrong")
        store.dispatch(hideLoader())
        return false
    }
}

export const UserEmailVerification = async (email) => {
    try {
        store.dispatch(showLoader())
        const res = await axios.post(BaseURL + '/EmailVerify/' + email)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === "success") {
                SuccessToast("A 6 digit verification code is sent to your email")
                SetEmail(email)
                return true
            }
            else {
                ErrorToast(res?.data?.status)
                return false
            }
        }
        else {
            ErrorToast("Something went wrong")
            return false
        }
    }
    catch (error) {
        ErrorToast("Something went wrong")
        store.dispatch(hideLoader())
        return false;
    }
}

export const UserOTPVerification = async (email, OTP) => {
    try {
        store.dispatch(showLoader())
        const postBody = {
            OTPCode: OTP
        }
        const res = await axios.post(BaseURL + '/OTPVerify/' + email, postBody)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("OTP Verification Successful")
                SetOTP(OTP);
                return true
            }
            else {
                ErrorToast(res?.data?.status);
                return false
            }
        }
        else {
            ErrorToast("Something went wrong")
            return false
        }
    }
    catch (error) {
        ErrorToast("Something went wrong")
        store.dispatch(hideLoader())
        return false
    }
}

export const UserPasswordReset = async (OTP, email, passoword) => {
    try {
        store.dispatch(showLoader())
        const postBody = {
            email: email,
            OTPCode: OTP,
            password: passoword
        }
        const res = await axios.post(BaseURL + '/PasswordReset', postBody);
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Password Reset Successful");
                SetOTP(OTP);
                return true
            }
            else {
                ErrorToast(res?.data?.status)
                return false
            }
        }
        else {
            ErrorToast("Something went wrong")
            return false
        }
    }
    catch (error) {
        ErrorToast("Something went wrong");
        store.dispatch(hideLoader())
        return false
    }

}