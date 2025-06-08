from flask import jsonify


class BaseResponse:
    @staticmethod
    def error(message: str, status_code: int = 400):
        return (
            jsonify({"error": message}),
            status_code,
        )


class GeneratorResponse(BaseResponse):
    @staticmethod
    def success(X_train, y_train, X_test, y_test, X_dims):
        return jsonify(
            {
                "X_train": X_train,
                "y_train": y_train,
                "X_test": X_test,
                "y_test": y_test,
                "X_dims": X_dims,
                "error": None,
            }
        )


class PerceptronTrainResponse(BaseResponse):
    @staticmethod
    def success(z, w, b, y_hat, idx, x_i, y_i, accuracy):
        return jsonify(
            {
                "z": z,
                "w": w,
                "b": b,
                "y_hat": y_hat,
                "idx": idx,
                "x_i": x_i,
                "y_i": y_i,
                "accuracy": accuracy,
                "error": None,
            }
        )
