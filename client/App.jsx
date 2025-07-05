import "./global.css";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Forecasting from "./pages/Forecasting";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// AWS Cognito Integration
// import { Amplify } from 'aws-amplify';
// import { getCurrentUser } from 'aws-amplify/auth';
//
// Amplify.configure({
//   Auth: {
//     Cognito: {
//       userPoolId: 'us-east-1_XXXXXXXXX',
//       userPoolClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
//       region: 'us-east-1',
//       signUpVerificationMethod: 'code',
//       loginWith: {
//         email: true,
//         username: false,
//         phone: false
//       },
//       userAttributes: {
//         email: {
//           required: true
//         }
//       },
//       allowGuestAccess: true,
//       passwordFormat: {
//         minLength: 8,
//         requireLowercase: true,
//         requireUppercase: true,
//         requireNumbers: true,
//         requireSpecialCharacters: true
//       }
//     }
//   }
// });

const queryClient = new QueryClient();

const App = () => {
  // AWS Cognito Authentication State Management
  // const [user, setUser] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  //
  // useEffect(() => {
  //   checkAuthState();
  // }, []);
  //
  // const checkAuthState = async () => {
  //   try {
  //     const currentUser = await getCurrentUser();
  //     setUser(currentUser);
  //   } catch (error) {
  //     console.log('No authenticated user found');
  //     setUser(null);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/forecasting" element={<Forecasting />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")).render(<App />);
