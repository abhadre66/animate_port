export const resumeData = {
  basics: {
    name: "Abhishek Bhadre",
    title: "AI Engineer",
    tagline: "AI Engineer | ML & Full-Stack Systems",
    intro:
      "I build and deploy intelligent systems — from LLM-powered applications and RAG pipelines to production ML and computer vision platforms.",
    summary:
      "M.S. in Artificial Intelligence from Illinois Institute of Technology with experience building and deploying machine learning and full-stack AI systems in production. Shipped a real-time conversational AI interview platform, a retrieval-augmented generation (RAG) developer tool in production, and a computer vision pipeline on Kubernetes with 30% accuracy improvement. Proficient in Python, TypeScript, LLMs, NLP, and cloud infrastructure across AWS, GCP, Railway, and Vercel.",
    location: "Chicago, IL",
    email: "bhadreabhi06@gmail.com",
    phone: "(872) 288 3802",
    links: {
      github: "https://github.com/abhadre66",
      linkedin: "https://linkedin.com",
      resume: "/resume.pdf",
    },
  },
  experience: [
    {
      company: "RAWATTECH",
      role: "Deep Learning Intern",
      dates: "Sep 2022 - May 2023",
      bullets: [
        "Developed a YOLO-based object detection model in Python to detect and classify industrial pipe inventory from warehouse images, improving accuracy by 30% and eliminating a fully manual counting process.",
        "Containerized the model with Docker and deployed on Kubernetes for horizontal scaling of model inference, enabling the team to handle variable load without code changes.",
        "Built a data augmentation pipeline using NumPy and Pandas, scaling the training dataset from a few hundred to 10,000+ images and manually re-annotating 500+ edge cases; accuracy improved from 65% to 85.4% on held-out evaluation data.",
        "Designed normalized relational database schemas in SQL to store image metadata and inference results, enabling cross-team queries on model performance and inventory trends.",
      ],
    },
  ],
  topImpact: [
    { metric: "4-5s", context: "End-to-end latency per conversational AI turn" },
    { metric: "99.1%", context: "F1 on AI-generated text detection" },
    { metric: "+30%", context: "Detection accuracy with YOLO pipeline in production" },
  ],
  projects: [
    {
      title: "AI Interview Engine",
      subtitle: "Voice-First Candidate Screening Platform",
      description:
        "A real-time voice pipeline integrating speech-to-text and text-to-speech with Claude Sonnet 4.6, achieving 4-5s end-to-end latency per conversational turn.",
      github: "https://github.com/abhadre66/ai-interview-engine",
      website: "https://ai-interview-engine-ten.vercel.app/login",
      stack: ["Next.js", "Express", "Claude Sonnet/Haiku", "Deepgram", "Supabase", "Railway", "Vercel"],
      bullets: [
        "Engineered a real-time voice pipeline integrating Deepgram Nova-2 (speech-to-text) and Aura (text-to-speech) with Claude Sonnet 4.6 (large language model), achieving 4-5s end-to-end latency per conversational turn and replacing human interviewers for initial candidate screening.",
        "Designed a multi-turn conversational AI engine with dynamic context injection: the LLM receives each candidate's parsed resume before the session and generates targeted, role-specific follow-up questions in real time.",
        "Built an automated document ingestion pipeline (PDF parsing, Claude Haiku, MD5 deduplication caching) and a post-interview evaluation system scoring candidates across 4 dimensions with advance/hold/reject output.",
        "Deployed full-stack on Railway, Vercel, and Supabase (PostgreSQL + Row-Level Security + Magic Link authentication) with Brevo SMTP for transactional email automation.",
      ],
    },
    {
      title: "CodeSyntax AI",
      subtitle: "Full-Stack RAG Developer Assistant",
      description:
        "A production Retrieval-Augmented Generation application that answers Python developer questions with grounded, cited responses.",
      github: "https://github.com/abhadre66/SyntaxAI-RAG-",
      website: "https://syntax-ai-rag.vercel.app",
      stack: ["Python", "FastAPI", "Next.js", "LangChain", "Pinecone", "Docker", "GitHub Actions"],
      bullets: [
        "Built a production retrieval-augmented generation (RAG) system using GPT-4o-mini with semantic search over Python Docs, RealPython, and StackOverflow, indexed in Pinecone via OpenAI vector embeddings.",
        "Implemented an LLM-based query intent classifier and result re-ranker by source authority, plus multi-turn conversation support via LangChain chat-history condensing, both measurably reducing off-topic responses.",
        "Maintained 35+ pytest unit tests and a 55-question domain evaluation set; GitHub Actions CI/CD pipeline builds the Docker image and deploys to Railway (API) and Vercel (frontend) on every merge to main.",
        "Shipped a responsive React 19 + TypeScript + Tailwind chat UI with markdown rendering, syntax highlighting, and inline source citations.",
      ],
    },
    {
      title: "Neuronix Lab",
      subtitle: "Self-Hosted ML Training Platform",
      description:
        "A fully self-hosted, Dockerized ML training platform where users submit training jobs from a Next.js dashboard and watch live loss/accuracy charts update epoch-by-epoch.",
      github: "https://github.com/abhadre66/Neuronix-Lab",
      website: "https://neuronix-lab.vercel.app",
      stack: ["Next.js", "FastAPI", "Celery", "Redis", "PyTorch", "MLflow", "PostgreSQL", "Prometheus", "Grafana", "Docker"],
      bullets: [
        "Built a fully self-hosted, Dockerized ML training platform where users submit training jobs from a Next.js dashboard and watch live loss/accuracy charts update epoch-by-epoch.",
        "Designed an asynchronous job queue with FastAPI, Celery, and Redis to distribute training jobs across multiple worker replicas running PyTorch.",
        "Implemented training pipelines for image classifiers (MLP, CNN, ResNet-18, MobileNet, EfficientNet) on MNIST/CIFAR-10, text classifiers (BERT-Tiny, DistilBERT) on SST-2, and regression models on custom CSV datasets.",
        "Integrated MLflow for experiment tracking and model artifact versioning, plus a Prometheus + Grafana stack for real-time training and infrastructure monitoring, all orchestrated via Docker Compose.",
      ],
    },
    {
      title: "ResumeAI",
      subtitle: "AI Resume Tailoring with Fabrication Checks",
      description:
        "Your resume, rewritten in the time it takes to read this sentence — ResumeAI tailors a resume to a specific job posting using Claude, then verifies every rewritten line traces back to the original resume before it ships.",
      github: "https://github.com/abhadre66/resume-tailor",
      website: "https://resume-tailor.vercel.app",
      stack: ["Next.js", "Tailwind CSS", "Node.js", "Express", "Claude Sonnet/Haiku", "Supabase", "Puppeteer"],
      bullets: [
        "Built a two-stage Claude pipeline: Claude Haiku parses an uploaded resume once into structured data (summary, skills, experience, projects) so the model never has to re-guess a candidate's background on later requests.",
        "Implemented a job description scraper that reads live postings from a URL (or accepts pasted text), then used Claude Sonnet to rewrite and reorder resume bullets to match the posting, grounded entirely in the candidate's parsed history.",
        "Added a fabrication guardrail: every tailored resume is diffed against the original structured parse, and any number, skill, or claim that doesn't trace back to the source resume is flagged instead of shipped, rather than trusting the model's output outright.",
        "Generated a tailored PDF via Puppeteer alongside an ATS match score breaking down what matched the posting and what's missing, with auth and storage on Supabase (Postgres, Google OAuth + magic link).",
      ],
    },
    {
      title: "AuthentiText",
      subtitle: "AI-Generated Text Detection Engine",
      description:
        "A dual-model ensemble that detects AI-generated text with 99.1% F1 and 99.96% AUROC.",
      github: "https://github.com/abhadre66/AI-text-Detector",
      website: "https://huggingface.co/spaces/Abhadre/AI-Text-detector",
      stack: ["Python", "XGBoost", "DistilBERT", "HuggingFace", "GCP", "Docker"],
      bullets: [
        "Trained a weighted ensemble model combining XGBoost (21 hand-crafted linguistic features: perplexity, burstiness, lexical density) with a fine-tuned DistilBERT transformer, achieving 99.1% F1 and 99.96% AUROC on held-out test data.",
        "Conducted systematic model comparison across four architectures (Logistic Regression, Random Forest, XGBoost, DistilBERT) using ROC curves, confusion matrices, and SHAP feature importance; integrated Captum token-level attribution heatmaps for explainable AI (XAI).",
        "Trained on the merged HC3 corpus spanning Wikipedia, Reddit, medicine, and finance domains; deployed as a publicly accessible machine learning inference app on HuggingFace Spaces.",
      ],
    },
    {
      title: "Amazon Review Sentiment Prediction",
      subtitle: "Sentiment Analysis at Scale",
      description:
        "Processed 32M+ Amazon reviews across 5 sentiment classes, training and tuning 5 ML/DL models.",
      stack: ["Python", "Scikit-learn", "TensorFlow", "NLP"],
      bullets: [
        "Processed 32M+ Amazon reviews across 5 sentiment classes; trained and tuned 5 ML/DL models, improving accuracy by 20% through hyperparameter optimization.",
        "Shipped a user-facing interface with real-time inference and confidence scoring, delivering 25% faster predictions than the baseline notebook workflow.",
      ],
    },
  ],
  skills: [
    { name: "Python", category: "Languages" },
    { name: "TypeScript", category: "Languages" },
    { name: "JavaScript", category: "Languages" },
    { name: "SQL", category: "Languages" },
    { name: "Go", category: "Languages" },
    { name: "Java", category: "Languages" },
    { name: "C++", category: "Languages" },
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Three.js", category: "Frontend" },
    { name: "PyTorch", category: "ML/AI" },
    { name: "TensorFlow", category: "ML/AI" },
    { name: "Scikit-learn", category: "ML/AI" },
    { name: "XGBoost", category: "ML/AI" },
    { name: "LangChain", category: "ML/AI" },
    { name: "HuggingFace", category: "ML/AI" },
    { name: "RAG / LLMs", category: "ML/AI" },
    { name: "Vector Embeddings", category: "ML/AI" },
    { name: "Model Fine-tuning", category: "ML/AI" },
    { name: "FastAPI", category: "Backend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express.js", category: "Backend" },
    { name: "PostgreSQL", category: "Backend" },
    { name: "MySQL", category: "Backend" },
    { name: "Supabase", category: "Backend" },
    { name: "Pinecone", category: "Backend" },
    { name: "FAISS", category: "Backend" },
    { name: "Docker", category: "Infra" },
    { name: "Kubernetes", category: "Infra" },
    { name: "AWS", category: "Infra" },
    { name: "GCP", category: "Infra" },
  ],
  education: [
    {
      institution: "Illinois Institute Of Technology",
      degree: "M.S. in Artificial Intelligence",
      dates: "Aug 2024 - May 2026",
      detail: "GPA: 3.30/4.0 | Machine Learning, Deep Learning, NLP, Computer Vision, Distributed Systems",
    },
    {
      institution: "Vishwakarma Institute Of Technology",
      degree: "B.Tech. in Instrumentation Engineering",
      dates: "Aug 2019 - Jun 2023",
      detail: "GPA: 3.32/4.0",
    },
  ],
  certifications: [
    {
      name: "Microsoft Azure AI Essentials: Workloads and Machine Learning on Azure",
      link: "https://www.linkedin.com/learning/certificates/810e281ecc40a023207b0fbd797b2bb3945ead5743edccc74009716a9a61db27?trk=share_certificate",
    },
    { name: "Microsoft Certified: Azure Fundamentals (AZ-900)" },
    { name: "HackerRank: SQL Problem Solving (2022)" },
    { name: "INGENIOUS 2021: National Virtual Hackathon Participant" },
  ],
};

export type ResumeData = typeof resumeData;
