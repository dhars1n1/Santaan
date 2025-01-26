import os
from pinecone import Pinecone, ServerlessSpec
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

# Load environment variables explicitly
load_dotenv()

# Debug: Print environment variables
# print("PINECONE_API_KEY:", os.getenv("PINECONE_API_KEY"))
# print("PINECONE_ENVIRONMENT:", os.getenv("PINECONE_ENVIRONMENT"))
# print("PINECONE_INDEX_NAME:", os.getenv("PINECONE_INDEX_NAME"))

# Check if API key is actually present
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
if not PINECONE_API_KEY:
    raise ValueError("Pinecone API Key is not set. Please check your .env file.")

# Initialize Pinecone client
pc = Pinecone(api_key=PINECONE_API_KEY)

# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

def docsearch(query):
    try:
        # Get the index using the new Pinecone client
        index = pc.Index(os.getenv("PINECONE_INDEX_NAME"))

        # Generate query embeddings
        query_embedding = model.encode(query).tolist()

        # Perform similarity search
        search_results = index.query(vector=query_embedding, top_k=2, include_metadata=True)

        # Aggregate content from results
        context = "\n\n".join([result["metadata"]["page_content"] for result in search_results["matches"]])
        
        return context or "No relevant context found in documents."
    except Exception as e:
        print(f"Error in docsearch: {e}")
        return "Error occurred while retrieving context."