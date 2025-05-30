"use client";
import React, { useEffect, useState } from "react";

type PlotType = "pca" | "kmeans" | "tsne" | "umap";

const plotEndpoints: Record<PlotType, string> = {
  pca: "https://58a6-103-171-58-188.ngrok-free.app/pca-plot",
  kmeans: "https://58a6-103-171-58-188.ngrok-free.app/kmeans-plot",
  tsne: "https://58a6-103-171-58-188.ngrok-free.app/tsne-plot",
  umap: "https://58a6-103-171-58-188.ngrok-free.app/umap-plot",
};

export default function Home() {
  const [images, setImages] = useState<Record<PlotType, string | null>>({
    pca: null,
    kmeans: null,
    tsne: null,
    umap: null,
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlots() {
      try {
        const results: Partial<Record<PlotType, string>> = {};

        for (const type of Object.keys(plotEndpoints) as PlotType[]) {
          const res = await fetch(plotEndpoints[type], {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          });
          if (!res.ok) {
            throw new Error(`Failed to fetch ${type} plot`);
          }
          const data = await res.json();
          results[type] = data.image || null;
        }
        setImages((prev) => ({ ...prev, ...results }));
      } catch (err: any) {
        setError(err.message || "Failed to fetch plots");
      }
    }

    fetchPlots();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (Object.values(images).some((img) => img === null)) {
    return <div>Loading plots...</div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h1>Gene Expression Plots - GSE96058</h1>

      {Object.entries(images).map(([key, base64]) => (
        <div key={key} style={{ marginBottom: 40 }}>
          <h2 style={{ textTransform: "uppercase" }}>{key} plot</h2>
          <img
            src={`data:image/png;base64,${base64}`}
            alt={`${key} plot`}
            style={{ width: "100%", border: "1px solid #ccc", borderRadius: 8 }}
          />
        </div>
      ))}
    </div>
  );
}
