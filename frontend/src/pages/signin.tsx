import { Auth } from "../components/Auth"

export const Signin = () => {
    return (
        <div
            className="min-h-screen bg-no-repeat bg-center bg-cover flex items-center justify-center"
            style={{
                backgroundImage: "url(/login_bg.jpg)",
            }}
        >
            <div className="w-full max-w-4xl bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                {/* Left: Signin Form */}
                <div className="flex items-center justify-center p-6">
                    <Auth type="signin" />
                </div>

                {/* Right: Illustration */}
                <div className="hidden md:flex items-center justify-center p-6">
                    <img src="/login.svg" alt="Login Illustration" className="" />
                </div>
            </div>
        </div>
    )
}