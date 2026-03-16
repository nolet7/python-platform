from flask import Flask, jsonify
import datetime
import socket
import os

app = Flask(__name__)

APP_NAME = "python-app"
APP_VERSION = "v2"


@app.route("/")
def home():
    return jsonify({
        "message": "python app is working very good",
        "app": APP_NAME,
        "version": APP_VERSION,
        "environment": os.getenv("APP_ENV", "dev"),
        "routes": [
            "/api/v1/details",
            "/api/v1/healthz",
            "/api/v1/version"
        ]
    })


@app.route("/api/v1/details")
def details():
    return jsonify({
        "time": datetime.datetime.now().strftime("%I:%M:%S%p on %B %d, %Y"),
        "hostname": socket.gethostname(),
        "app": APP_NAME,
        "version": APP_VERSION
    })


@app.route("/api/v1/healthz")
def health():
    return jsonify({
        "status": "up",
        "app": APP_NAME,
        "version": APP_VERSION
    }), 200


@app.route("/api/v1/version")
def version():
    return jsonify({
        "app": APP_NAME,
        "version": APP_VERSION,
        "environment": os.getenv("APP_ENV", "dev")
    }), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
