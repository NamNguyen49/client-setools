import React, { useState, useEffect } from 'react';

function MemberList({ members }) {
    return (
        <div>
            <h3>Members:</h3>
            <ul>
                {members.map((member, index) => (
                    <li key={index}>{member.email}</li>
                ))}
            </ul>
        </div>
    );
}

export default MemberList;
