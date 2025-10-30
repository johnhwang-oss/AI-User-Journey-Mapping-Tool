from __future__ import annotations

from flask import Flask, jsonify, request
from flask_cors import CORS

from parsing_logic import parse_interview_notes


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    @app.get("/health")
    def health_check():
        return jsonify({"status": "ok"})

    @app.post("/parse-notes")
    def parse_notes():
        try:
            payload = request.get_json(force=True, silent=False) or {}
        except Exception:  # pragma: no cover - defensive
            return jsonify({"error": "Invalid JSON payload."}), 400

        notes = payload.get("notes", "")
        a_r_name = payload.get("a_r_name", "")
        region = payload.get("region", "")
        genre_focus = payload.get("genre_focus", "")

        parsed = parse_interview_notes(notes, a_r_name, region, genre_focus)
        return jsonify(parsed)

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
