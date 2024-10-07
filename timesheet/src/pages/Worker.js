import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/usercontext';

export default function Worker() {
    const { users } = useUserContext();
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const loggedInUserEmail = state?.email ? state.email : '';

    const loggedInUser = users.find(user => user.email === loggedInUserEmail);

    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [timesheet, setTimesheet] = useState({});
    const [savedTimesheet, setSavedTimesheet] = useState(null); // To store existing timesheet data for comparison

    useEffect(() => {
        const savedTimesheets = JSON.parse(localStorage.getItem('timesheets')) || [];
        const currentTimesheet = savedTimesheets.find(
            ts => ts.email === loggedInUserEmail && ts.year === selectedYear && ts.month === selectedMonth
        );
        if (currentTimesheet) {
            setSavedTimesheet(currentTimesheet.timesheet); // Store existing timesheet data
            setTimesheet(currentTimesheet.timesheet);      // Set timesheet for the selected month
        } else {
            setSavedTimesheet(null); // No saved timesheet for the selected month
            setTimesheet({});        // Reset the timesheet for new entries
        }
    }, [loggedInUserEmail, selectedYear, selectedMonth]);

    const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

    const daysInMonth = useMemo(() => {
        if (selectedYear && selectedMonth) {
            return getDaysInMonth(selectedYear, selectedMonth);
        }
        return 0;
    }, [selectedYear, selectedMonth]);

    const handleInputChange = (day, field, value) => {
        setTimesheet(prevTimesheet => ({
            ...prevTimesheet,
            [day]: {
                ...prevTimesheet[day],
                [field]: value
            }
        }));
    };

    const handleSubmit = () => {
        const payload = {
            email: loggedInUserEmail,
            year: selectedYear,
            month: selectedMonth,
            timesheet: timesheet
        };

        const savedTimesheets = JSON.parse(localStorage.getItem('timesheets')) || [];
        const index = savedTimesheets.findIndex(
            ts => ts.email === loggedInUserEmail && ts.year === selectedYear && ts.month === selectedMonth
        );

        if (index !== -1) {
            savedTimesheets[index] = payload; // Update existing timesheet
        } else {
            savedTimesheets.push(payload); // Add new timesheet
        }

        localStorage.setItem('timesheets', JSON.stringify(savedTimesheets));

        console.log("Timesheet saved locally:", payload);
        setSavedTimesheet(timesheet); // Update the savedTimesheet to the new one
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <>
            <div style={{ padding: "2%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img src='./profileicon.jpg' style={{ height: "25px", width: "25px", border: "1px solid black", borderRadius: "50%" }} alt="profile" />
                        <p>{loggedInUser ? loggedInUser.name : 'Guest'}</p>
                    </div>
                    <button onClick={handleLogout} style={{ padding: '8px 16px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>
                        Logout
                    </button>
                </div>

                <div style={{ display: "flex", gap: "20px", marginTop: '20px' }}>
                    <label>
                        Select Year:
                        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                            <option value="">--Select Year--</option>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Select Month:
                        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                            <option value="">--Select Month--</option>
                            {months.map((month, index) => (
                                <option key={index} value={index + 1}>{month}</option>
                            ))}
                        </select>
                    </label>
                </div>

                {daysInMonth > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', marginTop: '20px' }}>
                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                            <div
                                key={day}
                                style={{
                                    border: '1px solid black',
                                    padding: '10px',
                                    textAlign: 'center'
                                }}
                            >
                                <div>
                                    <input
                                        type="number"
                                        value={timesheet[day]?.hours || ''}
                                        onChange={(e) => handleInputChange(day, 'hours', e.target.value)}
                                        placeholder="Hours Worked"
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            border: 'none',
                                            outline: 'none',
                                            padding: '5px',
                                            marginBottom: '5px'
                                        }}
                                        disabled={!!savedTimesheet?.[day]} // Disable only for days that already have data
                                    />
                                    <input
                                        type="text"
                                        value={timesheet[day]?.title || ''}
                                        onChange={(e) => handleInputChange(day, 'title', e.target.value)}
                                        placeholder="Work Title"
                                        style={{
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            border: 'none',
                                            outline: 'none',
                                            padding: '5px'
                                        }}
                                        disabled={!!savedTimesheet?.[day]} // Disable only for days that already have data
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                    Submit
                </button>
            </div>
        </>
    );
}
