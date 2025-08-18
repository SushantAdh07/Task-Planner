import React from "react";
import Calendar from "./CustomCalendar";
import { usePage, Link } from "@inertiajs/react";

function Main({ tasks = [], user, errors, comments = [] }) {
    const [openCommentBox, setOpenCommentBox] = React.useState(null);
    const { flash } = usePage().props;
    {/* const [userTasks, setUserTasks] = React.useState(           
            tasks.map((task) => ({
                ...task,
                comments: task.comments || [], 
            }))
    );

     const handleOpenCommentBox = (userId) => {
         setSelectedUserId(userId);
         setUserTasks(
             tasks
                 .filter((task) => task.user_id === userId)
                 .map((task) => ({
                     ...task,
                     comments: task.comments || [],
                 }))
         );
     }; 


    const handleCloseCommentBox = () => {
        setOpenCommentBox(false);
     }; */}

    return (
        <>
            <div className="container p-3 main">
                {/** <div className="col-md-4 mt-3 bg-dark sidebar">
                    <Sidebar />
                </div> */}

                <div className="flex justify-between items-center w-full">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 truncate max-w-[50%] sm:max-w-[70%]">
                        Calendar for {user.name}
                    </h2>
                </div>

                <Calendar
                    tasks={tasks}
                    errors={errors}
                    flash={flash}
                    comments={comments}
                />
            </div>
        </>
    );
}

export default Main;
