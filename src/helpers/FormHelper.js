import cogoToast from "cogo-toast";

const emailRegex = /^\S+@\S+\.\S+$/
const mobileNumberRegex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/

class FormHelper {
    SuccessToast(msg) {
        cogoToast.success(msg, { position: "top-center", hideAfter: 3 })
    }

    ErrorToast(msg) {
        cogoToast.error(msg, { position: "top-center", hideAfter: 3 })
    }

    IsEmpty(value) {
        if (value.length === 0) {
            return true
        }
        else {
            return false
        }
    }

    IsEmail(value) {
        if (!emailRegex.test(value)) {
            return true
        }
        else {
            return false
        }
    }

    IsMobile(value) {
        if (!mobileNumberRegex.test(value)) {
            return true
        }
        else {
            return false
        }
    }

    GetBase64 = (file) => new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject('Error: ', error);
    })
}

export const { SuccessToast, ErrorToast, IsEmpty, IsEmail, IsMobile, GetBase64 } = new FormHelper()