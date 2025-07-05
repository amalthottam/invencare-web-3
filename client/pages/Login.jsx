import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, Eye, EyeOff } from "lucide-react";

// AWS Cognito Authentication
// import { signIn, signUp, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
// import { toast } from "@/components/ui/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmationStep, setConfirmationStep] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // AWS Cognito Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // AWS Cognito Sign In Implementation
      // const { isSignedIn, nextStep } = await signIn({
      //   username: formData.email,
      //   password: formData.password,
      // });
      //
      // if (isSignedIn) {
      //   toast({
      //     title: "Success",
      //     description: "Successfully signed in!",
      //   });
      //   navigate("/dashboard");
      // } else {
      //   // Handle MFA or other next steps
      //   console.log('Sign in next step:', nextStep);
      // }

      // Demo implementation (remove when implementing Cognito)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (formData.email && formData.password) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      // toast({
      //   title: "Error",
      //   description: error.message || "Failed to sign in",
      //   variant: "destructive",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  // AWS Cognito Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // AWS Cognito Sign Up Implementation
      // const { isSignUpComplete, userId, nextStep } = await signUp({
      //   username: formData.email,
      //   password: formData.password,
      //   options: {
      //     userAttributes: {
      //       email: formData.email,
      //     },
      //   },
      // });
      //
      // if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
      //   setConfirmationStep(true);
      //   toast({
      //     title: "Confirmation Required",
      //     description: "Please check your email for confirmation code",
      //   });
      // }

      // Demo implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setConfirmationStep(true);
    } catch (error) {
      console.error("Sign up error:", error);
      // toast({
      //   title: "Error",
      //   description: error.message || "Failed to sign up",
      //   variant: "destructive",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  // AWS Cognito Confirm Sign Up
  const handleConfirmSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // AWS Cognito Confirm Sign Up Implementation
      // const { isSignUpComplete, nextStep } = await confirmSignUp({
      //   username: formData.email,
      //   confirmationCode: formData.confirmationCode,
      // });
      //
      // if (isSignUpComplete) {
      //   toast({
      //     title: "Success",
      //     description: "Account confirmed! Please sign in.",
      //   });
      //   setIsSignUp(false);
      //   setConfirmationStep(false);
      // }

      // Demo implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSignUp(false);
      setConfirmationStep(false);
    } catch (error) {
      console.error("Confirmation error:", error);
      // toast({
      //   title: "Error",
      //   description: error.message || "Failed to confirm account",
      //   variant: "destructive",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  // AWS Cognito Resend Confirmation Code
  const handleResendCode = async () => {
    try {
      // await resendSignUpCode({ username: formData.email });
      // toast({
      //   title: "Code Sent",
      //   description: "Confirmation code resent to your email",
      // });
    } catch (error) {
      console.error("Resend code error:", error);
    }
  };

  const handleSubmit = confirmationStep
    ? handleConfirmSignUp
    : isSignUp
      ? handleSignUp
      : handleSignIn;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-primary flex items-center justify-center mb-4">
            <Package className="h-7 w-7 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">InvenCare</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {confirmationStep
              ? "Confirm your account"
              : isSignUp
                ? "Create your supermarket inventory account"
                : "Sign in to your supermarket inventory system"}
          </p>
        </div>

        {/* Authentication form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              {confirmationStep
                ? "Confirm Account"
                : isSignUp
                  ? "Sign up"
                  : "Sign in"}
            </CardTitle>
            <CardDescription>
              {confirmationStep
                ? "Enter the confirmation code sent to your email"
                : isSignUp
                  ? "Create an account to get started"
                  : "Enter your credentials to access your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!confirmationStep && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="h-11 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="h-11"
                      />
                    </div>
                  )}
                </>
              )}

              {confirmationStep && (
                <div className="space-y-2">
                  <Label htmlFor="confirmationCode">Confirmation Code</Label>
                  <Input
                    id="confirmationCode"
                    name="confirmationCode"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={formData.confirmationCode}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                    maxLength={6}
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11"
                disabled={isLoading}
              >
                {isLoading
                  ? "Processing..."
                  : confirmationStep
                    ? "Confirm Account"
                    : isSignUp
                      ? "Sign up"
                      : "Sign in"}
              </Button>
            </form>

            {confirmationStep && (
              <div className="mt-4 text-center">
                <Button
                  variant="ghost"
                  onClick={handleResendCode}
                  disabled={isLoading}
                >
                  Resend confirmation code
                </Button>
              </div>
            )}

            <div className="mt-6 text-center">
              {!confirmationStep && (
                <Button
                  variant="ghost"
                  onClick={() => setIsSignUp(!isSignUp)}
                  disabled={isLoading}
                >
                  {isSignUp
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign up"}
                </Button>
              )}

              <p className="text-xs text-muted-foreground mt-2">
                Demo credentials: Use any email and password
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>© 2024 InvenCare. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
