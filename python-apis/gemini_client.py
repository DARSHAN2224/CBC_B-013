from google import generativeai as genai

API_KEY = "AIzaSyA5SqaMGQGK-QVD5j1-GSdDVkCCkae6SPk"
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

def generate_gemini_response(input_text, explanation="You are an AI assistant."):
    prompt = f"{explanation}\n\nUser input: {input_text}"
    response = model.generate_content(prompt)
    return response.text
