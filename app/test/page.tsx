"use client"
import { useEffect, useState } from 'react';

export default function CancerVolcanoPlot() {
  const [plot, setPlot] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/cancer')
      .then(res => res.json())
      .then(data => setPlot(data.plot));
  }, []);

  return (
    <div>
      <h1>Volcano Plot of Differential Gene Expression</h1>
      {plot ? (
        <img src={`data:image/png;base64,${plot}`} alt="Volcano Plot" style={{ maxWidth: '100%' }} />
      ) : (
        <p>Loading plot...</p>
      )}
    </div>
  );
}
