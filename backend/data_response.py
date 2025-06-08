from flask import jsonify


class GeneratorResponse:
    @staticmethod
    def error(message: str, status_code: int = 400):
        return (
            jsonify(
                {
                    "X_train": None,
                    "y_train": None,
                    "X_test": None,
                    "y_test": None,
                    "X_dims": None,
                    "error": message,
                }
            ),
            status_code,
        )

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
