# 🧬 Gene Expression Explorer

**Gene Expression Explorer** is a web-based tool for analyzing and visualizing gene expression differences between healthy and disease states using data from NCBI's Gene Expression Omnibus (GEO). It combines robust statistical pipelines, machine learning classifiers, and interactive visualizations to support biomedical research and discovery.

## 🔍 Project Overview

- **Data Source**: GEO repository (microarray & RNA-seq)
- **Core Functions**:
  - Dataset search & filtering
  - Preprocessing & quality control
  - Differential gene expression (DGE) analysis (via DESeq2-style models)
  - Machine learning classifiers 
  - Visualizations: heatmaps, PCA, volcano plots

## ⚙️ Tech Stack

- **Backend**: Flask
- **Frontend**: Next.js, Tailwind CSS
- **Database**: GEO Repository


## 🎯 Key Features

- 🔎 Advanced GEO dataset querying
- 📊 Interactive gene expression visualization
- 🧠 Classifier for healthy vs disease state detection
- 🧬 Integration with Gene Ontology/KEGG
- 🛡️ Quality control, FDR correction, cross-validation

## 🎓 Impact

This tool democratizes gene expression analysis for research and education, offering:
- Faster biomarker discovery
- Accessible genomic insights for non-bioinformaticians
- A modular, reproducible pipeline for large-scale studies


# Architecture:

![image](https://github.com/user-attachments/assets/d0f1cc26-1782-48bb-8a04-1315df60e066)


 Attached microservice for just data visualizers:  https://github.com/VarshithPawarHR/-Gene-Expression-Explorer

---

# 🌐 Next.js Application

A modern web application built with [Next.js](https://nextjs.org/), optimized for performance, scalability, and developer experience.

## 🚀 Features

- ⚡ Server-side rendering (SSR) & Static Site Generation (SSG)
- 🔀 API routes with integrated backend support
- 🎨 Styled with Tailwind CSS
- 🔐 Environment variable support via `.env.local`
- ✅ TypeScript (optional)
- 📦 Code splitting & bundling out-of-the-box

## 📁 Project Structure

```
.
├── components/       # Reusable UI components
├── pages/            # Application routes (includes API routes)
├── public/           # Static assets (images, fonts, etc.)
├── styles/           # Global and component-specific styles
├── utils/            # Utility/helper functions
├── .env.local        # Local environment variables
├── next.config.js    # Next.js configuration
└── tsconfig.json     # TypeScript config (if used)
```

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build for Production

```bash
npm run build
npm run start
# or
yarn build && yarn start
```

## ⚙️ Environment Variables

Create a `.env.local` file to define variables:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

> Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## 🧪 Testing (if applicable)

```bash
npm run test
# or
yarn test
```

## 🧼 Linting & Formatting

```bash
npm run lint
npm run format
# or
yarn lint && yarn format
```

## 📤 Deployment

Easily deploy to platforms like [Vercel](https://vercel.com), [Netlify](https://netlify.com), or Docker.

### Deploying to Vercel

1. Push your code to GitHub
2. Connect the repo on [vercel.com](https://vercel.com/import)
3. Vercel will detect Next.js and handle the rest
