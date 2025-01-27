import React from "react";
import AuthFormWrapper from "../components/auth/AuthFormWrapper";
import LeftSection from "../components/auth/LeftSection";
import LoginForm from "../components/auth/LoginForm";
import {loginUser} from "../services/authService"

const LoginPage = () => {
    return (
        <AuthFormWrapper
            children={{
                left: (
                    <LeftSection
                        title="Simplify the Landlord/Landlady Work"
                        description="Manage your properties, tenants, and payments effortlessly in one platform."
                    />
                ),
                right: <LoginForm loginUser={loginUser} />
            }}
        />
    );
};

export default LoginPage;
