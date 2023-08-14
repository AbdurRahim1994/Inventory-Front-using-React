import Swal from "sweetalert2";

export const LogoutAlert = async () => {
    return Swal.fire({
        title: 'Are you sure to Logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00A884',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout',
        allowOutsideClick: false
    })
}