import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  mode: "signin" | "signup";
};

export default function AuthForm({ mode }: Props) {
  const isSignup = mode === "signup";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert(
        isSignup
          ? "Account created successfully! (Frontend demo)"
          : "Signed in successfully! (Frontend demo)"
      );
    }, 1000);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-100">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex items-center justify-center bg-primary text-primary-content p-12">
        <div className="max-w-md space-y-6">
          <h1 className="text-5xl font-bold">Melo</h1>
          <h2 className="text-3xl font-semibold">
            Take care of your mind.
          </h2>
          <p className="opacity-90">
            Track emotions, build healthy habits, and improve your mental well-being one day at a time.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-6">

        <div className="card w-full max-w-md bg-base-100 border border-base-300 shadow-2xl">

          <div className="card-body">

            {/* TITLE */}
            <h2 className="text-3xl font-bold text-center">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>

            <p className="text-center text-sm opacity-70">
              {isSignup
                ? "Join Melo and start your journey."
                : "Sign in to continue."}
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">

              {/* NAME */}
              {isSignup && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full"
                  required
                />
              )}

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                required
              />

              {/* PASSWORD */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full pr-10"
                  required
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* CONFIRM PASSWORD */}
              {isSignup && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input input-bordered w-full"
                  required
                />
              )}

              {/* FORGOT PASSWORD */}
              {!isSignup && (
                <div className="text-right">
                  <a className="text-sm link link-hover">
                    Forgot password?
                  </a>
                </div>
              )}

              {/* TERMS */}
              {isSignup && (
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    required
                  />
                  I agree to the Terms & Conditions
                </label>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                className={`btn btn-primary w-full ${
                  loading ? "btn-disabled" : ""
                }`}
              >
                {loading
                  ? "Please wait..."
                  : isSignup
                  ? "Create Account"
                  : "Sign In"}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="divider">OR</div>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              className="btn btn-outline w-full flex items-center gap-2"
              onClick={() =>
                alert("Google authentication will be connected later.")
              }
            >
              {/* Google Icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C33.1 6.5 28.8 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
                />
              </svg>

              Continue with Google
            </button>

            {/* FOOTER LINK */}
            <p className="text-center mt-4 text-sm">
              {isSignup
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <a
                href={isSignup ? "/signin" : "/signup"}
                className="link link-primary"
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </a>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}