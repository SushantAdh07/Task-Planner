export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white text-gray-800">
      {/* Hero Section */}
      <header className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Calendar & Task Planner for Individuals & Teams
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Plan smarter, track tasks, and boost productivity—together or solo.
        </p>
      </header>

      {/* Plan Selection Section */}
      <section className="flex flex-col md:flex-row justify-center gap-8 py-12 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full md:w-1/3 text-center hover:scale-105 transition">
          <h2 className="text-2xl font-semibold mb-4">Individual Plan</h2>
          <p className="text-gray-600 mb-6">Perfect for solo productivity ninjas.</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Select Individual
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 w-full md:w-1/3 text-center hover:scale-105 transition">
          <h2 className="text-2xl font-semibold mb-4">Team Plan</h2>
          <p className="text-gray-600 mb-6">Collaborate with your team in real-time.</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            Select Team
          </button>
        </div>
      </section>

      {/* Workflow Preview */}
      <section className="bg-gray-50 py-16 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Replace these image srcs with your app screenshots */}
          {[
            { title: "1. Create Tasks", img: "/images/create-task.png" },
            { title: "2. Plan Your Day", img: "/images/plan-day.png" },
            { title: "3. Track Progress", img: "/images/track-progress.png" },
          ].map((step, idx) => (
            <div key={idx} className="text-center">
              <img src={step.img} alt={step.title} className="mx-auto rounded-xl shadow-md mb-4 h-48 object-cover" />
              <h4 className="text-xl font-semibold">{step.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <footer className="text-center py-10">
        <p className="mb-4 text-gray-700">Ready to start?</p>
        <a href="/login">
          <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
            Go to Login
          </button>
        </a>
      </footer>
    </div>
  );
}
