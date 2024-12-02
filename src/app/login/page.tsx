import Login from "@/components/auth/Login";
import AuthLayout from "@/components/layout/AuthLayout";
import React from "react";

export default function LoginPage() {
  return (
    <AuthLayout imageSrc="/images/login.jpg" imageAlt="Login Illustration">
      <Login />
    </AuthLayout>
  );
}
