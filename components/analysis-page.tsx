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
**Key Findings from ${selectedDataset} Analysis:**

• **Differential Expression**: Identified 2,847 significantly differentially expressed genes (p < 0.05, |log2FC| > 1.5)
• **Upregulated Pathways**: Cell cycle regulation, DNA repair mechanisms, and immune response pathways show significant upregulation
• **Biomarker Candidates**: BRCA1, TP53, and ERBB2 emerge as potential prognostic biomarkers with high predictive value
• **Survival Correlation**: High expression of immune-related genes correlates with improved overall survival (HR: 0.68, p < 0.001)
• **Subtype Classification**: Clear separation between luminal A, luminal B, HER2+, and triple-negative subtypes based on expression profiles
• **Treatment Response**: Patients with high immune infiltration scores show better response to immunotherapy (response rate: 78% vs 34%)

**Clinical Implications**: These findings suggest that immune-related gene signatures could guide treatment selection and improve patient outcomes in breast cancer management.
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
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
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
                <TabsTrigger value="heatmap">Plots</TabsTrigger>
                <TabsTrigger value="volcano">Volcano Plot</TabsTrigger>
                <TabsTrigger value="survival">Survival</TabsTrigger>
                <TabsTrigger value="pathways">Pathways</TabsTrigger>
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
                    <CardTitle>Plots</CardTitle>
                    <CardDescription>Different Clusters</CardDescription>
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
                          <h1>Gene Expression Plots - GSE96058</h1>

                          {Object.entries(images).map(([key, base64]) => (
                            <div key={key} style={{ marginBottom: 40 }}>
                              <h2 style={{ textTransform: "uppercase" }}>
                                {key} plot
                              </h2>
                              <img
                                src={`data:image/png;base64,${base64}`}
                                alt={`${key} plot`}
                                style={{
                                  width: "100%",
                                  border: "1px solid #ccc",
                                  borderRadius: 8,
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="volcano" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Volcano Plot</CardTitle>
                    <CardDescription>
                      Differential expression analysis showing fold change vs
                      statistical significance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <label className="text-sm">
                              p-value threshold:
                            </label>
                            <Select defaultValue="0.05">
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0.01">0.01</SelectItem>
                                <SelectItem value="0.05">0.05</SelectItem>
                                <SelectItem value="0.1">0.1</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="text-sm">FC threshold:</label>
                            <Select defaultValue="1.5">
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1.2">1.2</SelectItem>
                                <SelectItem value="1.5">1.5</SelectItem>
                                <SelectItem value="2.0">2.0</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>

                      <div className="aspect-[4/3] bg-white rounded-lg border p-6">
                        <div className="relative w-full h-full">
                          {/* Axes */}
                          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300" />
                          <div className="absolute bottom-0 left-1/2 w-0.5 h-full bg-gray-300" />

                          {/* Axis labels */}
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-gray-600">
                            Log2 Fold Change
                          </div>
                          <div className="absolute top-1/2 -left-12 -translate-y-1/2 -rotate-90 text-sm text-gray-600">
                            -Log10 p-value
                          </div>

                          {/* Threshold lines */}
                          <div className="absolute bottom-[30%] left-0 w-full h-0.5 bg-gray-200 border-dashed" />
                          <div className="absolute bottom-0 left-[25%] w-0.5 h-full bg-gray-200 border-dashed" />
                          <div className="absolute bottom-0 left-[75%] w-0.5 h-full bg-gray-200 border-dashed" />

                          {/* Data points */}
                          {Array.from({ length: 200 }, (_, i) => {
                            const x = (Math.random() - 0.5) * 2 * 0.9;
                            const y = Math.random() * 0.9;
                            const significant = y > 0.3 && Math.abs(x) > 0.25;

                            return (
                              <div
                                key={i}
                                className={`absolute rounded-full ${
                                  significant
                                    ? x < 0
                                      ? "bg-blue-500"
                                      : "bg-red-500"
                                    : "bg-gray-400"
                                }`}
                                style={{
                                  width: significant ? "6px" : "4px",
                                  height: significant ? "6px" : "4px",
                                  left: `${(x + 1) * 50}%`,
                                  bottom: `${y * 100}%`,
                                  transform: "translate(-50%, 50%)",
                                  opacity: significant ? 0.8 : 0.4,
                                }}
                              />
                            );
                          })}

                          {/* Legend */}
                          <div className="absolute top-4 right-4 bg-white/90 p-3 rounded border text-xs space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span>Upregulated</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span>Downregulated</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                              <span>Not significant</span>
                            </div>
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
                    <CardTitle>Survival Analysis</CardTitle>
                    <CardDescription>
                      Kaplan-Meier survival curves based on gene expression
                      signatures
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Select defaultValue="immune_signature">
                          <SelectTrigger className="w-64">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immune_signature">
                              Immune Signature
                            </SelectItem>
                            <SelectItem value="proliferation">
                              Proliferation Score
                            </SelectItem>
                            <SelectItem value="custom_genes">
                              Custom Gene Set
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">HR: 0.68</Badge>
                          <Badge variant="outline">p {"<"} 0.001</Badge>
                        </div>
                      </div>

                      <div className="aspect-[4/3] bg-white rounded-lg border p-6">
                        <div className="relative w-full h-full">
                          {/* Axes */}
                          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300" />
                          <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gray-300" />

                          {/* Axis labels */}
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-gray-600">
                            Time (months)
                          </div>
                          <div className="absolute top-1/2 -left-16 -translate-y-1/2 -rotate-90 text-sm text-gray-600">
                            Survival Probability
                          </div>

                          {/* Grid lines */}
                          {[0.2, 0.4, 0.6, 0.8].map((y) => (
                            <div
                              key={y}
                              className="absolute left-0 w-full h-px bg-gray-100"
                              style={{ bottom: `${y * 100}%` }}
                            />
                          ))}

                          {/* Survival curves */}
                          <svg
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                          >
                            {/* High expression group */}
                            <path
                              d="M0,100 L5,100 L10,98 L15,95 L20,90 L25,85 L30,80 L35,75 L40,70 L45,65 L50,60 L55,55 L60,50 L65,45 L70,40 L75,35 L80,30 L85,25 L90,20 L95,15 L100,10"
                              fill="none"
                              stroke="#14b8a6"
                              strokeWidth="3"
                            />

                            {/* Low expression group */}
                            <path
                              d="M0,100 L5,100 L10,95 L15,88 L20,80 L25,70 L30,60 L35,50 L40,40 L45,32 L50,25 L55,20 L60,16 L65,13 L70,11 L75,9 L80,8 L85,7 L90,6 L95,5 L100,5"
                              fill="none"
                              stroke="#ef4444"
                              strokeWidth="3"
                            />
                          </svg>

                          {/* Legend */}
                          <div className="absolute top-4 right-4 bg-white/90 p-3 rounded border text-sm space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-0.5 bg-teal-500"></div>
                              <span>High Expression (n=625)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-0.5 bg-red-500"></div>
                              <span>Low Expression (n=625)</span>
                            </div>
                            <div className="text-xs text-gray-600 pt-1">
                              Log-rank p {"<"} 0.001
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pathways" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pathway Enrichment Analysis</CardTitle>
                    <CardDescription>
                      KEGG and GO pathway enrichment for differentially
                      expressed genes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Select defaultValue="kegg">
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kegg">KEGG Pathways</SelectItem>
                            <SelectItem value="go_bp">
                              GO Biological Process
                            </SelectItem>
                            <SelectItem value="go_mf">
                              GO Molecular Function
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Select defaultValue="upregulated">
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="upregulated">
                              Upregulated
                            </SelectItem>
                            <SelectItem value="downregulated">
                              Downregulated
                            </SelectItem>
                            <SelectItem value="all">All DE Genes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        {[
                          {
                            name: "Cell cycle",
                            pvalue: 2.3e-15,
                            genes: 89,
                            color: "bg-red-500",
                          },
                          {
                            name: "DNA replication",
                            pvalue: 1.2e-12,
                            genes: 45,
                            color: "bg-orange-500",
                          },
                          {
                            name: "p53 signaling pathway",
                            pvalue: 3.4e-10,
                            genes: 32,
                            color: "bg-yellow-500",
                          },
                          {
                            name: "Immune response",
                            pvalue: 5.6e-9,
                            genes: 67,
                            color: "bg-green-500",
                          },
                          {
                            name: "Apoptosis",
                            pvalue: 2.1e-8,
                            genes: 28,
                            color: "bg-blue-500",
                          },
                          {
                            name: "MAPK signaling",
                            pvalue: 8.9e-7,
                            genes: 54,
                            color: "bg-indigo-500",
                          },
                          {
                            name: "Angiogenesis",
                            pvalue: 1.4e-6,
                            genes: 23,
                            color: "bg-purple-500",
                          },
                          {
                            name: "Metabolism",
                            pvalue: 3.2e-5,
                            genes: 78,
                            color: "bg-pink-500",
                          },
                        ].map((pathway, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">
                                {pathway.name}
                              </span>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>{pathway.genes} genes</span>
                                <span>
                                  p = {pathway.pvalue.toExponential(1)}
                                </span>
                              </div>
                            </div>
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${pathway.color}`}
                                style={{
                                  width: `${Math.min(
                                    (-Math.log10(pathway.pvalue) / 15) * 100,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* AI Sidebar */}
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
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Compare with other datasets
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PieChart className="mr-2 h-4 w-4" />
                  Generate custom plots
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Predict biomarkers
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download raw data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
