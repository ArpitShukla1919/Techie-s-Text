import { Auth } from "../components/Auth"

export const Signup = () => {
    return (
        <div
            className="min-h-screen bg-no-repeat bg-center bg-cover flex items-center justify-center"
            style={{
                backgroundImage: "url(/login_bg.jpg)",
            }}
        >
            <div className="w-full max-w-4xl bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                {/* Left: Signup Form */}
                <div className="flex items-center justify-center ">
                    <Auth type="signup" />
                </div>

                {/* Right: Illustration */}
                <div className="hidden md:flex items-center justify-center ">
                    <img src="/login.svg" alt="Login Illustration" className="" />
                </div>
            </div>
        </div>
    )
}