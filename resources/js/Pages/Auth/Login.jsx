import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-950 to-slate-900 flex items-center justify-center p-4 font-['Poppins',sans-serif]">
            <Head title="Log in" />
            
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-white tracking-tight">Welcome Back</h2>
                    <p className="mt-1 text-white/90">
                        Sign in to continue
                    </p>
                </div>

                {/* Form Body */}
                <div className="p-8">
                    {status && (
                        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded text-xs">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className={`w-full px-4 py-3 text-md rounded-lg border-2 ${
                                    errors.email ? 'border-red-300' : 'border-gray-200'
                                } focus:border-blue-400 focus:ring-0 focus:ring-blue-100 text-gray-700`}
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Email address"
                            />
                            <InputError message={errors.email} className="mt-1 text-sm" />
                        </div>

                        <div>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className={`w-full px-4 py-3 text-md rounded-lg border-2 ${
                                    errors.password ? 'border-red-300' : 'border-gray-200'
                                } focus:border-blue-400 focus:ring-1 focus:ring-blue-100 text-gray-700`}
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password"
                            />
                            <InputError message={errors.password} className="mt-1 text-sm" />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3"
                                />
                                <span className="ml-2 text-sm text-gray-600 font-medium">Remember me</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        <PrimaryButton 
                            className="w-full flex justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : 'Sign in'}
                        </PrimaryButton>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link 
                            href={route('register')} 
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