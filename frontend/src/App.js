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

function App() {
  const [position, setPosition] = useState('');
  const [jobs, setJobs] = useState([]);

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  const handleRecommendation = async () => {
    try {
      console.log('Selected Position:', position); // For debugging

      const response = await fetch('http://localhost:5000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Position: position }),
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
      <button onClick={handleRecommendation}>Get Recommendations</button>
      {jobs.length > 0 && (
        <div className="recommended-jobs">
          <h2>Recommended Jobs:</h2>
          <ul>
            {jobs.map((job, index) => (
              <li key={index}>{job}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
