import React from "react";
import AuthFormWrapper from "../components/auth/AuthFormWrapper";
import LeftSection from "../components/auth/LeftSection";
import RegisterForm from "../components/auth/RegisterForm";
import {registerUser} from "../services/authService"


const RegisterPage = () => {
    return (
        <AuthFormWrapper
            children={{
                left: (
                    <LeftSection
                        title="Welcome to Our Platform!!!!!"
                        description="Join us and explore all the amazing features we have to offer. It's quick, easy, and free to register!"
                    />
                ),
                right: <RegisterForm registerUser={registerUser} />,
            }}
        />
    );
};

export default RegisterPage;
