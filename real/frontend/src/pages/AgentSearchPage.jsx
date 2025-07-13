import React, { useState, useEffect } from 'react';
import '../styles/AgentSearchPage.css';
import AgentCard from '../components/agentCard';
import 'animate.css';
import { useNavigate } from 'react-router-dom';

const AgentSearchPage = () => {
  const [agents, setAgents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // Fetch all agents initially
  useEffect(() => {
    if (search.trim()) return;

    const fetchAllAgents = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:4000/agents');
        if (!res.ok) throw new Error('Failed to fetch all agents');
        const data = await res.json();
        setAgents(data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAgents();
  }, []);

  // Search agents based on input
  useEffect(() => {
    if (!search.trim()) return;

    const fetchAgents = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/agents/search?search=${search}`);
        if (!res.ok) throw new Error('Failed to fetch agents');
        const data = await res.json();
        setAgents(data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [search]);

  const handleSearch = () => {
    // already handled by useEffect
    console.log("Search clicked");
  };

  const filteredAgents =
    filter === 'all'
      ? agents
      : agents.filter((a) => a.specialties.includes(filter));

  return (
    <div className="page-container animate__animated animate__fadeIn">
      <header className="header">
        <div className="logo">RealEstate Pro</div>
      </header>

      {/* Hero Banner */}
      <section className="hero-banner animate__animated animate__fadeInDown">
        <div className="hero-overlay">
          <h1>A great agent makes all the difference</h1>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="City, neighborhood, or ZIP code"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-icon" onClick={handleSearch}>🔍</button>
          </div>
        </div>
      </section>

      <section className="results-intro animate__animated animate__fadeInUp">
        <h2>Real Estate Agents in Chicago, IL</h2>
        <p>
          With over a million agents from all the top brokerages, a local agent
          knows your market and can guide you through the process from start to
          finish.
        </p>
      </section>

      {/* Agent Grid */}
      <section className="agent-grid">
        {filteredAgents.slice(0, visibleCount).map((agent, index) => (
          <div className="animate__animated animate__fadeInUp" key={index}>
            <AgentCard agent={agent} />
          </div>
        ))}
      </section>

      {/* Load More Button */}
      {visibleCount < filteredAgents.length && (
        <div className="load-more-container animate__animated animate__fadeInUp animate__delay-1s">
          <button className="load-more-btn" onClick={handleViewMore}>
            View more
          </button>
        </div>
      )}
    </div>
  );
};

export default AgentSearchPage;
