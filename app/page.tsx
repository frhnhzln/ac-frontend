export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl bg-white shadow-2xl p-8 border border-gray-100">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="/images/LLA_logo2.jpeg"
              alt="LLA Logo"
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Admin 1</h1>
            <p className="text-gray-500 mt-2">Sign in to LLA</p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-gray-300" />
                Remember Me
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="border-t"></div>
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-400 text-sm">
              OR
            </span>
          </div>

          {/* Google */}
          <button className="w-full rounded-lg border border-gray-300 py-3 font-medium hover:bg-gray-50 transition">
            Continue with Google
          </button>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="#" className="font-semibold text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-center text-sm text-gray-500">
          © {year} AC Management System
        </p>
      </div>
    </main>
  );
}
