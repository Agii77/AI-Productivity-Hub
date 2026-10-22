# AI Workplace Productivity Assistant

An AI-powered productivity platform that helps professionals automate everyday workplace tasks using open-source AI models deployed on on-premises hardware.

## Project Overview

The AI Workplace Productivity Assistant is a modern, responsive web application designed to improve workplace productivity while prioritizing security, privacy, and organizational control.

The application provides AI-powered tools for generating professional emails, planning tasks, conducting research, and answering workplace questions through a conversational chatbot.

By supporting open-source AI models hosted on organization-managed hardware, the platform can reduce dependence on external AI providers and help organizations maintain control over sensitive information.

---

## Project Objectives

* Automate repetitive workplace tasks using AI.
* Improve professional writing and communication.
* Simplify task planning and project organization.
* Support research and information discovery.
* Provide a centralized workspace for AI-generated content.
* Support open-source AI models and on-premises deployment.
* Improve control over data processing and storage.
* Promote responsible and secure AI adoption.

---

## Features Implemented

### 1. Dashboard
* Modern SaaS-style dashboard.
* Sidebar navigation.
* Quick-access productivity tools.
* Productivity statistics and recent activity.
* Responsive desktop, tablet, and mobile layouts.
* Light and dark theme support.

### 2. Smart Email Generator
* Generate professional email drafts.
* Support follow-ups, meeting requests, project updates, and client communications.
* Configure email tone, length, and language.
* Generate subject lines and structured email content.
* Edit generated drafts.
* Rewrite, shorten, and expand content.
* Copy and save email drafts.

### 3. AI Task Planner
* Generate task plans from project goals.
* Break projects into manageable subtasks.
* Assign priorities and statuses.
* Define deadlines and estimated durations.
* Identify task dependencies.
* Track task completion.
* Edit, reorder, and delete tasks.
* Filter tasks by priority, status, and deadline.

### 4. AI Research Assistant
* Generate structured research reports.
* Explore business, industry, product, and general research topics.
* Configure report depth and output format.
* Summarize findings and recommendations.
* Identify risks, limitations, and knowledge gaps.
* Edit, save, and export reports.
* Include verified source references when a search or retrieval service is configured.

### 5. AI Chatbot
* Answer workplace-related questions.
* Assist with writing and brainstorming.
* Support task planning and research.
* Handle contextual follow-up questions.
* Provide suggested prompts.
* Maintain conversation history when persistence is configured.
* Copy and regenerate responses where supported.

### 6. Saved Items and Activity History
* Save generated emails, task plans, and research reports.
* Reopen and edit saved content.
* Rename, duplicate, and delete documents.
* Search and filter saved items.
* View recent activity.
* Persist content using the configured database or storage solution.

### 7. Responsible AI
* Identify AI-generated content.
* Encourage human review of important outputs.
* Avoid fabricated citations and unsupported claims.
* Allow users to edit and delete generated content.
* Communicate limitations when integrations are unavailable.

> **Note:** Features requiring an AI model, backend, database, authentication, or external research service must be configured and tested before they can be considered operational.

---

## Technologies and Tools Used

The following technologies are recommended for the project. The actual stack should be verified against the implementation.

| Technology | Purpose |
| :--- | :--- |
| **React** | Frontend user interface |
| **TypeScript** | Type-safe application development |
| **Vite** | Development server and build tooling |
| **Tailwind CSS** | Responsive stylings |
| **shadcn/ui** | Reusable interface components |
| **Lucide React** | Icons |
| **PostgreSQL** | Database and persistent storage |
| **Supabase** | Optional authentication and backend services |
| **Open-source AI models** | Text generation, planning, research, and conversation |
| **Ollama** | Local AI model management and inference |
| **vLLM** | High-throughput model serving for supported models |
| **Git** | Version control |
| **GitHub** | Source code management |
| **Lovable** | AI-assisted application development |

---

## Open-Source AI Models and On-Premises Security

### Open-Source AI Models
The application is designed to support compatible open-source or open-weight language models that can be deployed locally.

Potential model families include:
* Llama
* Mistral
* Qwen
* Gemma
* Other compatible language models

Model selection should consider licensing, commercial-use restrictions, performance, supported languages, and hardware requirements.

> **Warning:** Publicly available model weights do not automatically mean that a model meets every definition of open source. Review the applicable model license before deployment.

### On-Premises Deployment
The AI inference service can run on organization-owned or organization-managed CPU or GPU hardware.

Recommended components include:
* **Ollama:** Local model deployment and management.
* **vLLM:** Model serving for supported high-throughput workloads.
* **Backend API:** Secure communication between the application and AI inference service.
* **PostgreSQL:** Persistent application data.
* **Private network infrastructure:** Restricted access to internal services.
* **Internal storage:** Storage for documents and application data.

### Security and Privacy Benefits
A properly configured on-premises deployment can provide:
* Greater control over AI processing.
* Reduced dependence on external AI APIs.
* Organization-controlled data retention and deletion.
* Restricted access to AI inference endpoints.
* Integration with internal authentication systems.
* Control over model versions and deployment updates.
* Support for restricted-network environments when all required dependencies are available locally.

> **Note:** On-premises deployment does not automatically guarantee security. Appropriate authentication, authorization, encryption, network isolation, monitoring, backups, and access controls remain necessary.

---

## Recommended Architecture

```text
User
  |
  v
Web Application
  |
  v
Authenticated Backend API
  |
  +----> PostgreSQL Database
  |
  v
Internal AI Inference Service
  |
  v
Open-Source AI Model
Running on On-Premises Hardware
```

