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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden font-['Poppins',sans-serif]">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-400/20 blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x * 0.015}px`,
            top: `${mousePosition.y * 0.015}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div className="absolute top-1/3 right-1/5 w-72 h-72 rounded-full bg-gradient-to-r from-blue-400/15 to-indigo-500/15 blur-2xl animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 left-1/5 w-80 h-80 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-600/15 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-8 flex justify-between items-center backdrop-blur-sm">
        <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent tracking-tight">
            Planora
          </h1>
        </div>
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="flex space-x-10 text-sm text-slate-300 font-medium">
            <a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 transform tracking-wide">Features</a>
            <a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 transform tracking-wide">Pricing</a>
            <a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 transform tracking-wide">About</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[75vh] px-8 text-center">
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="inline-block p-2 rounded-2xl bg-white/5 backdrop-blur-md mb-12 border border-blue-500/20">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-light mb-8 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent leading-tight tracking-tight">
            Plan Smarter,
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent font-medium">
              Achieve Excellence
            </span>
          </h2>
        </div>

        <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <p className="text-lg text-slate-300 mb-16 max-w-2xl leading-relaxed font-light tracking-wide">
            Transform your productivity with intelligent planning that adapts to your workflow. 
            Experience precision, clarity, and seamless collaboration.
          </p>
        </div>

        {/* Main Action Buttons */}
        <div className={`transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <button className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-medium text-sm transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transform tracking-wide">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button className="group relative px-6 py-3 bg-white/8 backdrop-blur-md rounded-xl text-white font-medium text-sm border border-white/15 transition-all duration-300 hover:bg-white/12 hover:shadow-xl hover:shadow-white/10 hover:scale-105 transform tracking-wide">
              <span className="relative z-10">Join Team</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {/* Feature Preview Cards */}
        <div className={`transition-all duration-1000 delay-1300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            {[
              { title: "Smart Planning", desc: "AI-powered insights for optimal workflow", icon: "⚡" },
              { title: "Team Sync", desc: "Real-time collaboration made effortless", icon: "🔗" },
              { title: "Analytics", desc: "Detailed progress tracking and insights", icon: "📈" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/8 transition-all duration-500 hover:scale-105 transform hover:shadow-xl hover:border-blue-500/30"
                style={{ animationDelay: `${1500 + index * 200}ms` }}
              >
                <div className="text-2xl mb-4 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-base font-medium text-white mb-2 tracking-wide">{feature.title}</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 pb-12 px-8 text-center">
        <div className={`transition-all duration-1000 delay-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <p className="text-slate-400 text-xs font-light tracking-wider">
            Trusted by thousands of teams worldwide for smarter planning
          </p>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-24 left-12 w-1 h-1 bg-blue-400 rounded-full animate-ping" />
      <div className="absolute top-48 right-24 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse" />
      <div className="absolute bottom-40 left-24 w-1 h-1 bg-blue-300 rounded-full animate-bounce" />
      
      {/* Additional subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }} />
    </div>
  );
}