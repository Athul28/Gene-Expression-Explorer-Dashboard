"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Share2,
  Settings,
  Zap,
  BarChart3,
  PieChart,
  TrendingUp,
  Brain,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DownloadTextButton from "./Dowload";

type PlotType = "pca" | "kmeans" | "tsne" | "umap";

const plotEndpoints: Record<PlotType, string> = {
  pca: "http://localhost:5000/pca-plot",
  kmeans: "http://localhost:5000/kmeans-plot",
  tsne: "http://localhost:5000/tsne-plot",
  umap: "http://localhost:5000/umap-plot",
};

export default function AnalysisPage() {
  const router = useRouter();
  const [aiSummary, setAiSummary] = useState("");
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [selectedDataset] = useState("Breast Cancer Gene Expression");

  const [images, setImages] = useState<Record<PlotType, string | null>>({
    pca: null,
    kmeans: null,
    tsne: null,
    umap: null,
  });

  const [error, setError] = useState<string | null>(null);

  const generateAISummary = async () => {
    setIsGeneratingSummary(true);
    // Simulate AI processing
    setTimeout(() => {
      setAiSummary(`
    Key Findings from ${selectedDataset} Analysis:

    • Differential Expression: Identified 2,847 significantly differentially expressed genes (p < 0.05, |log2FC| > 1.5)
    • Upregulated Pathways: Cell cycle regulation, DNA repair mechanisms, and immune response pathways show significant upregulation
    • Biomarker Candidates: BRCA1, TP53, and ERBB2 emerge as potential prognostic biomarkers with high predictive value
    • Survival Correlation: High expression of immune-related genes correlates with improved overall survival (HR: 0.68, p < 0.001)
    • Subtype Classification: Clear separation between luminal A, luminal B, HER2+, and triple-negative subtypes based on expression profiles
    • Treatment Response: Patients with high immune infiltration scores show better response to immunotherapy (response rate: 78% vs 34%)

    Clinical Implications: These findings suggest that immune-related gene signatures could guide treatment selection and improve patient outcomes in breast cancer management.
      `);
      setIsGeneratingSummary(false);
    }, 3000);
  };

  useEffect(() => {
    async function fetchPlots() {
      try {
        const results: Partial<Record<PlotType, string>> = {};

        for (const type of Object.keys(plotEndpoints) as PlotType[]) {
          const res = await fetch(plotEndpoints[type]);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-lg font-semibold">{selectedDataset}</h1>
              <p className="text-sm text-gray-600">
                1,250 samples • Updated Nov 2023
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-gradient-to-r from-teal-500 to-cyan-600"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="heatmap">PCA Plot</TabsTrigger>
                <TabsTrigger value="volcano">KMEANS Plot</TabsTrigger>
                <TabsTrigger value="survival">TSNE Plot</TabsTrigger>
                <TabsTrigger value="pathways">UMAP Plot</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Genes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">20,531</div>
                      <p className="text-xs text-gray-600">
                        Protein-coding genes
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Differentially Expressed
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">
                        2,847
                      </div>
                      <p className="text-xs text-gray-600">
                        p {"<"} 0.05, |log2FC| {">"} 1.5
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Upregulated
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        1,523
                      </div>
                      <p className="text-xs text-gray-600">53.5% of DE genes</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Downregulated
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">
                        1,324
                      </div>
                      <p className="text-xs text-gray-600">46.5% of DE genes</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Expression Overview</CardTitle>
                    <CardDescription>
                      Sample distribution and quality metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <h4 className="font-medium">Sample Distribution</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Tumor Samples</span>
                            <span className="font-medium">1,097 (87.8%)</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full">
                            <div
                              className="h-full bg-red-500 rounded-full"
                              style={{ width: "87.8%" }}
                            />
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Normal Samples</span>
                            <span className="font-medium">153 (12.2%)</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: "12.2%" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">Quality Metrics</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">RNA Quality Score</span>
                            <Badge variant="secondary">8.2/10</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Mapping Rate</span>
                            <Badge variant="secondary">94.5%</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Batch Effect</span>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-700"
                            >
                              Corrected
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="heatmap" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>PCA Plot</CardTitle>
                    <CardDescription>
                      Principal Component Analysis (PCA) reduces the
                      dimensionality of gene expression data, allowing
                      visualization of sample clustering and variance explained
                      by the top components.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Select defaultValue="top100">
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="top100">
                                Top 100 DE Genes
                              </SelectItem>
                              <SelectItem value="top500">
                                Top 500 DE Genes
                              </SelectItem>
                              <SelectItem value="custom">
                                Custom Gene Set
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <Select defaultValue="euclidean">
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="euclidean">
                                Euclidean
                              </SelectItem>
                              <SelectItem value="correlation">
                                Correlation
                              </SelectItem>
                              <SelectItem value="manhattan">
                                Manhattan
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div> */}

                      <div className="aspect-[4/3] bg-white rounded-lg border p-4">
                        <div
                          style={{ maxWidth: 900, margin: "auto", padding: 20 }}
                        >
                          <div style={{ marginBottom: 40 }}>
                            {images.pca && (
                              <img
                                src={`data:image/png;base64,${images.pca}`}
                                alt="PCA plot"
                                style={{
                                  width: "100%",
                                  border: "1px solid #ccc",
                                  borderRadius: 8,
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="volcano" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>KMEANS Plot</CardTitle>
                    <CardDescription>
                      K-means clustering groups samples based on gene expression
                      similarity, revealing underlying patterns and potential
                      subtypes within the dataset.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="aspect-[4/3] bg-white rounded-lg border p-6">
                        <div className="relative w-full h-full">
                          <div style={{ marginBottom: 40 }}>
                            <h2 style={{ textTransform: "uppercase" }}></h2>
                            {images.kmeans && (
                              <img
                                src={`data:image/png;base64,${images.kmeans}`}
                                alt="KMEANS plot"
                                style={{
                                  width: "100%",
                                  border: "1px solid #ccc",
                                  borderRadius: 8,
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="survival" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>TSNE plot</CardTitle>
                    <CardDescription>
                      t-SNE (t-distributed Stochastic Neighbor Embedding)
                      visualizes high-dimensional gene expression data by
                      projecting it into two dimensions, helping to reveal
                      sample clusters and complex nonlinear relationships.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div style={{ marginBottom: 40 }}>
                        {images.tsne && (
                          <img
                            src={`data:image/png;base64,${images.tsne}`}
                            alt="TSNE plot"
                            style={{
                              width: "100%",
                              border: "1px solid #ccc",
                              borderRadius: 8,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pathways" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>UMAP Plot</CardTitle>
                    <CardDescription>
                      UMAP (Uniform Manifold Approximation and Projection) is a
                      dimensionality reduction technique that preserves both
                      local and global structure in high-dimensional gene
                      expression data, enabling clear visualization of sample
                      groupings and biological patterns. KEGG and GO pathway
                      enrichment for differentially expressed genes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div style={{ marginBottom: 40 }}>
                        {images.umap && (
                          <img
                            src={`data:image/png;base64,${images.umap}`}
                            alt="UMAP plot"
                            style={{
                              width: "100%",
                              border: "1px solid #ccc",
                              borderRadius: 8,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  AI Analysis Summary
                </CardTitle>
                <CardDescription>
                  Get AI-powered insights from your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={generateAISummary}
                  disabled={isGeneratingSummary}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isGeneratingSummary ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Generate Summary
                    </>
                  )}
                </Button>

                {aiSummary && (
                  <div className="space-y-3">
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-line text-sm">
                          {aiSummary}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <DownloadTextButton text={aiSummary} filename="summary" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