* The frontend should communicate with the backend rather than exposing the model server directly to untrusted clients.
* The backend should authenticate requests, validate inputs, enforce access policies, and communicate with the internal inference service.
* For a fully on-premises deployment, the database, authentication services, document storage, and other required components must also be hosted within the organization's approved infrastructure.

---

## System Architecture

* **Frontend:** Responsible for dashboard and navigation, user input forms, editable AI-generated outputs, task management, research and chatbot interfaces, and loading/error/success states.
* **Backend:** Responsible for authentication and authorization, input validation, AI request orchestration, database operations, rate limiting, and communication with the internal model-serving service.
* **AI Inference Layer:** Responsible for loading the selected AI model, generating responses, processing structured prompts, returning model outputs, and managing inference resources.
* **Data Layer:** Responsible for storing user profiles and preferences, email drafts, task plans and tasks, research reports, chat conversations and messages, and document metadata and timestamps.

---

## Prerequisites

Before setting up the application, install:
* Node.js compatible with the project's dependencies.
* npm or another supported package manager.
* Git, if cloning the repository.
* A code editor such as Visual Studio Code.

For local AI inference, prepare:
* Compatible CPU or GPU hardware.
* Sufficient RAM or GPU memory.
* An AI model with a suitable license.
* An inference runtime such as Ollama or vLLM.
* A backend API that can communicate with the model server.

> *Hardware requirements depend on the model size, quantization, context length, concurrency, and expected response speed.*

---

## Setup Instructions

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd ai-workplace-productivity-assistant
```
*(Replace the repository URL and directory name with the actual project values.)*

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the project root using the variable names required by the application.

Example for a Vite frontend using Supabase:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_key
```
Use the environment variable names expected by your actual implementation.

> **Security Warning:** Variables prefixed with `VITE_` are exposed to the browser. Never store private AI model credentials, database passwords, service-role keys, or other secrets in frontend environment variables. Keep private credentials in server-side environment variables or an approved secrets manager.

### Step 4: Install and Run an Open-Source Model
1. Install Ollama according to its official installation instructions for your operating system.
2. Download a compatible model:
   ```bash
   ollama pull <model-name>
   ```
3. Run the model:
   ```bash
   ollama run <model-name>
   ```
*(Replace `<model-name>` with a model supported by your installed version of Ollama. For production deployments, restrict access to the model-serving API so that only authorized internal services can connect.)*

### Step 5: Configure the Backend
The backend should:
1. Authenticate incoming requests.
2. Validate inputs and enforce request limits.
3. Build structured prompts for each AI feature.
4. Send requests to the internal inference service.
5. Validate model responses.
6. Return results to the frontend.
7. Save generated content when requested.
8. Handle inference errors gracefully.

### Step 6: Configure the Database
* Set up PostgreSQL, Supabase, or the selected database.
* Create the necessary tables, relationships, indexes, and authorization policies.
* For strict on-premises requirements, use a self-hosted database rather than assuming a hosted database is local.

### Step 7: Start the Development Server
```bash
npm run dev
```
Open the local URL displayed in the terminal, commonly: `http://localhost:5173`

### Step 8: Build for Production
```bash
npm run build
npm run preview
```
*(Check `package.json` to confirm that these scripts are available.)*

---

## Responsible AI Disclaimer

AI-generated content may contain errors, omissions, or unsupported conclusions.
* Review emails before sending them.
* Confirm task priorities, deadlines, and assignments.
* Verify research findings against reliable sources.
* Avoid submitting sensitive information unless organizational policies permit it.
* Review outputs for inaccuracies, bias, and inappropriate recommendations.

> Using open-source models on local hardware does not eliminate the need for human review or responsible AI practices.

---

## Troubleshooting

### Application Does Not Start
* Verify the Node.js version.
* Run `npm install`.
* Check the scripts in `package.json`.
* Review build and runtime errors.

### AI Model Does Not Respond
* Confirm the inference runtime is running.
* Verify that the model has been downloaded.
* Check the backend's configured inference endpoint.
* Review available RAM and GPU memory.
* Confirm network and firewall configuration.
* Review model-serving logs.

### AI Responses Are Slow
* Evaluate model size and quantization.
* Check CPU, GPU, and memory resources.
* Adjust concurrency and request limits.
* Benchmark alternative compatible models.
* Consider a suitable serving framework for the workload.

### Saved Data Does Not Persist
* Verify database connectivity.
* Check authentication and authorization.
* Review database access policies.
* Confirm that save operations are being executed.
* Inspect application and backend logs.

---

## Future Improvements

Potential enhancements include:
* Enterprise single sign-on.
* Role-based access control.
* Internal document search and private knowledge bases.
* Retrieval-augmented generation (RAG).
* Local document processing.
* On-premises speech-to-text.
* Private deployment automation.
* Privacy-conscious audit logging.
* Model performance monitoring.
* Organization-specific prompt templates.
* Team collaboration and shared workspaces.
* Offline deployment configurations.

---

## Contributing

1. Fork the repository or create a feature branch.
2. Implement changes following the existing architecture.
3. Test the frontend, backend, AI integration, and authorization.
4. Document any new environment variables.
5. Submit a pull request describing your changes.

> **Do not commit API keys, private credentials, sensitive prompts, or production data.**

---

## License

Add an appropriate license file before distributing the application. Review the licenses of the selected AI models and third-party dependencies separately. The application's license does not override the terms governing model weights or external software.

---

*AI Workplace Productivity Assistant — Empowering professionals with open-source AI, on-premises infrastructure, and privacy-conscious workplace automation.*
