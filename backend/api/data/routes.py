from flask import request, session
from api_response import GeneratorResponse
from api.data.generators import AndGenerator
from api.data.generator_validation import validate_generate_request
from flask import current_app
from . import data_bp


@data_bp.route("/generate", methods=["POST"])
def generate():
    """Generates a dataset based on the provided type, size and test-train split."""
    current_app.logger.info("Received request: %s %s", request.method, request.url)

    # Initial check for JSON content type
    if not request.is_json:
        current_app.logger.error("Request body is not JSON")
        return GeneratorResponse.error(message="Request body must be JSON")

    request_data = request.get_json()
    current_app.logger.info("Request JSON: %s", request_data)

    # Validate the request data using the dedicated validation function
    is_valid, validated_data, error_response = validate_generate_request(
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
    dataset_type = validated_data["dataset_type"]
    n_value = validated_data["n"]
    test_train_split = validated_data["test_train_split"]

    # Generate dataset type and model
    if model == "perceptron":
        if dataset_type == "and":
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
                current_app.logger.info(
                    "Successfully generated '%s' dataset_type with n=%s and test_train_split=%s",
                    dataset_type,
                    n_value,
                    test_train_split,
                )

            except Exception as e:
                current_app.logger.error(
                    "Error generating '%s' dataset: %s", dataset_type, e
                )
                return GeneratorResponse.error(
                    message=f"Error generating dataset: {str(e)}", status_code=500
                )

        else:
            current_app.logger.error(
                "Invalid 'dataset_type' attribute: %s", dataset_type
            )
            return GeneratorResponse.error(
                message=f"Invalid 'dataset_type' attribute: {dataset_type}"
            )
    else:
        current_app.logger.error("Invalid 'model' attribute: %s", model)
        return GeneratorResponse.error(message=f"Invalid 'model' attribute: {model}")

    # Reset model dictionary
    session[model] = {}

    # Update model dataset in session
    session[model]["dataset"] = {
        "X_train": X_train_list,
        "y_train": y_train_list,
        "X_test": X_test_list,
        "y_test": y_test_list,
        "X_dims": X_train.shape,
    }

    # Return generated dataset for frontend rendering
    return GeneratorResponse.success(**session[model]["dataset"])
