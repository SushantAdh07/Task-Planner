import React from "react";
import { router, usePage } from "@inertiajs/react";

function InputDialog({ value, tasks }) {
    const { auth } = usePage().props;
    const [values, setValues] = React.useState({
        user_id: auth.user.id,
        task_name: "",
        task_description: "",
        selected_date: value,
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.post("/tasks", values, {
            onSuccess: () => {
                router.visit("/home");
            },
        });
    }

    return (
        <>
            <div className="dialog-input">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="taskTitle" className="form-label">
                            Task Title
                        </label>
                        <input
                            type="text"
                            name="task_name"
                            id="task_name"
                            className="form-control"
                            value={values.task_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskDesc" className="form-label">
                            Task Description
                        </label>
                        <textarea
                            className="form-control"
                            name="task_description"
                            id="task_description"
                            value={values.task_description}
                            onChange={handleChange}
                            rows="3"
                        ></textarea>
                    </div>
                    <input type="hidden" name="user_id" value={auth.user.id} />
                    <input
                        type="hidden"
                        name="selected_date"
                        id="selected_date"
                        value={values.selected_date}
                    />
                    <button type="submit" className="btn neutralButton">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default InputDialog;
