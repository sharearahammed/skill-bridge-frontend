import LoginForm from "@/src/components/authentication/login-form";
import RegisterForm from "@/src/components/authentication/register-form";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
}
