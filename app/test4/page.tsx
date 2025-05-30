// components/PCAPlot.js
'use client';

import React, { useEffect, useState } from 'react';

const PCAPlot = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/pca-plot')
      .then(res => res.json())
      .then(data => {
        if (data.image) {
          setImage(data.image);
        } else if (data.error) {
          setError(data.error);
        }
      })
      .catch(err => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!image) return <p>Loading...</p>;

  return (
    <div>
      <h2>PCA Plot</h2>
      <img src={`data:image/png;base64,${image}`} alt="PCA Plot" />
    </div>
  );
};

export default PCAPlot;
