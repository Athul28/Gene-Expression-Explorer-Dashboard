"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Dna,
  Search,
  ArrowRight,
  Github,
  ExternalLink,
  BarChart3,
  PieChart,
  GitBranch,
  GitPullRequest,
  Code,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AICodeGenerator from "./ai-code-generator";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();

  const datasets = [
    {
      id: 1,
      title: "Breast Cancer Gene Expression",
      description:
        "Comprehensive analysis of gene expression patterns in breast cancer subtypes",
      category: "cancer",
      samples: 1250,
      date: "2023-09-15",
      image: "/placeholder.svg?height=120&width=240",
      badge: "Popular",
    },
    {
      id: 2,
      title: "COVID-19 Lung Tissue Expression",
      description:
        "Gene expression profiling of lung tissue samples from COVID-19 patients",
      category: "covid19",
      samples: 520,
      date: "2024-03-10",
      image: "/placeholder.svg?height=120&width=240",
      badge: "Featured",
    },
  ];

  const filteredDatasets =
    activeTab === "all"
      ? datasets
      : datasets.filter((dataset) => dataset.category === activeTab);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-teal-500 to-cyan-600">
              <Dna className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Gene Expression Explorer</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#datasets"
              className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors"
            >
              Datasets
            </Link>
            <Link
              href="#visualizations"
              className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors"
            >
              Visualizations
            </Link>
            <Link
              href="#contribute"
              className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors"
            >
              Contribute
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-cyan-50" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMEIwRDciIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-teal-100 text-teal-700 hover:bg-teal-200"
                >
                  Powered by GEO Repository
                </Badge>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  Unlock Genomic
                  <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                    {" "}
                    Insights
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Explore and visualize gene expression patterns across cancers,
                  COVID-19, and respiratory diseases with interactive tools and
                  predictive analytics.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-lg px-8"
                >
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Learn More
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Curated Datasets</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Disease Categories</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Interactive Analysis</Badge>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl bg-white p-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      Gene Expression Heatmap
                    </h3>
                    <Badge variant="secondary">Live Preview</Badge>
                  </div>
                  <div className="grid grid-cols-10 gap-1">
                    {Array.from({ length: 100 }, (_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-sm ${
                          Math.random() > 0.7
                            ? "bg-red-500"
                            : Math.random() > 0.4
                            ? "bg-yellow-400"
                            : "bg-teal-500"
                        }`}
                        style={{ opacity: Math.random() * 0.8 + 0.2 }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Low Expression</span>
                    <div className="w-32 h-2 bg-gradient-to-r from-teal-500 via-yellow-400 to-red-500 rounded-full" />
                    <span>High Expression</span>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 rounded-lg bg-teal-500 p-3 text-white shadow-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-lg bg-cyan-600 p-3 text-white shadow-lg">
                <PieChart className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dataset Section */}
      <section id="datasets" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Explore 2 Handpicked Datasets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive into curated gene expression datasets across multiple disease
              categories
            </p>
          </div>

          <Tabs
            defaultValue="all"
            className="mb-8"
            onValueChange={setActiveTab}
          >
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-3 w-fit">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="cancer">Cancer</TabsTrigger>
                <TabsTrigger value="covid19">COVID-19</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDatasets.map((dataset) => (
              <Card
                key={dataset.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="aspect-[2/1] relative bg-gray-100">
                  <img
                    src={dataset.image || "/placeholder.svg"}
                    alt={dataset.title}
                    className="object-cover w-full h-full"
                  />
                  {dataset.badge && (
                    <Badge className="absolute top-2 right-2 bg-teal-500 hover:bg-teal-600">
                      {dataset.badge}
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{dataset.title}</CardTitle>
                  <CardDescription>{dataset.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{dataset.samples} Samples</span>
                    <span>
                      Updated: {new Date(dataset.date).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="capitalize">
                    {dataset.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                    onClick={() => router.push("/analysis")}
                  >
                    View Analysis
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Contribution Section */}
      <section
        id="contribute"
        className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-lg px-8"
            >
              <a
                href="https://gene-expresion-explorer.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Interactive Gene Expression Explorer
              </a>
            </Button>
          </div>
          <div className="text-center space-y-4 mb-12">
            <Badge
              variant="secondary"
              className="bg-white/10 text-white hover:bg-white/20"
            >
              <Github className="mr-1 h-3 w-3" />
              Open Source
            </Badge>
            <h2 className="text-3xl font-bold">
              Contribute to Gene Expression Explorer
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Help expand our collection of visualized datasets and improve the
              platform
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <Card className="bg-white/10 border-0 text-white">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">
                    <GitBranch className="h-6 w-6" />
                  </div>
                  <CardTitle>Fork the Repository</CardTitle>
                  <CardDescription className="text-gray-300">
                    Start by forking our GitHub repository to your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-black/30 rounded-md p-3 font-mono text-sm">
                    <div className="flex items-center text-gray-300">
                      <span className="text-teal-400">$</span>
                      <span className="ml-2">
                        git clone
                        https://github.com/your-username/gene-expression-explorer.git
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-0 text-white">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">
                    <Code className="h-6 w-6" />
                  </div>
                  <CardTitle>Add a New Dataset</CardTitle>
                  <CardDescription className="text-gray-300">
                    Follow our documentation to add and visualize a new dataset
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal list-inside text-sm text-gray-300 space-y-2">
                    <li>Identify a GEO dataset of interest</li>
                    <li>Process data using our provided scripts</li>
                    <li>Create visualization configurations</li>
                    <li>Add metadata and documentation</li>
                    <li>Test locally with our development server</li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-0 text-white">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">
                    <GitPullRequest className="h-6 w-6" />
                  </div>
                  <CardTitle>Submit a Pull Request</CardTitle>
                  <CardDescription className="text-gray-300">
                    Contribute your changes back to the main repository
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-300">
                    Our team will review your submission and provide feedback.
                    Once approved, your dataset will be available to researchers
                    worldwide.
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-gray-300">
                      Join our 120+ contributors
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <AICodeGenerator />
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-white text-gray-900 hover:bg-gray-100">
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Visualization Section */}
      <section id="visualizations" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Interactive Visualizations & Predictions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform complex genomic data into actionable insights with our
              suite of visualization tools
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Gene Expression Heatmap</CardTitle>
                <CardDescription>
                  Visualize expression patterns across samples and conditions
                  with hierarchical clustering
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-[4/3] bg-white rounded-lg p-4 border">
                  <div className="h-full flex flex-col">
                    <div className="flex-1 grid grid-cols-12 gap-1">
                      {Array.from({ length: 96 }, (_, i) => (
                        <div
                          key={i}
                          className={`aspect-square rounded-sm ${
                            Math.random() > 0.7
                              ? "bg-red-500"
                              : Math.random() > 0.4
                              ? "bg-yellow-400"
                              : "bg-teal-500"
                          }`}
                          style={{ opacity: Math.random() * 0.8 + 0.2 }}
                        />
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                      <span>Low Expression</span>
                      <div className="w-32 h-2 bg-gradient-to-r from-teal-500 via-yellow-400 to-red-500 rounded-full" />
                      <span>High Expression</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Volcano Plot Analysis</CardTitle>
                <CardDescription>
                  Identify significantly differentially expressed genes between
                  conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-[4/3] bg-white rounded-lg p-4 border">
                  <div className="h-full flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Axes */}
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300" />
                      <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gray-300" />

                      {/* Axis labels */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mt-2 text-xs text-gray-600">
                        Log2 Fold Change
                      </div>
                      <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 text-xs text-gray-600">
                        -Log10 p-value
                      </div>

                      {/* Data points */}
                      {Array.from({ length: 80 }, (_, i) => {
                        const x = (Math.random() - 0.5) * 2 * 0.8;
                        const y = Math.random() * 0.8;
                        const significant = y > 0.5 && Math.abs(x) > 0.3;

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
                              width: significant ? "8px" : "6px",
                              height: significant ? "8px" : "6px",
                              left: `${(x + 1) * 50}%`,
                              bottom: `${y * 100}%`,
                              transform: "translate(-50%, 50%)",
                              opacity: significant ? 0.8 : 0.5,
                            }}
                          />
                        );
                      })}

                      {/* Threshold lines */}
                      <div className="absolute bottom-[50%] left-0 w-full h-0.5 bg-gray-200 border-dashed" />
                      <div className="absolute bottom-0 left-[30%] w-0.5 h-full bg-gray-200 border-dashed" />
                      <div className="absolute bottom-0 left-[70%] w-0.5 h-full bg-gray-200 border-dashed" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Survival Analysis Prediction</CardTitle>
                <CardDescription>
                  Predict patient outcomes based on gene expression signatures
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-[4/3] bg-white rounded-lg p-4 border">
                  <div className="h-full flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Axes */}
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300" />
                      <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gray-300" />

                      {/* Axis labels */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mt-2 text-xs text-gray-600">
                        Time (months)
                      </div>
                      <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 text-xs text-gray-600">
                        Survival Probability
                      </div>

                      {/* Survival curves */}
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        {/* High expression group */}
                        <path
                          d="M0,0 L0,100 L10,100 L20,90 L30,85 L40,75 L50,60 L60,50 L70,40 L80,30 L90,25 L100,20"
                          fill="none"
                          stroke="#0ea5e9"
                          strokeWidth="2"
                        />

                        {/* Low expression group */}
                        <path
                          d="M0,0 L0,100 L10,98 L20,95 L30,90 L40,80 L50,70 L60,50 L70,30 L80,15 L90,10 L100,5"
                          fill="none"
                          stroke="#14b8a6"
                          strokeWidth="2"
                        />
                      </svg>

                      {/* Legend */}
                      <div className="absolute top-2 right-2 bg-white/80 p-2 rounded text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-0.5 bg-teal-500"></div>
                          <span>Low Expression</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-0.5 bg-sky-500"></div>
                          <span>High Expression</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Pathway Enrichment Analysis</CardTitle>
                <CardDescription>
                  Identify biological pathways affected in disease conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-[4/3] bg-white rounded-lg p-4 border">
                  <div className="h-full flex flex-col">
                    <div className="flex-1 space-y-3">
                      {[
                        {
                          name: "Immune Response",
                          value: 0.85,
                          color: "bg-teal-500",
                        },
                        {
                          name: "Cell Cycle Regulation",
                          value: 0.72,
                          color: "bg-cyan-600",
                        },
                        { name: "Apoptosis", value: 0.68, color: "bg-sky-500" },
                        {
                          name: "DNA Repair",
                          value: 0.61,
                          color: "bg-blue-500",
                        },
                        {
                          name: "Metabolism",
                          value: 0.53,
                          color: "bg-indigo-500",
                        },
                        {
                          name: "Signal Transduction",
                          value: 0.47,
                          color: "bg-purple-500",
                        },
                        {
                          name: "Angiogenesis",
                          value: 0.39,
                          color: "bg-pink-500",
                        },
                      ].map((pathway, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{pathway.name}</span>
                            <span className="font-medium">
                              p={pathway.value.toFixed(2)}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${pathway.color}`}
                              style={{ width: `${(1 - pathway.value) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-teal-500 to-cyan-600">
                  <Dna className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  Gene Expression Explorer
                </span>
              </div>
              <p className="text-sm">
                Empowering researchers with cutting-edge genomic data
                visualization and analysis tools.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-white">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Research Papers
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-white">Community</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Discord
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-white">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Data Usage
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} Gene Expression Explorer. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
