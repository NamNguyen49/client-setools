import React from 'react';
import "./style.css";

function MemberList({ members, onDeleteMember }) {
    return (
        <div>
            <h3>Members:</h3>
            <ul >
                {members.map((member, index) => (
                    <li key={index} className="member-item">
                        <div className="member-avatar">
                            <img src={`https://www.gravatar.com/avatar/${member.emailHash}`} alt="Avatar" />
                        </div>
                        <div className="member-details">
                            <p>{member.email}</p>
                        </div>
                        <div className="member-actions">
                            <button onClick={() => onDeleteMember(member.id)}>Delete</button>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MemberList;
