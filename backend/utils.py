import os
from typing import Dict


def validate_env_variables(*var_names: str):
    """
    Validates that all provided environment variable names exist.
    """
    missing_vars = [var for var in var_names if os.getenv(var) is None]

    if missing_vars:
        error_message = (
            f"Missing required environment variables: {', '.join(missing_vars)}"
        )
        raise RuntimeError(error_message)

    return {var: str(os.getenv(var)) for var in var_names}
