import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-950 to-slate-900 flex items-center justify-center p-4 font-['Poppins',sans-serif]">
            <Head title="Register" />

            <div className="w-full max-w-sm bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-5 text-center">
                    <div className="mx-auto w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 backdrop-blur-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-white tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-1 text-white/90 text-sm">
                        Sign up to continue
                    </p>
                </div>

                <div className="p-6">
                    {status && (
                        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded text-xs">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.email}
                                className={"w-full px-3 py-2 text-sm rounded-lg border focus:border-blue-400 focus:ring-1 focus:ring-blue-100 text-gray-700"}
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Name"
                            />
                            <InputError
                                message={errors.email}
                                className="mt-1 text-xs"
                            />
                        </div>
                        <div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className={`w-full px-3 py-2 text-sm rounded-lg border ${
                                    errors.email
                                        ? "border-red-300"
                                        : "border-gray-200"
                                } focus:border-blue-400 focus:ring-1 focus:ring-blue-100 text-gray-700`}
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="Email address"
                            />
                            <InputError
                                message={errors.email}
                                className="mt-1 text-xs"
                            />
                        </div>

                        <div>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className={`w-full px-3 py-2 text-sm rounded-lg border ${
                                    errors.password
                                        ? "border-red-300"
                                        : "border-gray-200"
                                } focus:border-blue-400 focus:ring-1 focus:ring-blue-100 text-gray-700`}
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Password"
                            />
                            <InputError
                                message={errors.password}
                                className="mt-1 text-xs"
                            />
                        </div>

                        <div>
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="w-full px-3 py-2 text-sm rounded-lg borderfocus:border-blue-400 focus:ring-1 focus:ring-blue-100 text-gray-700"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                                placeholder="Confirm Password"
                            />
                        </div>

                        <PrimaryButton
                            className="w-full flex justify-center py-2 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-1 h-3 w-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                "Sign in"
                            )}
                        </PrimaryButton>
                    </form>

                    <div className="mt-4 text-center text-xs text-gray-500">
                        Don't have an account?{" "}
                        <Link
                            href={route("register")}
                            className="text-blue-600 font-medium hover:text-blue-800"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
