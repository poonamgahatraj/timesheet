import React, { useState } from 'react';


export default function Admin() {
  // Sample data of members
  const [members] = useState(['John Doe','Jane Smith','Michael Johnson','Emily Davis','Chris Brown']);


  const [searchTerm, setSearchTerm] = useState('');


  const filteredMembers = members.filter(member =>
    member.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectMember = (member) => {
    setSearchTerm(member); // Set the clicked member's name as the search term
  };

  return (
    <>
      <div >
        <div style={{ display: "flex" }}>
          
          <div style={{ width: "30%",height:"100vh", padding: "10px",border:"1px solid black" }}>
         
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}style={{  width: "100%",padding: "10px", fontSize: "16px",borderRadius: "5px",border: "1px solid #ccc", marginBottom: "10px" ,boxSizing:"border-box"}} />

                 <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member, index) => (
                  <li key={index}  onClick={() => handleSelectMember(member)} style={{ padding: "8px 0", borderBottom: "1px solid #eee"  , cursor: "pointer"}} >
                    {member}
                  </li>
                ))
              ) : (
                <li style={{ padding: "8px 0", color: "red" }}>Member not found</li>
              )}
            </ul>
          </div>

         
          <div style={{ width: "70%" }}>
           
          </div>
        </div>
      </div>
    </>
  );
}
