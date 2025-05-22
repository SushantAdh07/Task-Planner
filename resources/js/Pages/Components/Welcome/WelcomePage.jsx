import { motion } from "framer-motion";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-indigo-100 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-extrabold text-indigo-600">PlanWise</h1>
        <div className="justify-end space-x-4">
            <a href="/login" className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition">
          Login
        </a>
        <a href="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition">
          Register
        </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center px-6 pt-20 pb-12 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500"
        >
          Organize Better. Achieve More.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
        >
          A beautifully designed planning app — free for individuals & teams.
        </motion.p>
      </section>

      {/* Plan Options */}
      <section className="px-6 py-12 flex flex-col md:flex-row gap-8 justify-center items-center">
        {[
          {
            title: "Individual Plan",
            desc: "Stay focused, manage your tasks and plan your week efficiently.",
            link: "/register",
          },
          {
            title: "Team Plan",
            desc: "Collaborate, assign, and track tasks across your whole team.",
            link: "/register",
          },
        ].map((plan, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="w-full md:w-1/3 bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-8 text-center transition-all"
          >
            <h3 className="text-2xl font-semibold text-indigo-700 mb-2">{plan.title}</h3>
            <p className="text-gray-700 mb-6">{plan.desc}</p>
            <a href={plan.link}>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition shadow-md">
                Select Plan
              </button>
            </a>
          </motion.div>
        ))}
      </section>

      {/* Workflow Section */}
      <section className="py-16 px-6 bg-white/30 backdrop-blur-lg rounded-3xl mx-4 md:mx-12 mt-8 shadow-2xl">
        <h3 className="text-3xl font-bold text-center mb-12 text-indigo-700">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { title: "Create Tasks", img: "/images/create-task.png" },
            { title: "Plan Your Week", img: "/images/plan-week.png" },
            { title: "Track Progress", img: "/images/track-progress.png" },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * idx }}
              viewport={{ once: true }}
              className="text-center"
            >
              <img
                src={step.img}
                alt={step.title}
                className="mx-auto rounded-xl shadow-lg mb-4 h-48 w-full object-cover"
              />
              <h4 className="text-lg font-semibold text-indigo-800">{step.title}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="text-center py-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white mt-20 rounded-t-[3rem]">
        <p className="text-2xl font-semibold mb-6">Ready to Plan Smarter?</p>
        <a href="/login">
          <button className="bg-white text-indigo-700 px-8 py-3 rounded-full font-semibold shadow-xl hover:bg-gray-100 transition">
            Start Now – It’s Free
          </button>
        </a>
      </footer>
    </div>
  );
}
