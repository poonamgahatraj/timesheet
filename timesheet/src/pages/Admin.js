import React, { useState, useContext, useEffect } from 'react';
import { useUserContext } from '../context/usercontext';

export default function Admin() {
  // Sample data of members
  const { users } = useUserContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [timesheets, setTimesheets] = useState([]);

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

  return (
    <>
      <div>
        <div style={{ display: "flex" }}>
          
          <div style={{ width: "30%", height: "100vh", padding: "10px", border: "1px solid black" }}>
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

          <div style={{ width: "70%" }}>
            {selectedMember ? (
              <div>
                <h2>Member Details</h2>
                <p><strong>Name:</strong> {selectedMember.name}</p>
                <p><strong>Email:</strong> {selectedMember.email}</p>
                <p><strong>Hourly Rate:</strong> ${selectedMember.hourlyRate}</p>

                <h3>Timesheet Details</h3>
                {selectedMemberTimesheets.length > 0 ? (
                  <ul>
                    {selectedMemberTimesheets.map((sheet, index) => (
                      <li key={index} style={{ marginBottom: '10px' }}>
                        <p><strong>Year:</strong> {sheet.year}</p>
                        <p><strong>Month:</strong> {sheet.month}</p>
                        <ul>
                          {Object.entries(sheet.timesheet).map(([day, details]) => (
                            <li key={day}>
                              <p>Day: {day}, Hours: {details.hours}, Title: {details.title}</p>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
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
