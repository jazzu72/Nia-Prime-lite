from flask import Flask, request, jsonify
from openai import OpenAI
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app)  # Allow frontend to call backend

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are Nia LeSane, a wise, soulful AI from the House of Jazzu. Speak with rhythm and heart."},
                {"role": "user", "content": user_message}
            ],
            temperature=0.75,
            max_tokens=500
        )

        ai_reply = response.choices[0].message.content
        return jsonify({"reply": ai_reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
