from api_response import BaseResponse

MIN_LEARNING_RATE = 0.01


def validate_train_request(request_data, logger):
    def _fail(msg):
        logger.error(msg)
        return False, None, BaseResponse.error(message=msg)

    # This check is for request.get_json() returning None if not JSON
    if not request_data:
        return _fail("Request body must be JSON or is empty")

    model = request_data.get("model")
    learning_rate = request_data.get("learningRate")

    if not model:
        return _fail("'model' attribute is missing")

    if not learning_rate:
        return _fail("'learningRate' attribute is missing")

    if not isinstance(learning_rate, float) and learning_rate < MIN_LEARNING_RATE:
        return _fail(f"'testTrainSplit' must be above {MIN_LEARNING_RATE}")

    return (
        True,
        {"model": model, "learningRate": learning_rate},
        None,
    )
