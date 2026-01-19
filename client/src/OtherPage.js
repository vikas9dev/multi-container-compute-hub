import React from 'react';
import { Link } from 'react-router-dom';

const OtherPage = () => {
  return (
    <div className="card fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
        System Architecture
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
        This application utilizes a distributed architecture with multiple microservices.
        It demonstrates container orchestration, asynchronous task processing, and persistent data storage.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        {['Docker', 'Redis', 'Postgres', 'Nginx', 'Express', 'React'].map(tech => (
          <span key={tech} className="index-badge" style={{ padding: '0.6rem 1.2rem', fontSize: '1rem' }}>
            {tech}
          </span>
        ))}
      </div>

      <Link to="/" className="btn-primary" style={{ display: 'inline-flex', textDecoration: 'none' }}>
        Back to Dashboard
      </Link>
    </div>
  );
};

export default OtherPage;
