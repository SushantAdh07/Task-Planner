import React from "react";
import { useForm } from "@inertiajs/inertia-react";

export default function MemberRegister({ member }) {
    const { data, setData, put, post, processing, errors } = useForm({
        name: "",
        password: "",
        password_confirmation: "",
        email: member.email,          
        team_id: member.team_id       
    });
    console.log("id:", member.id);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/plan/update/profile/${member.id}`, {
          onSuccess: () =>{
              window.location.href = '/plan/team';
          },
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Complete Your Registration</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>

                <input type="hidden" name="team_id" value={data.team_id} />

                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
