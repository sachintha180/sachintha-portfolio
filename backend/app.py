"""Flask API for generating datasets."""

import logging
from flask import Flask, jsonify, request
from flask_cors import CORS

from data_generator import AndGenerator
from validation import validate_generate_request

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure basic logging
logging.basicConfig(level=logging.INFO)


@app.route("/api/generate", methods=["POST"])
def generate():
    """Generates a dataset based on the provided type and size."""
    app.logger.info("Received request: %s %s", request.method, request.url)

    # Initial check for JSON content type
    if not request.is_json:
        app.logger.error("Request body is not JSON")
        return (
            jsonify({"X": None, "y": None, "error": "Request body must be JSON"}),
            400,
        )

    request_data = request.get_json()
    app.logger.info("Request JSON: %s", request_data)

    # Validate the request data using the dedicated validation function
    is_valid, validated_data, error_response = validate_generate_request(
        request_data, app.logger
    )
    if not is_valid:
        assert (
            error_response is not None
        ), "If validation fails, error_response must be provided."
        return error_response

    # If is_valid is True, validated_data is guaranteed to be a dict.
    assert validated_data is not None
    dataset = validated_data["dataset"]
    n_value = validated_data["n"]

    # Generate dataset based on dataset type
    X, y = None, None
    if dataset == "and":
        try:
            generator = AndGenerator(n_value)
            X, y = generator.generate()
            # Convert numpy arrays to lists for JSON serialization
            X_list = X.tolist() if X is not None else None
            y_list = y.tolist() if y is not None else None
            app.logger.info("Successfully generated 'and' dataset with n=%s", n_value)

        except Exception as e:
            app.logger.error("Error generating 'and' dataset: %s", e)
            return (
                jsonify(
                    {
                        "X": None,
                        "y": None,
                        "error": f"Error generating dataset: {str(e)}",
                    }
                ),
                500,
            )
    else:
        app.logger.error("Invalid 'type' attribute: %s", dataset)
        return (
            jsonify(
                {
                    "X": None,
                    "y": None,
                    "error": f"Invalid 'type' attribute: {dataset}",
                }
            ),
            400,
        )

    # Return generated dataset
    return (
        jsonify(
            {
                "X": X_list,
                "y": y_list,
                "error": None,
            }
        ),
        200,
    )


if __name__ == "__main__":
    app.run(debug=True)
