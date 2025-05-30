import { useState } from "react";
import TeamSizeSelect from "./TeamSizeSelect";
import { useForm } from "@inertiajs/inertia-react";

export default function TeamPlanPage({auth}) {
  const {data, setData, post, processing, reset} = useForm({
    user_id: auth.user.id,
    team_name: "",
    team_size: "",
  })

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/plan/create/team", {
      onSuccess: () => reset(),
    });
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-indigo-100 px-6 py-12">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Team Plan Setup</h2>
        <p className="text-center text-gray-700 mb-8">
          Enter your details to create your team workspace.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label htmlFor="team_name" className="block text-sm font-semibold text-indigo-800 mb-1">
              Team Name
            </label>
            <input
              type="text"
              name="team_name"
              required
              value={data.team_name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-md"
              placeholder="Team Name"
            />
          </div>
          <div>
            <label htmlFor="team_size" className="block text-sm font-semibold text-indigo-800 mb-1">
              Team Size
            </label>
            <TeamSizeSelect onChange={handleChange} value={data.team_size} />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-full font-semibold hover:bg-indigo-700 transition shadow-lg"
          >
            Continue
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
