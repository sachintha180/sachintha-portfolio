"""Validation functions for API requests."""

from flask import jsonify

MAX_N_VALUE = 500


def validate_generate_request(request_data, logger):
    """
    Validates the data for the /api/generate endpoint.
    """
    if (
        not request_data
    ):  # This check is for request.get_json() returning None if not JSON
        logger.error("Request body is not JSON or is empty")
        return (
            False,
            None,
            (
                jsonify(
                    {
                        "X": None,
                        "y": None,
                        "error": "Request body must be JSON or is empty",
                    }
                ),
                400,
            ),
        )

    dataset = request_data.get("dataset")
    n_value = request_data.get("n")

    if not dataset:
        logger.error("'dataset' attribute missing in request")
        return (
            False,
            None,
            (
                jsonify(
                    {"X": None, "y": None, "error": "'dataset' attribute is missing"}
                ),
                400,
            ),
        )

    if n_value is None:
        logger.error("'n' attribute missing in request")
        return (
            False,
            None,
            (jsonify({"X": None, "y": None, "error": "'n' attribute is missing"}), 400),
        )

    if not isinstance(n_value, int) or n_value <= 0:
        logger.error("Invalid 'n' attribute: %s", n_value)
        return (
            False,
            None,
            (
                jsonify(
                    {"X": None, "y": None, "error": "'n' must be a positive integer"}
                ),
                400,
            ),
        )

    if n_value > MAX_N_VALUE:
        logger.error("Invalid 'n' attribute: %s", n_value)
        return (
            False,
            None,
            (
                jsonify(
                    {
                        "X": None,
                        "y": None,
                        "error": f"'n' must be less than {MAX_N_VALUE}",
                    }
                ),
                400,
            ),
        )

    return True, {"dataset": dataset, "n": n_value}, None
