
import React, { useState, useMemo } from 'react';

export default function Worker() {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [reminders, setReminders] = useState({});
  
    // Generate an array of years (e.g., 2020 to 2030)
    const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
    
    // Generate an array of months
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    // Function to calculate the number of days in a given month and year
    const getDaysInMonth = (year, month) => {
      return new Date(year, month, 0).getDate();
    };
  
    // Generate the days grid based on the selected month and year
    const daysInMonth = useMemo(() => {
      if (selectedYear && selectedMonth) {
        return getDaysInMonth(selectedYear, selectedMonth);
      }
      return 0;
    }, [selectedYear, selectedMonth]);
  
    const handleReminderChange = (day, e) => {
      setReminders(prevReminders => ({
        ...prevReminders,
        [day]: e.target.value
      }));
    };
  return (
   <>
   <div style={{padding:"2%"}}>

   
   <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:"10px"}}>
    <img src='.\profileicon.jpg' style={{height:"25px",width:"25px",border:"1px solid black",borderRadius:"50%"}}></img>
    <p>Username</p>
   </div>

   <div style={{display:"flex",gap:"20px"}}>
      <label>
        Select Year:
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">--Select Year--</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Select Month:
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="">--Select Month--</option>
          {months.map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
          ))}
        </select>
      </label>
      <br />

     
    </div>

    {daysInMonth > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' ,marginTop:"1%"}}>
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
            <div
              key={day}
              style={{
                border: '1px solid black',
                padding: '10px',
                textAlign: 'center'
              }}
            >
                 <input
                type="text"
                value={reminders[day] || ''}
                onChange={(e) => handleReminderChange(day, e)}
                placeholder={day}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  border: 'none',
                  outline: 'none'
                }}
              />
           
            </div>
          ))}
        </div>
      )}


   </div>

   
   </>
  )
}
