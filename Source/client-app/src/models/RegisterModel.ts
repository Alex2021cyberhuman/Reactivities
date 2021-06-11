interface RegisterModel {
    userName: string;
    displayName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    message?: string;
}

export default RegisterModel;