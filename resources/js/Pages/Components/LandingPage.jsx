import React, { useState, useEffect } from 'react';

export default function PlanoraLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex justify-between items-center backdrop-blur-sm">
        <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Planora
          </h1>
        </div>
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="flex space-x-8 text-gray-300">
            <a href="#" className="hover:text-white transition-colors duration-300 hover:scale-105 transform">Features</a>
            <a href="#" className="hover:text-white transition-colors duration-300 hover:scale-105 transform">Pricing</a>
            <a href="#" className="hover:text-white transition-colors duration-300 hover:scale-105 transform">About</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="inline-block p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm mb-8 border border-purple-500/30">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
            Plan Smarter,
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Achieve More
            </span>
          </h2>
        </div>

        <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed">
            Transform your productivity with intelligent planning that adapts to your workflow. 
            Experience the future of project management.
          </p>
        </div>

        {/* Main Action Buttons */}
        <div className={`transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transform">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold text-lg border border-white/20 transition-all duration-300 hover:bg-white/20 hover:shadow-2xl hover:shadow-white/20 hover:scale-105 transform">
              <a href='/member/login' className="relative z-10">Join Team</a>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {/* Feature Preview Cards */}
        <div className={`transition-all duration-1000 delay-1300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            {[
              { title: "Smart Planning", desc: "AI-powered insights", icon: "🧠" },
              { title: "Team Sync", desc: "Real-time collaboration", icon: "👥" },
              { title: "Analytics", desc: "Track your progress", icon: "📊" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 transform hover:shadow-xl"
                style={{ animationDelay: `${1500 + index * 200}ms` }}
              >
                <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 pb-8 px-6 text-center">
        <div className={`transition-all duration-1000 delay-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <p className="text-gray-400 text-sm">
            Join thousands of teams already planning smarter with Planora
          </p>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping" />
      <div className="absolute top-40 right-20 w-1 h-1 bg-pink-400 rounded-full animate-pulse" />
      <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
    </div>
  );
}