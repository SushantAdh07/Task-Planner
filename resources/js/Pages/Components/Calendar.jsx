import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Dialog from "./Dialog/Dialog";

function CalendarApp({ tasks, loggedInUser, selectedUser, users }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDialog, setShowDialog] = useState(false);

    // Log tasks to debug date format
    console.log("Tasks:", tasks);

    // Handle date change
    const handleDateChange = (date) => {
        const boxNumber = date.toLocaleDateString("en-CA");
        console.log("Selected Date:", boxNumber);
        setSelectedDate(date); // Update selected date as Date object
        setShowDialog(boxNumber); // Show dialog
    };

    // Convert task date string (YYYY-MM-DD) to Date object
    const convertToDate = (dateString) => {
        return new Date(dateString); // Convert to Date object
    };

    // Check if a date has tasks (convert task date to Date format for comparison)
    const hasTasks = (date) => {
        const selectedDateString = date.toLocaleDateString("en-CA"); // Convert selected date to YYYY-MM-DD
        console.log("Checking tasks for date:", selectedDateString);

        // Convert tasks dates to Date objects and check if any matches
        return tasks.some((task) => {
            const taskDate = convertToDate(task.selected_date);
            return taskDate.toLocaleDateString("en-CA") === selectedDateString; // Compare in YYYY-MM-DD format
        });
    };

    // Apply custom class to dates with tasks
    const tileClassName = ({ date }) => {
        return hasTasks(date) ? "highlighted-date" : null;
    };

    // Close dialog
    const closeDialog = () => {
        setShowDialog(false);
    };

    return (
        <div>
            {/* Calendar Component */}
            <Calendar
                className="calendar-styles"
                onChange={handleDateChange}
                value={selectedDate.toLocaleDateString("en-CA")}
                tileClassName={tileClassName} // Apply custom class to dates
            />

            {/* Dialog for Selected Date */}
            {showDialog && (
                <div className="dialog-box">
                    <Dialog
                        value={selectedDate.toLocaleDateString("en-CA")}
                        tasks={tasks}
                        loggedInUser={loggedInUser}
                        selectedUser={selectedUser}
                        users={users}
                    />
                    <button
                        className="btn neutralButton mt-3"
                        onClick={closeDialog}
                        style={{ padding: "10px 20px", fontSize: "16px" }}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}

export default CalendarApp;
