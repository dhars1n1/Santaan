from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from groq import Groq
import os
from dotenv import load_dotenv
from lib.docsearch import docsearch

load_dotenv()

# Initialize the Flask application
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes

# Configure the Google Generative AI with your API key
gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY environment variable is not set")
genai.configure(api_key=gemini_api_key)

# Create a GenerativeModel instance
try:
    model = genai.GenerativeModel('gemini-1.5-flash')
except Exception as e:
    print(f"Error initializing Gemini model: {e}")
    raise

def generate_faqs(query):
    """
    Generate FAQ content based on the user query.
    """
    try:
        prompt = f"Generate 3 FAQs (questions only) based on the following user query that a user can ask to a chatbot to learn about that topic: {query}. The generated questions should contain the actual topic name instead of words like these/those/it"
        response = model.generate_content(prompt)
        
        # Print the raw response for debugging
        print(f"Raw response: {response}")
        
        # Check if response has text attribute
        if not hasattr(response, 'text'):
            print("Response does not have 'text' attribute")
            return []
        
        text = response.text
        print(f"Generated text: {text}")
        
        # Split the text into questions and clean them up
        questions = [q.strip() for q in text.split('\n') if q.strip() and '?' in q]
        
        # Take only the first 3 questions
        questions = questions[:3]
        
        print(f"Extracted questions: {questions}")
        
        return questions
    except Exception as e:
        print(f"Detailed error in generate_faqs: {str(e)}")
        print(f"Error type: {type(e)}")
        import traceback
        traceback.print_exc()
        raise

# Define a route to generate FAQs (GET request for browser testing)
@app.route('/generate-faqs', methods=['GET'])
def generate_faqs_endpoint():
    """
    Endpoint to generate FAQs based on user input.
    Expects a 'query' parameter in the URL.
    """
    query = request.args.get('query', '')
    if not query:
        return jsonify({"status": "error", "message": "Query parameter is required"}), 400

    try:
        faqs = generate_faqs(query)
        return jsonify({
            "status": "success",
            "data": {
                "faqs": faqs
            }
        }), 200
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Full error details: {error_details}")
        return jsonify({
            "status": "error", 
            "message": str(e),
            "details": error_details
        }), 500

@app.route("/api/chat", methods=["GET"])
def chat():
    """
    Handle chat messages and return AI responses.
    """
    # Explicitly check for GET method
    if request.method != "GET":
        return jsonify({"error": "Method Not Allowed"}), 405

    try:
        # Get question from query parameters
        user_question = request.args.get("question", "")

        if not user_question:
            return jsonify({"error": "Question is required"}), 400

        # Retrieve context using docsearch
        context = docsearch(user_question)

        # System prompt template
        system_prompt = """
        You are a medical assistant who refers to the textbook and answers the question given by the user. 
        You don't answer anything outside the textbook. You do not answer any question that is not related to IVF. If the answer is not in the context, say "I do not know."
        You can identify questions even with spelling mistakes.
        """

        try:
            # Initialize Groq client
            client = Groq(api_key=os.getenv("GROQ_API_KEY"))

            # Generate response using Groq
            response = client.chat.completions.create(
                model="llama3-8b-8192",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Answer the following question based on the context provided. If you do not know the answer, say \"I do not know. DO NOT SAY based on the content when starting the answer.\"\n\n## Question:\n{user_question}\n\n## Context:\n{context}"}
                ]
            )
            
            answer = response.choices[0].message.content
            return jsonify({"answer": answer})
        except Exception as groq_error:
            print(f"Groq API error: {str(groq_error)}")
            # Fallback to Gemini if Groq fails
            response = model.generate_content(f"""
            Answer this medical question based on this context. If you cannot find the answer in the context, say "I do not know."
            Question: {user_question}
            Context: {context}
            """)
            return jsonify({"answer": response.text})
    
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({"error": "An error occurred while processing the request."}), 500

# Add a simple root route to verify server is running
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend is running!"})

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True, port=5000)
