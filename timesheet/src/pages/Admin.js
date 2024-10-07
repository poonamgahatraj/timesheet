import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useUserContext } from '../context/usercontext';

export default function Admin() {
  const { users } = useUserContext();
  
  const admin = users.find(user => user.role === 'admin'); // Assuming admin is the one with role 'admin'
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [timesheets, setTimesheets] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

  const navigate = useNavigate(); // Initialize navigate

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const savedTimesheets = JSON.parse(localStorage.getItem('timesheets')) || [];
    setTimesheets(savedTimesheets);
  }, []);

  const filteredMembers = users.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectMember = (member) => {
    setSearchTerm(member.name);
    setSelectedMember(member);
  };

  const selectedMemberTimesheets = selectedMember
    ? timesheets.filter(sheet => 
        sheet.email === selectedMember.email &&
        sheet.month === selectedMonth &&
        sheet.year === selectedYear
      )
    : [];

  const combinedTimesheet = selectedMemberTimesheets.reduce((acc, sheet) => {
    Object.entries(sheet.timesheet).forEach(([day, details]) => {
      if (!acc[day]) {
        acc[day] = { year: sheet.year, month: sheet.month, ...details };
      }
    });
    return acc;
  }, {});

  const totalAmount = Object.values(combinedTimesheet).reduce((total, details) => {
    return total + (details.hours * (selectedMember?.hourlyRate || 0));
  }, 0);

  const handleLogout = () => {
    navigate('/'); // Navigate to the home route
  };

  return (
    <>
      <div style={{ height: "100vh", width: "100%", backgroundColor: "#9DB0EC", display: "flex", justifyContent: "center", alignItems: "center", boxSizing: "border-box", position: "relative" }}>
        
        {/* Admin Info at the Top Right Corner */}
        <div style={{}}>
        {admin && (
          <div style={{ position: "absolute", top: "10px", right: "20px", textAlign: "right", display: "flex", alignItems: "center", gap: "10px" }}>
           <img src='.\profileicon.jpg' style={{ height: "30px", width: "30px", borderRadius: "50%" }} alt="Admin Icon"/>
            <div>
              <p style={{ margin: "0" }}>{admin.email}</p>
              <p style={{ margin: "0" }}>{admin.role}</p>
            </div>
            {/* Logout Button */}
            <button onClick={handleLogout} style={{ marginLeft: "10px", padding: "5px 10px", cursor: "pointer" }}>Logout</button>
          </div>
        )}
        </div>

        <div style={{ display: "flex", width: "70%", height: "70%", backgroundColor: "white", borderRadius: "10px" }}>
          
          <div style={{ width: "30%", padding: "10px", border: "1px solid black", borderRadius: "10px" }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%", padding: "10px", fontSize: "16px", borderRadius: "5px",
                border: "1px solid #ccc", marginBottom: "10px", boxSizing: "border-box"
              }}
            />
            <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectMember(member)}
                    style={{
                      padding: "8px 8px",
                      borderBottom: "1px solid #eee",
                      cursor: "pointer",
                      color: selectedMember?.email === member.email ? 'blue' : 'black',
                      backgroundColor: selectedMember?.email === member.email ? 'lightblue' : 'transparent'
                    }}
                  >
                    {member.name}
                  </li>
                ))
              ) : (
                <li style={{ padding: "8px 0", color: "red" }}>Member not found</li>
              )}
            </ul>
          </div>

          <div style={{ width: "70%", padding: "10px" }}>
            {selectedMember ? (
              <div>
                <h2>Member Details</h2>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h4>{selectedMember.name}</h4>
                  <h4><strong>Hourly Rate:</strong> :${selectedMember.hourlyRate}</h4>
                  <h4>{selectedMember.email}</h4>
                </div>

                {/* Month and Year Dropdowns */}
                <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
                  <select 
                    value={selectedMonth} 
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))} 
                    style={{ padding: '8px', fontSize: '16px' }}
                  >
                    {monthNames.map((month, index) => (
                      <option key={index} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))} 
                    style={{ padding: '8px', fontSize: '16px' }}
                  >
                    {[2022, 2023, 2024].map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <h3>Timesheet Details</h3>
                {Object.keys(combinedTimesheet).length > 0 ? (
                  <>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                      <thead>
                        <tr>
                          <th style={{ padding: '10px', border: '1px solid #ccc' }}>Year</th>
                          <th style={{ padding: '10px', border: '1px solid #ccc' }}>Month</th>
                          <th style={{ padding: '10px', border: '1px solid #ccc' }}>Day</th>
                          <th style={{ padding: '10px', border: '1px solid #ccc' }}>Hours</th>
                          <th style={{ padding: '10px', border: '1px solid #ccc' }}>Title</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(combinedTimesheet).map(([day, details]) => (
                          <tr key={day}>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{details.year}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                              {monthNames[details.month - 1]}
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{day}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{details.hours}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{details.title}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div style={{ marginTop: '20px', fontSize: '18px' }}>
                      <strong>Total Amount Earned: </strong> ${totalAmount.toFixed(2)}
                    </div>
                  </>
                ) : (
                  <p>No timesheet data available for this member for the selected month and year.</p>
                )}
              </div>
            ) : (
              <p>Select a member from the list to view details.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
