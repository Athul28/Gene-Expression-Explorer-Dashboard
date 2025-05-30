"use client"
import { useEffect, useState } from 'react';

export default function Home() {
  const [topGenes, setTopGenes] = useState([]);
  const [volcanoPlot, setVolcanoPlot] = useState('');
  const [pcaPlot, setPcaPlot] = useState('');
  const [heatmapPlot, setHeatmapPlot] = useState('');
  const [classifierResults, setClassifierResults] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);

    try {
      const resTop = await fetch('http://127.0.0.1:5000/api/top-genes');
      const top = await resTop.json();
      setTopGenes(top.genes);

      const resVolcano = await fetch('http://127.0.0.1:5000/api/volcano');
      const volcano = await resVolcano.json();
      setVolcanoPlot(`data:image/png;base64,${volcano.image}`);

      const resPca = await fetch('http://127.0.0.1:5000/api/pca');
      const pca = await resPca.json();
      setPcaPlot(`data:image/png;base64,${pca.image}`);

      const resHeatmap = await fetch('http://127.0.0.1:5000/api/heatmap');
      const heatmap = await resHeatmap.json();
      setHeatmapPlot(`data:image/png;base64,${heatmap.image}`);

      const resClassifier = await fetch('http://127.0.0.1:5000/api/classifier');
      const clf = await resClassifier.json();
      setClassifierResults(clf);

    } catch (err) {
      console.error('Error fetching data:', err);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Gene Expression Analysis</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <section>
            <h2 className="text-xl font-semibold">Top Genes</h2>
            <ul className="list-disc ml-6">
              {topGenes.map((gene, index) => (
                <li key={index}>{gene}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Volcano Plot</h2>
            <img src={volcanoPlot} alt="Volcano Plot" className="w-full max-w-3xl" />
          </section>

          <section>
            <h2 className="text-xl font-semibold">PCA Plot</h2>
            <img src={pcaPlot} alt="PCA Plot" className="w-full max-w-3xl" />
          </section>

          <section>
            <h2 className="text-xl font-semibold">Gene Expression Heatmap</h2>
            <img src={heatmapPlot} alt="Heatmap" className="w-full max-w-3xl" />
          </section>

          <section>
            <h2 className="text-xl font-semibold">Classifier Accuracy</h2>
            <p><strong>Random Forest:</strong> {classifierResults.random_forest}</p>
            <p><strong>SVM:</strong> {classifierResults.svm}</p>
            <p><strong>XGBoost:</strong> {classifierResults.xgboost}</p>
          </section>
        </>
      )}
    </div>
  );
}
