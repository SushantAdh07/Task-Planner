import { Head, Link } from "@inertiajs/react";

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
                                        {/*<Link
                                            href={route("register")}
                                            className="px-6 py-3 bg-white text-[#29447F] rounded-lg font-semibold shadow-md hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105"
                                        >
                                            Get Started
                                        </Link>*/}
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
}