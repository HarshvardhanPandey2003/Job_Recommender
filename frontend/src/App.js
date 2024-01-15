import React, { useState } from 'react';
import './App.css';

const jobTitleSuggestions = [
  'Server',
  'Administrative Assistant',
  'Customer Service Representative',
  'Staff Accountant',
  'Accounting Clerk',
  'Accounts Payable Clerk',
  'Receiving/Stock Associate',
  'Accounts Receivable Clerk',
  'Customer Service / Sales (New Grads Welcome!)',
  'Full Charge Bookkeeper',
  'Bookkeeper',
  'Retail Sales Associate / Photographer',
  'Senior Accountant',
  'Retail Sales Associate - Part-Time',
  'Data Entry Clerk',
  'Receptionist',
];

const stateOptions = ['California', 'Florida', 'Pennsylvania', 'Ohio','Texas','Illinois','Washington','New York'];

const App = () => {
  const [position, setPosition] = useState('');
  const [state, setState] = useState('');
  const [jobs, setJobs] = useState([]);

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleRecommendation = async () => {
    try {
      const combinedString = `${position} ${state}`.trim(); // Combine position and state with a space in between
      console.log('Selected Position and State:', combinedString); // For debugging

      const response = await fetch('http://localhost:5000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Position: combinedString }),
      });

      if (!response.ok) {
        throw new Error('Position not provided');
      }

      const data = await response.json();
      setJobs(data.jobs);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const formatRecommendations = (jobs) => {
    if (jobs.length === 0) {
      return <strong style={{ fontSize: '1.2em' }}>No Results Found</strong>;
    }

    return (
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            <strong>{index + 1}. </strong> {job}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container">
      <h1>Job Recommendation System</h1>
      <label>
        Select or enter your position:
        <select value={position} onChange={handlePositionChange}>
          <option value="" disabled>Select a job title</option>
          {jobTitleSuggestions.map((title, index) => (
            <option key={index} value={title}>
              {title}
            </option>
          ))}
        </select>
      </label>
      <label>
        Select or enter your state:
        <select value={state} onChange={handleStateChange}>
          <option value="" disabled>Select a state</option>
          {stateOptions.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleRecommendation}>Get Recommendations</button>
      <div className="recommended-jobs">
        <h2>Recommended Jobs:</h2>
        {formatRecommendations(jobs)}
      </div>
    </div>
  );
};

export default App;
