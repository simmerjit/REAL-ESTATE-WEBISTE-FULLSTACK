import React from 'react';
import '../styles/AgentCard.css';
import 'animate.css';
import { useNavigate } from 'react-router-dom';

const AgentCard = ({ agent }) => {
  const navigate = useNavigate();

  return (
    <div className="agent-card animate__animated animate__fadeInUp animate__faster">
      <div className="agent-photo-circle">
        {agent.image ? (
          <img src={agent.image} alt={agent.name} className="agent-image" />
        ) : (
          <div className="placeholder-avatar">{agent.name?.charAt(0) ?? 'A'}</div>
        )}
      </div>

      <div className="agent-details">
        <h3>{agent.name}</h3>
        <p className="title">{agent.email}</p>
        <p className="phone">{agent.phone || "No phone provided"}</p>
        <p className="rating">⭐ Rating: {agent.rating?.toFixed(1) ?? "N/A"}</p>

        <div className="buttons">
          <button className="primary" onClick={() => navigate("/help")}>Contact</button>
          <button className="secondary">View Profile</button>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
