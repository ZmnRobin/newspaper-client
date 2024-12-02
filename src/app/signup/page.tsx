import SignUp from "@/components/auth/SignUp";
import AuthLayout from "@/components/layout/AuthLayout";
import React from "react";

export default function SignUpPage() {
  return (
    <AuthLayout imageSrc="/images/login.jpg" imageAlt="Sign Up Illustration">
      <SignUp />
    </AuthLayout>
  );
}
