# Santaan Chatbot

Santaan Chatbot is a specialized chatbot designed for training medical professionals in a startup called Santaan. This project leverages cutting-edge technologies to deliver an efficient and interactive learning experience.

## Overview
The chatbot serves as an advanced training tool, helping medical professionals gain insights and knowledge through AI-powered interactions. It integrates seamlessly with multiple APIs and services to provide a robust and scalable solution.

## How to Run
Follow these steps to set up and run the project:

### 1. Install Required Packages
Run the following command to install all necessary dependencies:
```bash
pip install -r requirements.txt
```

### 2. Backend Environment Setup
Create a `.env` file in the `backend` folder with the following content:
```env
GEMINI_API_KEY="your-gemini-api-key"
PINECONE_API_KEY="your-pinecone-api-key"
PINECONE_ENVIRONMENT="your-pinecone-environment"
PINECONE_INDEX_NAME="your-pinecone-index-name"
GROQ_API_KEY="your-groq-api-key"
ENTREZ_EMAIL="your-entrez-email"
```

### 3. Frontend Environment Setup
Create a `.env.local` file in the `frontend` folder with the following content:
```env
NEXT_PUBLIC_API_KEY="your-next-api-key"
NEXT_PUBLIC_AUTH_DOMAIN="your-next-public-auth-domain"
NEXT_PUBLIC_PROJECT_ID="your-next-public-project-id"
NEXT_PUBLIC_STORAGE_BUCKET="your-next-public-storage-bucket"
NEXT_PUBLIC_MESSAGING_SENDER_ID="your-next-public-messaging-sender-id"
NEXT_PUBLIC_APP_ID="your-next-public-app-id"
```

### 4. Running the Project
To run the project, start the backend and frontend separately:

#### Backend
Open a terminal and execute:
```bash
python app.py
```

#### Frontend
Open another terminal and execute:
```bash
npm run dev
```

## Tech Stack
The project utilizes the following technologies:
- **Node.js**: For building the frontend.
- **Flask**: For creating the backend API.
- **Pinecone**: For managing vector databases and enabling efficient search and similarity matching.

## Developed By
GitHub ID: [dhars1n1](https://github.com/dhars1n1)
