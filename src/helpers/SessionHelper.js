class SessionHelper {
    SetToken(token) {
        localStorage.setItem("token", token)
    }

    GetToken() {
        return localStorage.getItem("token")
    }

    SetUserDetail(user) {
        localStorage.setItem("userDetail", JSON.stringify(user))
    }

    GetUserDetail() {
        return JSON.parse(localStorage.getItem("userDetail"))
    }

    RemoveSession() {
        localStorage.removeItem("token")
        localStorage.removeItem("userDetail")
        window.location.href = "/"
    }

    SetEmail(email) {
        localStorage.setItem("userEmail", email)
    }

    GetEmail() {
        return localStorage.getItem("userEmail")
    }

    SetOTP(otp) {
        localStorage.setItem("OTP", otp);
    }

    GetOTP() {
        return localStorage.getItem("OTP")
    }
}

export const { SetToken, GetToken, SetUserDetail, GetUserDetail, SetEmail, GetEmail, SetOTP, GetOTP, RemoveSession } = new SessionHelper()