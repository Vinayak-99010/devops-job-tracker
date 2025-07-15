import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/jobs';

function App() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    company: '',
    role: '',
    status: '',
    date_applied: '',
    notes: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await axios.get(API);
    setJobs(res.data);
  };

  const addJob = async () => {
    await axios.post(API, form);
    setForm({ company: '', role: '', status: '', date_applied: '', notes: '' });
    fetchJobs();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>DevOps Job Tracker</h2>
      <input placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
      <input placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
      <input placeholder="Status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} />
      <input placeholder="Date Applied" value={form.date_applied} onChange={e => setForm({ ...form, date_applied: e.target.value })} />
      <input placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
      <button onClick={addJob}>Add Job</button>
      <ul>
  {jobs.length === 0 && <p>No jobs yet.</p>}
  {jobs.map(job => (
    <li key={job._id} style={{ marginBottom: '1rem' }}>
      <strong>{job.company}</strong> — {job.role} — {job.status}  
      <div>📅 Applied On: <em>{job.date_applied || 'N/A'}</em></div>
      <div><i>📝 {job.notes}</i></div>
      <hr />
    </li>
  ))}
</ul>

    </div>
  );
}

export default App;
