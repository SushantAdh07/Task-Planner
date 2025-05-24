import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function LoginForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Combined image + form container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row w-full max-w-4xl mx-4 rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Image section - attached to form */}
        <div className="hidden md:block w-full md:w-2/5 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="h-full flex items-center justify-center p-8">
            <div className="relative w-full h-full max-h-[500px] rounded-lg overflow-hidden">
              {/* Replace with your actual image */}
              <div className="absolute inset-0 bg-blue-200/50 flex items-center justify-center">
                <svg className="w-32 h-32 text-blue-600/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Form section - taller */}
        <div className="w-full md:w-3/5 bg-gradient-to-br from-white to-blue-50 p-10 min-h-[500px] flex flex-col justify-center">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">Welcome back</h2>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>

          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              Sign in
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Register
            </Link>
          </div>
        </div>
      </motion.div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-50px) translateX(20px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </div>
  );
}


{/** import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Task-Planning" />
            <div className="min-h-screen bg-gradient-to-br from-[#57ACF8] to-[#29447F] text-white">
                <div className="relative flex min-h-screen flex-col items-center justify-center">
                    <div className="relative w-full max-w-6xl px-6">
                        <header className="flex justify-between items-center py-8 w-full">
                            <div className="text-2xl font-bold">TaskPlanner</div>
                            
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route("index")}
                                        className="px-6 py-3 bg-white text-[#29447F] rounded-lg font-semibold shadow-md hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="px-6 py-3 bg-white text-[#29447F] rounded-lg font-semibold shadow-md hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="px-6 py-3 bg-white text-[#29447F] rounded-lg font-semibold shadow-md hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="my-12 w-full">
                            <div className="text-center mb-12">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">Plan Your Work Effortlessly</h1>
                                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                                    The perfect task management solution for DHRC Team to organize projects and boost productivity.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                                {[
                                    "https://i.ibb.co/MDb0w3FM/Screenshot-450.png",
                                    "https://i.ibb.co/gGmt2Hp/Screenshot-451.png",
                                    "https://i.ibb.co/V082vMp0/Screenshot-452.png",
                                    "https://i.ibb.co/TB14sJ6Y/Screenshot-453.png",
                                ].map((src, index) => (
                                    <div
                                        key={index}
                                        className="overflow-hidden rounded-xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 transition-all hover:shadow-xl hover:border-opacity-40"
                                    >
                                        <img
                                            src={src}
                                            alt={`App screenshot ${index + 1}`}
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </main>

                        <footer className="py-8 text-center text-sm text-white text-opacity-70">
                            © {new Date().getFullYear()} Task Planner - Designed for DHRC Team Productivity
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}*/}