import { useEffect, useState } from 'react';

export default function StudentDashboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('http://localhost:5000/api/leaderboard/students?limit=10', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setLeaderboard)
      .catch(() => {});
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Student Dashboard</h2>
      <h3>Top Students</h3>
      <ol>
        {leaderboard.map((entry) => (
          <li key={entry._id}>
            {entry.student?.name} - {entry.ecoPoints} pts
          </li>
        ))}
      </ol>
    </div>
  );
}


