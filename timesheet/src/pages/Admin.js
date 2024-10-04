import React, { useState, useContext, useEffect } from 'react';
import { useUserContext } from '../context/usercontext';

export default function Admin() {
  // Sample data of members
  const { users } = useUserContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [timesheets, setTimesheets] = useState([]);

  // Array to map month numbers to month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Fetch timesheets from local storage when the component mounts
  useEffect(() => {
    const savedTimesheets = JSON.parse(localStorage.getItem('timesheets')) || [];
    setTimesheets(savedTimesheets);
  }, []);

  // Filter users by the search term
  const filteredMembers = users.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle member selection
  const handleSelectMember = (member) => {
    setSearchTerm(member.name); // Set the clicked member's name as the search term
    setSelectedMember(member); // Update the selected member's details
  };

  // Find the timesheet entries for the selected member
  const selectedMemberTimesheets = selectedMember
    ? timesheets.filter(sheet => sheet.email === selectedMember.email)
    : [];

  // Combine all timesheets for the selected member into a single object by day
  const combinedTimesheet = selectedMemberTimesheets.reduce((acc, sheet) => {
    Object.entries(sheet.timesheet).forEach(([day, details]) => {
      // If the day doesn't exist in the accumulator, add it
      if (!acc[day]) {
        acc[day] = { year: sheet.year, month: sheet.month, ...details };
      }
    });
    return acc;
  }, {});

  // Calculate total amount based on hours worked and hourly rate
  const totalAmount = Object.values(combinedTimesheet).reduce((total, details) => {
    return total + (details.hours * (selectedMember?.hourlyRate || 0));
  }, 0);

  return (
    <>
      <div style={{height:"100vh",width:"100%",backgroundColor:"red",display:"flex",justifyContent:"center",alignItems:"center",boxSizing:"border-box"}}>
        <div style={{ display: "flex",width:"70%",height:"70%",backgroundColor:"white" }}>
          
          {/* Left section for search and member list */}
          <div style={{ width: "30%", padding: "10px", border: "1px solid black" }}>
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
                    style={{ padding: "8px 0", borderBottom: "1px solid #eee", cursor: "pointer" }}
                  >
                    {member.name}
                  </li>
                ))
              ) : (
                <li style={{ padding: "8px 0", color: "red" }}>Member not found</li>
              )}
            </ul>
          </div>

          {/* Right section for member details and timesheet in table format */}
          <div style={{ width: "70%", padding: "10px" }}>
            {selectedMember ? (
              <div>
                <h2>Member Details</h2>

                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <h4>{selectedMember.name}</h4>
                 
                  <h4><strong>Hourly Rate:</strong> :${selectedMember.hourlyRate}</h4>
                  <h4>{selectedMember.email}</h4>

                </div>
                {/* <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>Name:</strong></td>
                      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{selectedMember.name}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>Email:</strong></td>
                      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{selectedMember.email}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '10px', border: '1px solid #ccc' }}><strong>Hourly Rate:</strong></td>
                      <td style={{ padding: '10px', border: '1px solid #ccc' }}>${selectedMember.hourlyRate}</td>
                    </tr>
                  </tbody>
                </table> */}

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
                              {monthNames[details.month - 1]} {/* Convert month number to name */}
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{day}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{details.hours}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{details.title}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Display Total Amount */}
                    <div style={{ marginTop: '20px', fontSize: '18px' }}>
                      <strong>Total Amount Earned: </strong> ${totalAmount.toFixed(2)}
                    </div>
                  </>
                ) : (
                  <p>No timesheet data available for this member.</p>
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
