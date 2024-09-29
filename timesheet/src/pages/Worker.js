import React, { useState, useMemo } from 'react';

export default function Worker() {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [timesheet, setTimesheet] = useState({});
  
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
  
    // Handle input changes for hours worked and title for each day
    const handleInputChange = (day, field, value) => {
      setTimesheet(prevTimesheet => ({
        ...prevTimesheet,
        [day]: {
          ...prevTimesheet[day],
          [field]: value
        }
      }));
    };
  
    // Handle submit button to log or post the timesheet data
    const handleSubmit = () => {
      console.log("Timesheet Data:", timesheet);
      // Here you can also make a POST request to submit the timesheet to a backend server
    };

    return (
      <>
        <div style={{ padding: "2%" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "10px" }}>
            <img src='./profileicon.jpg' style={{ height: "25px", width: "25px", border: "1px solid black", borderRadius: "50%" }} alt="profile" />
            <p>Username</p>
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

          {/* Display the grid for days */}
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
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button  onClick={handleSubmit}  style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px'   }}>
            Submit 
          </button>
        </div>
      </>
    );
}
