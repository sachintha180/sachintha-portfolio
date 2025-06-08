"""Validation functions for API requests."""

from data_response import GeneratorResponse

MAX_N_VALUE = 200
MIN_TEST_TRAIN_SPLIT_VALUE = 0.1
MAX_TEST_TRAIN_SPLIT_VALUE = 0.9


def validate_generate_request(request_data, logger):
    """
    Validates the data for the /api/generate endpoint.
    """

    def _fail(msg):
        logger.error(msg)
        return False, None, GeneratorResponse.error(message=msg)

    # This check is for request.get_json() returning None if not JSON
    if not request_data:
        return _fail("Request body must be JSON or is empty")

    dataset = request_data.get("dataset")
    n_value = request_data.get("n")
    test_train_split = request_data.get("testTrainSplit")

    if not dataset:
        return _fail("'dataset' attribute is missing")

    if n_value is None:
        return _fail("'n' attribute is missing")

    if not isinstance(n_value, int) or n_value <= 0:
        return _fail("'n' must be a positive integer")

    if n_value > MAX_N_VALUE:
        return _fail(f"'n' must be less than {MAX_N_VALUE}")

    if not isinstance(test_train_split, float):
        return _fail("'testTrainSplit' must be a floating point number")

    if (
        test_train_split < MIN_TEST_TRAIN_SPLIT_VALUE
        or test_train_split > MAX_TEST_TRAIN_SPLIT_VALUE
    ):
        return _fail(
            f"'testTrainSplit' must be between {MIN_TEST_TRAIN_SPLIT_VALUE} and {MAX_TEST_TRAIN_SPLIT_VALUE}"
        )

    return (
        True,
        {"dataset": dataset, "n": n_value, "test_train_split": test_train_split},
        None,
    )
