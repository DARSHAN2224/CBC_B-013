import sys
import json
from gemini_client import generate_gemini_response  # Assuming this function is defined in gemini_client.py

def main():
    try:
        if len(sys.argv) < 2:
            print("{}", file=sys.stderr)
            sys.exit(1)

        input_json = sys.argv[1]
        incomplete_data = json.loads(input_json)
        
        # Make sure the variable names match
        prompt = (
            "You are a mental health assistant AI. Based on the following user data, "
            "analyze their condition and provide personalized mental health suggestions that are practical and empathetic. "
            "Consider both emotional and behavioral patterns in your suggestions.\n\n"
            f"User Data: {json.dumps(incomplete_data, indent=2)}\n\n"
            "Give 3-5 suggestions tailored to their input. Be concise, helpful, and human-like."
        )

        # Call the Gemini API function
        questions = generate_gemini_response(incomplete_data, prompt)

        # Ensure it's a list before dumping
        if isinstance(questions, list):
            print(json.dumps(questions))
        else:
            print(json.dumps([str(questions)]))
    
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
