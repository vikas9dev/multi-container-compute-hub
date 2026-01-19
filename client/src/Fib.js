import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Fib.css';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  const fetchValues = useCallback(async () => {
    try {
      const response = await axios.get('/api/values/current');
      setValues(response.data || {});
    } catch (err) {
      console.error('Error fetching values:', err);
    }
  }, []);

  const fetchIndexes = useCallback(async () => {
    try {
      const response = await axios.get('/api/values/all');
      setSeenIndexes(response.data || []);
    } catch (err) {
      console.error('Error fetching indexes:', err);
    }
  }, []);

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, [fetchValues, fetchIndexes]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!index) return;

    try {
      await axios.post('/api/values', { index });
      setIndex('');
      fetchValues();
      fetchIndexes();
    } catch (err) {
      console.error('Error submitting index:', err);
    }
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }, i) => (
      <span key={`${number}-${i}`} className="index-badge">
        {number}
      </span>
    ));
  };

  const renderValues = () => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key} className="value-item">
          <span className="value-label">Index {key}</span>
          <span className={`value-result ${values[key] === 'Nothing yet!' ? 'status-nothing' : ''}`}>
            {values[key]}
          </span>
        </div>
      );
    }
    return entries;
  };

  return (
    <div className="fib-container">
      <div className="fib-grid">
        <section className="card form-card">
          <h2 className="card-title">🔢 Compute Fibonacci</h2>
          <form onSubmit={handleSubmit} className="input-group">
            <label htmlFor="fib-input">Enter an index (0-40) to calculate its value</label>
            <div className="input-row">
              <input
                id="fib-input"
                autoComplete="off"
                placeholder="Ex: 5, 10, 20..."
                value={index}
                onChange={(event) => setIndex(event.target.value)}
                type="text"
              />
              <button className="btn-primary">Calculate</button>
            </div>
          </form>
        </section>

        <section className="card">
          <h2 className="card-title">📜 History</h2>
          <div className="index-list">
            {seenIndexes.length > 0 ? renderSeenIndexes() : <p className="status-nothing">No indexes submitted yet</p>}
          </div>
        </section>

        <section className="card">
          <h2 className="card-title">⚡ Results</h2>
          <div className="values-list">
            {Object.keys(values).length > 0 ? renderValues() : <p className="status-nothing">No results yet</p>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Fib;
