"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Download, Github, Loader2, Sparkles, Code, FileText } from "lucide-react"

export default function AICodeGenerator() {
  const [prompt, setPrompt] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("python")

  const generateCode = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    // Simulate AI code generation
    setTimeout(() => {
      const sampleCode = {
        python: `# Generated code for: ${prompt}
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

def process_gene_expression_data(file_path):
    """
    Process gene expression data from GEO dataset
    """
    # Load the data
    data = pd.read_csv(file_path, sep='\\t', index_col=0)
    
    # Log2 transform and normalize
    data_log = np.log2(data + 1)
    scaler = StandardScaler()
    data_normalized = pd.DataFrame(
        scaler.fit_transform(data_log.T).T,
        index=data_log.index,
        columns=data_log.columns
    )
    
    return data_normalized

def create_heatmap(data, top_n=100):
    """
    Create heatmap of top variable genes
    """
    # Calculate variance for each gene
    gene_var = data.var(axis=1).sort_values(ascending=False)
    top_genes = gene_var.head(top_n).index
    
    # Create heatmap
    plt.figure(figsize=(12, 8))
    sns.heatmap(
        data.loc[top_genes],
        cmap='RdYlBu_r',
        center=0,
        cbar_kws={'label': 'Expression Level'}
    )
    plt.title(f'Heatmap of Top {top_n} Variable Genes')
    plt.tight_layout()
    plt.savefig('gene_expression_heatmap.png', dpi=300, bbox_inches='tight')
    plt.show()

def differential_expression_analysis(data, group1_samples, group2_samples):
    """
    Perform differential expression analysis
    """
    from scipy import stats
    
    results = []
    for gene in data.index:
        group1_expr = data.loc[gene, group1_samples]
        group2_expr = data.loc[gene, group2_samples]
        
        # Perform t-test
        t_stat, p_value = stats.ttest_ind(group1_expr, group2_expr)
        
        # Calculate fold change
        mean1 = group1_expr.mean()
        mean2 = group2_expr.mean()
        fold_change = mean1 - mean2
        
        results.append({
            'gene': gene,
            'fold_change': fold_change,
            'p_value': p_value,
            'log2_fc': fold_change,
            '-log10_p': -np.log10(p_value) if p_value > 0 else 50
        })
    
    return pd.DataFrame(results)

# Example usage
if __name__ == "__main__":
    # Process your data
    data = process_gene_expression_data('your_dataset.txt')
    
    # Create visualizations
    create_heatmap(data)
    
    # Define sample groups (modify as needed)
    tumor_samples = ['sample1', 'sample2', 'sample3']  # Replace with actual sample names
    normal_samples = ['sample4', 'sample5', 'sample6']  # Replace with actual sample names
    
    # Perform differential expression
    de_results = differential_expression_analysis(data, tumor_samples, normal_samples)
    
    # Save results
    de_results.to_csv('differential_expression_results.csv', index=False)
    print("Analysis complete! Results saved to differential_expression_results.csv")`,

        r: `# Generated R code for: ${prompt}
library(GEOquery)
library(limma)
library(pheatmap)
library(ggplot2)
library(dplyr)

# Function to download and process GEO dataset
process_geo_dataset <- function(geo_id) {
  # Download GEO dataset
  gset <- getGEO(geo_id, GSEMatrix = TRUE, AnnotGPL = TRUE)
  
  if (length(gset) > 1) idx <- grep("GPL96", attr(gset, "names")) else idx <- 1
  gset <- gset[[idx]]
  
  # Extract expression data
  ex <- exprs(gset)
  
  # Log2 transform if needed
  qx <- as.numeric(quantile(ex, c(0., 0.25, 0.5, 0.75, 0.99, 1.0), na.rm=T))
  LogC <- (qx[5] > 100) || (qx[6]-qx[1] > 50 && qx[2] > 0)
  if (LogC) { ex[which(ex <= 0)] <- NaN; ex <- log2(ex) }
  
  return(list(expression = ex, phenotype = pData(gset)))
}

# Function to create heatmap
create_expression_heatmap <- function(expression_data, top_n = 100) {
  # Calculate variance and select top variable genes
  gene_var <- apply(expression_data, 1, var, na.rm = TRUE)
  top_genes <- names(sort(gene_var, decreasing = TRUE)[1:top_n])
  
  # Create heatmap
  pheatmap(
    expression_data[top_genes, ],
    scale = "row",
    clustering_distance_rows = "correlation",
    clustering_distance_cols = "correlation",
    color = colorRampPalette(c("blue", "white", "red"))(100),
    main = paste("Top", top_n, "Variable Genes"),
    filename = "gene_expression_heatmap.png",
    width = 12,
    height = 8
  )
}

# Function for differential expression analysis
differential_expression <- function(expression_data, group1, group2) {
  # Create design matrix
  groups <- factor(c(rep("Group1", length(group1)), rep("Group2", length(group2))))
  design <- model.matrix(~0 + groups)
  colnames(design) <- levels(groups)
  
  # Fit linear model
  fit <- lmFit(expression_data[, c(group1, group2)], design)
  
  # Create contrast matrix
  contrast.matrix <- makeContrasts(Group1-Group2, levels = design)
  fit2 <- contrasts.fit(fit, contrast.matrix)
  fit2 <- eBayes(fit2)
  
  # Extract results
  results <- topTable(fit2, adjust = "BH", number = Inf)
  
  return(results)
}

# Function to create volcano plot
create_volcano_plot <- function(de_results) {
  # Prepare data for plotting
  plot_data <- de_results %>%
    mutate(
      significance = case_when(
        adj.P.Val < 0.05 & logFC > 1 ~ "Upregulated",
        adj.P.Val < 0.05 & logFC < -1 ~ "Downregulated",
        TRUE ~ "Not significant"
      )
    )
  
  # Create volcano plot
  p <- ggplot(plot_data, aes(x = logFC, y = -log10(adj.P.Val), color = significance)) +
    geom_point(alpha = 0.6) +
    scale_color_manual(values = c("Upregulated" = "red", "Downregulated" = "blue", "Not significant" = "grey")) +
    geom_vline(xintercept = c(-1, 1), linetype = "dashed", alpha = 0.5) +
    geom_hline(yintercept = -log10(0.05), linetype = "dashed", alpha = 0.5) +
    labs(
      title = "Volcano Plot - Differential Expression",
      x = "Log2 Fold Change",
      y = "-Log10 Adjusted P-value",
      color = "Significance"
    ) +
    theme_minimal()
  
  ggsave("volcano_plot.png", plot = p, width = 10, height = 8, dpi = 300)
  return(p)
}

# Example usage
main <- function() {
  # Replace with your GEO dataset ID
  geo_id <- "GSE2034"  # Example breast cancer dataset
  
  # Process dataset
  data <- process_geo_dataset(geo_id)
  
  # Create heatmap
  create_expression_heatmap(data$expression)
  
  # Define sample groups (modify based on your phenotype data)
  # This is just an example - you'll need to modify based on your actual data
  group1_samples <- colnames(data$expression)[1:10]  # First 10 samples
  group2_samples <- colnames(data$expression)[11:20] # Next 10 samples
  
  # Perform differential expression
  de_results <- differential_expression(data$expression, group1_samples, group2_samples)
  
  # Create volcano plot
  create_volcano_plot(de_results)
  
  # Save results
  write.csv(de_results, "differential_expression_results.csv")
  
  cat("Analysis complete! Check the generated files.\\n")
}

# Run the analysis
main()`,

        javascript: `// Generated JavaScript code for: ${prompt}
// Gene Expression Data Processor for Web Applications

class GeneExpressionAnalyzer {
  constructor() {
    this.data = null;
    this.metadata = null;
  }

  // Load and parse gene expression data
  async loadData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target.result;
          const lines = text.split('\\n');
          const headers = lines[0].split('\\t');
          
          const data = {};
          const samples = headers.slice(1);
          
          for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
              const values = lines[i].split('\\t');
              const gene = values[0];
              const expression = values.slice(1).map(v => parseFloat(v));
              data[gene] = expression;
            }
          }
          
          this.data = data;
          this.samples = samples;
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  }

  // Normalize data using log2 transformation
  normalizeData() {
    if (!this.data) throw new Error('No data loaded');
    
    const normalizedData = {};
    for (const gene in this.data) {
      normalizedData[gene] = this.data[gene].map(value => 
        Math.log2(value + 1)
      );
    }
    
    this.data = normalizedData;
    return normalizedData;
  }

  // Calculate differential expression
  calculateDifferentialExpression(group1Indices, group2Indices) {
    const results = [];
    
    for (const gene in this.data) {
      const group1Values = group1Indices.map(i => this.data[gene][i]);
      const group2Values = group2Indices.map(i => this.data[gene][i]);
      
      const mean1 = this.calculateMean(group1Values);
      const mean2 = this.calculateMean(group2Values);
      const foldChange = mean1 - mean2;
      
      // Simple t-test (for demonstration)
      const pValue = this.tTest(group1Values, group2Values);
      
      results.push({
        gene: gene,
        foldChange: foldChange,
        pValue: pValue,
        log2FC: foldChange,
        negLog10P: -Math.log10(pValue)
      });
    }
    
    return results.sort((a, b) => a.pValue - b.pValue);
  }

  // Helper function to calculate mean
  calculateMean(values) {
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  // Simple t-test implementation
  tTest(group1, group2) {
    const mean1 = this.calculateMean(group1);
    const mean2 = this.calculateMean(group2);
    
    const variance1 = group1.reduce((sum, val) => sum + Math.pow(val - mean1, 2), 0) / (group1.length - 1);
    const variance2 = group2.reduce((sum, val) => sum + Math.pow(val - mean2, 2), 0) / (group2.length - 1);
    
    const pooledVariance = ((group1.length - 1) * variance1 + (group2.length - 1) * variance2) / 
                          (group1.length + group2.length - 2);
    
    const standardError = Math.sqrt(pooledVariance * (1/group1.length + 1/group2.length));
    const tStatistic = (mean1 - mean2) / standardError;
    
    // Simplified p-value calculation (normally would use t-distribution)
    return Math.min(1, Math.abs(tStatistic) * 0.1);
  }

  // Generate heatmap data
  generateHeatmapData(topN = 100) {
    if (!this.data) throw new Error('No data loaded');
    
    // Calculate variance for each gene
    const geneVariances = [];
    for (const gene in this.data) {
      const mean = this.calculateMean(this.data[gene]);
      const variance = this.data[gene].reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / this.data[gene].length;
      geneVariances.push({ gene, variance });
    }
    
    // Sort by variance and take top N
    geneVariances.sort((a, b) => b.variance - a.variance);
    const topGenes = geneVariances.slice(0, topN).map(item => item.gene);
    
    // Prepare heatmap data
    const heatmapData = topGenes.map(gene => ({
      gene: gene,
      values: this.data[gene]
    }));
    
    return heatmapData;
  }

  // Export results to CSV
  exportToCSV(data, filename) {
    const csvContent = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

// Usage example
async function analyzeGeneExpression() {
  const analyzer = new GeneExpressionAnalyzer();
  
  // Assuming you have a file input element
  const fileInput = document.getElementById('geneExpressionFile');
  const file = fileInput.files[0];
  
  if (!file) {
    alert('Please select a gene expression file');
    return;
  }
  
  try {
    // Load and process data
    await analyzer.loadData(file);
    analyzer.normalizeData();
    
    // Define sample groups (modify as needed)
    const group1Indices = [0, 1, 2, 3, 4]; // First 5 samples
    const group2Indices = [5, 6, 7, 8, 9]; // Next 5 samples
    
    // Perform differential expression analysis
    const deResults = analyzer.calculateDifferentialExpression(group1Indices, group2Indices);
    
    // Generate heatmap data
    const heatmapData = analyzer.generateHeatmapData(50);
    
    // Export results
    analyzer.exportToCSV(deResults, 'differential_expression_results.csv');
    
    console.log('Analysis complete!');
    console.log('Top 10 differentially expressed genes:', deResults.slice(0, 10));
    
    return { deResults, heatmapData };
  } catch (error) {
    console.error('Error during analysis:', error);
  }
}

// HTML structure for the web interface
const createInterface = () => {
  return \`
    <div class="gene-expression-analyzer">
      <h2>Gene Expression Analyzer</h2>
      <div class="upload-section">
        <input type="file" id="geneExpressionFile" accept=".txt,.csv,.tsv" />
        <button onclick="analyzeGeneExpression()">Analyze Data</button>
      </div>
      <div id="results"></div>
    </div>
  \`;
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GeneExpressionAnalyzer, analyzeGeneExpression };
}`,
      }

      setGeneratedCode(sampleCode[activeTab])
      setIsGenerating(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
  }

  const downloadCode = () => {
    const extensions = { python: "py", r: "R", javascript: "js" }
    const blob = new Blob([generatedCode], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `gene_expression_analysis.${extensions[activeTab]}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="bg-white/10 border-0 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-400" />
          AI Code Generator
        </CardTitle>
        <CardDescription className="text-gray-300">
          Generate custom analysis code for your gene expression datasets
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Describe what you want to analyze:</label>
          <Textarea
            placeholder="e.g., Create a heatmap for breast cancer gene expression data with hierarchical clustering and export functionality..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            rows={3}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={generateCode}
            disabled={isGenerating || !prompt.trim()}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black font-medium"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Code className="mr-2 h-4 w-4" />
                Generate Code
              </>
            )}
          </Button>
          <Badge variant="secondary" className="bg-white/10 text-white">
            AI-Powered
          </Badge>
        </div>

        {generatedCode && (
          <div className="space-y-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-white/10">
                <TabsTrigger value="python" className="data-[state=active]:bg-white/20">
                  Python
                </TabsTrigger>
                <TabsTrigger value="r" className="data-[state=active]:bg-white/20">
                  R
                </TabsTrigger>
                <TabsTrigger value="javascript" className="data-[state=active]:bg-white/20">
                  JavaScript
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-4">
                <div className="relative">
                  <pre className="bg-black/30 rounded-md p-4 text-sm overflow-x-auto max-h-96 text-green-400 font-mono">
                    <code>{generatedCode}</code>
                  </pre>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={copyToClipboard}
                      className="text-white hover:bg-white/20"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={downloadCode} className="text-white hover:bg-white/20">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 text-sm">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/20">
                <Github className="h-4 w-4 mr-2" />
                Push to GitHub
              </Button>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/20">
                <FileText className="h-4 w-4 mr-2" />
                Create PR Template
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
