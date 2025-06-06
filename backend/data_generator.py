import numpy as np


class AndGenerator:
    """Generates data for an AND logical gate."""
    def __init__(self, n: int, jitter_std=0.08, random_seed=0):
        """Initializes the AND data generator."""
        self.n = n
        self.jitter_std = jitter_std
        self.random_seed = random_seed

    def generate(self):
        """Generates X (inputs) and y (outputs) for the AND gate."""
        # Establish a deterministic random seet
        np.random.seed(self.random_seed)

        # Generate n random (x1,x2) pairs where both are 0 or 1
        X = np.random.randint(0, 2, size=(self.n, 2))

        # Compute output pairs (via bitwise AND)
        y = X[:, 0] & X[:, 1]

        # Add jitter to each point
        X = X + np.random.normal(0, self.jitter_std, size=X.shape)

        return X, y
