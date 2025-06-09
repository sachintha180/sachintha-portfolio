from api_response import BaseResponse, PerceptronTrainResponse
from api.models.train_validation import validate_train_request
from . import models_bp
from flask import current_app, jsonify, request, session
import numpy as np
from api.models.perceptron import Perceptron


@models_bp.route("/train", methods=["POST"])
def train():
    current_app.logger.info("Received request: %s %s", request.method, request.url)

    # Initial check for JSON content type
    if not request.is_json:
        current_app.logger.error("Request body is not JSON")
        return BaseResponse.error(message="Request body must be JSON")

    request_data = request.get_json()
    current_app.logger.info("Request JSON: %s", request_data)

    # Validate the request data using the dedicated validation function
    is_valid, validated_data, error_response = validate_train_request(
        request_data, current_app.logger
    )
    if not is_valid:
        assert (
            error_response is not None
        ), "If validation fails, error_response must be provided."
        return error_response

    # If is_valid is True, validated_data is guaranteed to be a dict.
    assert validated_data is not None
    model = validated_data["model"]

    # Retrieve dataset from session
    if model not in session or "dataset" not in session[model]:
        return BaseResponse.error(
            message="No dataset found. Please generate a dataset first."
        )
    dataset = session[model]["dataset"]

    if model == "perceptron":
        # Pre-prepare training and testing datasets as numpy arrays
        X_train = np.array(dataset["X_train"], dtype=np.float64)
        y_train = np.array(dataset["y_train"], dtype=np.float64)
        X_test = np.array(dataset["X_test"], dtype=np.float64)
        y_test = np.array(dataset["y_test"], dtype=np.float64)

        # Store weights, bias, and current index in session
        if "state" not in session[model]:
            # Initialize perceptron and state
            p = Perceptron(X_train, y_train, X_test, y_test)
            w = p.w.tolist()
            b = p.b.tolist()
            idx = 0
        else:
            # Load weights and biases from session
            state = session[model]["state"]
            w = np.array(state["w"], dtype=np.float64)
            b = np.array(state["b"], dtype=np.float64)
            idx = state["idx"]

            # Reconstruct perceptron with saved weights/bias
            p = Perceptron(X_train, y_train, X_test, y_test)

            # Set weights and biases to that saved
            p.w = w
            p.b = b

        # Step through the next training example
        if idx >= dataset["X_dims"][0]:
            return PerceptronTrainResponse.error(
                message="All training examples have been processed"
            )

        # Obtain the current training example
        x_i = X_train[idx]
        y_i = y_train[idx]
        result = p.train_one_example(x_i, y_i)

        # Save updated state
        session[model]["state"] = {
            "w": p.w.tolist(),
            "b": p.b,
            "idx": idx + 1,
        }

        # Return response dataset for frontend rendering
        return PerceptronTrainResponse.success(
            result["z"],
            p.w.tolist()[0],
            p.b[0],
            result["y_hat"],
            idx,
            x_i.tolist(),
            y_i,
            result["accuracy"],
        )
    else:
        current_app.logger.error("Invalid 'model' attribute: %s", model)
        return BaseResponse.error(message=f"Invalid 'model' attribute: {model}")


@models_bp.route("/predict", methods=["POST"])
def predict():
    # use trained model to make predictions
    return jsonify({"prediction": [0, 1]})
