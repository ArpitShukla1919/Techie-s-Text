import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@100xdevs/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Eye, EyeOff, Loader2, User, Mail, Lock } from "lucide-react";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function sendRequest() {
        setLoading(true);
        setError("");
        
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, 
                postInputs
            );
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e: any) {
            setError(e.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const isSignup = type === "signup";
    
    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {isSignup ? "Create Account" : "Welcome Back"}
                    </h1>
                    <p className="text-gray-200">
                        {isSignup ? "Join us today" : "Sign in to your account"}
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); sendRequest(); }}>
                        {isSignup && (
                            <InputField
                                label="Full Name"
                                placeholder="Enter your full name"
                                value={postInputs.name || ""}
                                onChange={(e) => setPostInputs({ ...postInputs, name: e.target.value })}
                                icon={<User className="w-5 h-5 text-gray-400" />}
                                required
                            />
                        )}

                        <InputField
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            value={postInputs.username}
                            onChange={(e) => setPostInputs({ ...postInputs, username: e.target.value })}
                            icon={<Mail className="w-5 h-5 text-gray-400" />}
                            required
                        />

                        <div className="relative">
                            <InputField
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={postInputs.password}
                                onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
                                icon={<Lock className="w-5 h-5 text-gray-400" />}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                            <span>{loading ? "Please wait..." : (isSignup ? "Create Account" : "Sign In")}</span>
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            {isSignup ? "Already have an account?" : "Don't have an account?"}
                            <Link 
                                to={isSignup ? "/signin" : "/signup"}
                                className="ml-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                            >
                                {isSignup ? "Sign In" : "Sign Up"}
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-400">
                        By continuing, you agree to our Terms & Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
};

interface InputFieldProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    icon?: React.ReactNode;
    required?: boolean;
}

function InputField({ label, placeholder, value, onChange, type = "text", icon, required }: InputFieldProps) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-400`}
                />
            </div>
        </div>
    );
}