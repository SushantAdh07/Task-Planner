import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function MemberLogin( ) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });


    return (
        <GuestLayout>
            <Head title="Member Log in" />
            
            
            <div className="w-full max-w-md mx-auto p-8 bg-white rounded-3xl shadow-lg dark:bg-gray-800">
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-[#57ACF8] rounded-2xl flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome Back</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-300">
                        Sign in to access your tasks
                    </p>
                </div>

                
                    <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-lg text-sm dark:bg-green-900 dark:text-green-100">
                        
                    </div>
                

                <form className="space-y-5">
                    <div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.email ? 'border-red-400' : 'border-gray-200'} focus:border-[#57ACF8] focus:ring-0 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
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
                            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.password ? 'border-red-400' : 'border-gray-200'} focus:border-[#57ACF8] focus:ring-0 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} className="mt-1 text-sm" />
                    </div>

                    {/**<div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-gray-300 text-[#57ACF8] focus:ring-[#57ACF8] dark:border-gray-600 dark:bg-gray-700"
                            />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Remember me</span>
                        </label> */}

                        {/*{canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-[#57ACF8] hover:text-[#29447F] dark:text-blue-400"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>*/}

                    <PrimaryButton 
                        className="w-full flex justify-center py-3 px-4 bg-gradient-to-r from-[#57ACF8] to-[#29447F] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                        disabled={processing}
                    >
                        {processing ? (
                            <span className="flex mx-auto items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </span>
                        ) : 'Sign in'}
                    </PrimaryButton>

                </form>
            </div>
            
        </GuestLayout>
    );
}