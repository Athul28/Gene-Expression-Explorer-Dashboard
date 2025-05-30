"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Activity,
  BarChart3,
  Database,
  Dna,
  Eye,
  GitBranch,
  Heart,
  Microscope,
  Search,
  Shield,
  TrendingUp,
  Zap,
  ChevronRight,
  Play,
  Download,
  Users,
  Mail,
  Github,
  Twitter,
} from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
              <Dna className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Gene Expression Explorer</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#diseases" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Diseases
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              How it Works
            </Link>
            <Link href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              FAQ
            </Link>
          </nav>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container relative px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                  <Zap className="mr-1 h-3 w-3" />
                  Powered by GEO Repository
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
                  Gene Expression
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {" "}
                    Explorer
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Unlock insights from genomic data with powerful visualizations and predictive analytics. Explore gene
                  expression patterns across cancer types, COVID-19, and respiratory diseases.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Explore Now
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Eye className="mr-2 h-5 w-5" />
                  View Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-blue-600" />
                  <span>10,000+ Datasets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span>5,000+ Researchers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-purple-600" />
                  <span>HIPAA Compliant</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl bg-white p-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Gene Expression Heatmap</h3>
                    <Badge variant="secondary">Live Data</Badge>
                  </div>
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }, (_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-sm ${
                          Math.random() > 0.7 ? "bg-red-500" : Math.random() > 0.4 ? "bg-yellow-400" : "bg-green-500"
                        }`}
                        style={{ opacity: Math.random() * 0.8 + 0.2 }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Low Expression</span>
                    <span>High Expression</span>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 rounded-lg bg-blue-600 p-3 text-white shadow-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-lg bg-green-600 p-3 text-white shadow-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disease Showcase Section */}
      <section id="diseases" className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Explore Disease-Specific Data</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive deep into gene expression patterns across multiple disease types with our comprehensive datasets
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Cancer Types",
                description:
                  "Analyze expression patterns across 8 major cancer types including breast, lung, and colorectal",
                icon: Microscope,
                color: "from-red-500 to-pink-600",
                datasets: "2,500+ datasets",
                badge: "Most Popular",
              },
              {
                title: "COVID-19",
                description: "Understand viral response mechanisms and host immune system interactions",
                icon: Shield,
                color: "from-orange-500 to-red-600",
                datasets: "800+ datasets",
                badge: "Updated Daily",
              },
              {
                title: "Common Cold",
                description: "Compare respiratory virus responses and identify common pathways",
                icon: Activity,
                color: "from-blue-500 to-cyan-600",
                datasets: "400+ datasets",
                badge: "Comparative",
              },
              {
                title: "Lung Diseases",
                description: "Explore COPD, asthma, and other respiratory conditions",
                icon: Heart,
                color: "from-green-500 to-emerald-600",
                datasets: "1,200+ datasets",
                badge: "Comprehensive",
              },
            ].map((disease, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${disease.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <disease.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{disease.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {disease.badge}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">{disease.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{disease.datasets}</span>
                    <Button size="sm" variant="ghost" className="group-hover:bg-blue-50 group-hover:text-blue-600">
                      View Data
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Powerful Visualization & Analytics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform complex genomic data into actionable insights with our suite of interactive tools
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {[
                {
                  title: "Interactive Heatmaps",
                  description:
                    "Visualize gene expression patterns with customizable heatmaps. Filter by tissue type, disease stage, and treatment response.",
                  icon: BarChart3,
                  features: ["Hierarchical clustering", "Custom color schemes", "Export capabilities"],
                },
                {
                  title: "Volcano Plots",
                  description:
                    "Identify significantly differentially expressed genes with interactive volcano plots and statistical analysis.",
                  icon: TrendingUp,
                  features: ["Statistical significance", "Fold change analysis", "Gene annotation"],
                },
                {
                  title: "Pathway Analysis",
                  description:
                    "Discover biological pathways and gene networks affected in different disease conditions.",
                  icon: GitBranch,
                  features: ["KEGG pathways", "GO enrichment", "Network visualization"],
                },
              ].map((feature, index) => (
                <div key={index} className="flex gap-6 p-6 bg-white rounded-xl shadow-lg">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((item, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Sample Visualization</h3>
                <div className="space-y-4">
                  <div className="h-32 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Gene A</span>
                      <span className="font-medium">2.4x</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Gene B</span>
                      <span className="font-medium">-1.8x</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Gene C</span>
                      <span className="font-medium">3.1x</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Genes</span>
                    <span className="font-bold text-blue-600">20,000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Samples</span>
                    <span className="font-bold text-green-600">50,000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Studies</span>
                    <span className="font-bold text-purple-600">1,500+</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Powered by GEO Data</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform seamlessly integrates with the Gene Expression Omnibus to deliver real-time insights
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Data Collection",
                description: "Automated retrieval from GEO repository with quality control",
                icon: Database,
              },
              {
                step: "02",
                title: "Processing",
                description: "Normalization and statistical analysis using industry standards",
                icon: Zap,
              },
              {
                step: "03",
                title: "Visualization",
                description: "Interactive charts and plots generated in real-time",
                icon: BarChart3,
              },
              {
                step: "04",
                title: "Insights",
                description: "AI-powered analysis and biomarker prediction",
                icon: Search,
              },
            ].map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-blue-600 border-2 border-blue-600">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Sample Data
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about Gene Expression Explorer
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "What data sources does Gene Expression Explorer use?",
                  answer:
                    "We primarily use data from the Gene Expression Omnibus (GEO), the largest public repository of gene expression data. Our platform automatically processes and normalizes data from thousands of studies.",
                },
                {
                  question: "How often is the data updated?",
                  answer:
                    "Our database is updated daily with new submissions to GEO. COVID-19 related datasets are prioritized and updated in real-time to ensure researchers have access to the latest findings.",
                },
                {
                  question: "Can I export my analysis results?",
                  answer:
                    "Yes, all visualizations and analysis results can be exported in multiple formats including PNG, PDF, CSV, and JSON. You can also generate publication-ready figures with customizable styling.",
                },
                {
                  question: "Is there an API available for programmatic access?",
                  answer:
                    "We offer a comprehensive REST API for developers and researchers who want to integrate our data and analysis capabilities into their own applications. Documentation and examples are available.",
                },
                {
                  question: "What statistical methods are used for analysis?",
                  answer:
                    "We employ industry-standard methods including DESeq2 for differential expression, GSEA for pathway analysis, and various machine learning algorithms for predictive modeling. All methods are peer-reviewed and validated.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Explore Gene Expression Data?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of researchers worldwide using Gene Expression Explorer to unlock genomic insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                  <Dna className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Gene Expression Explorer</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering researchers with cutting-edge genomic data visualization and analysis tools.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Github className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Platform</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="#" className="block hover:text-white transition-colors">
                  Features
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  API Documentation
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  Status
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Resources</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="#" className="block hover:text-white transition-colors">
                  Documentation
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  Tutorials
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  Research Papers
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  Community
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="#" className="block hover:text-white transition-colors">
                  Help Center
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  Contact Us
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Gene Expression Explorer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
