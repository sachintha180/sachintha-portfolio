"""Flask API for generating datasets."""

import logging
import os
from flask import Flask, request, session
from flask.cli import load_dotenv
from flask_cors import CORS
from flask_session import Session

from data_response import GeneratorResponse
from data_generator import AndGenerator
from validation import validate_generate_request

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load environment variables file
load_dotenv("env.local")

# Configure app parameters
app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY")
app.config["SESSION_TYPE"] = os.getenv("FLASK_SESSION_TYPE")

# Initialize session for app
Session(app)

# Configure basic logging
logging.basicConfig(level=logging.INFO)


@app.route("/api/generate", methods=["POST"])
def generate():
    """Generates a dataset based on the provided type, size and test-train split."""
    app.logger.info("Received request: %s %s", request.method, request.url)

    # Initial check for JSON content type
    if not request.is_json:
        app.logger.error("Request body is not JSON")
        return GeneratorResponse.error(message="Request body must be JSON")

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
    test_train_split = validated_data["test_train_split"]

    # Generate dataset based on dataset type
    if dataset == "and":
        try:
            # Instantiate AndGenerator and generate dataset
            generator = AndGenerator(n_value, test_train_split)
            X_train, y_train, X_test, y_test = generator.generate()

            # Convert numpy arrays to lists for JSON serialization
            X_train_list = X_train.tolist() if X_train is not None else None
            y_train_list = y_train.tolist() if y_train is not None else None
            X_test_list = X_test.tolist() if X_test is not None else None
            y_test_list = y_test.tolist() if y_test is not None else None

            # Display success message
            app.logger.info(
                "Successfully generated 'and' dataset with n=%s and test_train_split=%s",
                n_value,
                test_train_split,
            )

        except Exception as e:
            app.logger.error("Error generating 'and' dataset: %s", e)
            return GeneratorResponse.error(
                message=f"Error generating dataset: {str(e)}", status_code=500
            )

    else:
        app.logger.error("Invalid 'type' attribute: %s", dataset)
        return GeneratorResponse.error(message=f"Invalid 'type' attribute: {dataset}")

    # Save generated dataset to session
    session["dataset"] = {
        "X_train": X_train_list,
        "y_train": y_train_list,
        "X_test": X_test_list,
        "y_test": y_test_list,
        "X_dims": X_train.shape,
    }

    # Return generated dataset for frontend rendering
    return GeneratorResponse.success(**session["dataset"])


if __name__ == "__main__":
    app.run(debug=True)
