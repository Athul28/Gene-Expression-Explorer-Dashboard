'use client'
import React, { useEffect, useState } from 'react'

export default function CovidPage() {
  const [loading, setLoading] = useState(true)
  const [genes, setGenes] = useState<any[]>([])
  const [plots, setPlots] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://flask-backend-9cx3.onrender.com/api/covid')
        const data = await res.json()
        setGenes(data.top_genes)
        setPlots(data.plots)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching data:', err)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="p-6 text-center">Loading...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Top Differentially Expressed Genes</h1>
      <table className="table-auto border border-gray-300 mb-6 w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Gene</th>
            <th className="border px-2 py-1">T-statistic</th>
            <th className="border px-2 py-1">P-value</th>
            <th className="border px-2 py-1">Fold Change</th>
          </tr>
        </thead>
        <tbody>
          {genes.map((gene, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{gene.Gene}</td>
              <td className="border px-2 py-1">{gene['T-statistic'].toFixed(2)}</td>
              <td className="border px-2 py-1">{gene['P-value'].toExponential(2)}</td>
              <td className="border px-2 py-1">{gene.FoldChange.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-2">Visualizations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['boxplot', 'violin', 'strip'].map(type => (
          <div key={type}>
            <p className="text-center font-medium mb-1 capitalize">{type} plot</p>
            <img
              src={`data:image/png;base64,${plots[type]}`}
              alt={`${type} plot`}
              className="w-full rounded border shadow"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
