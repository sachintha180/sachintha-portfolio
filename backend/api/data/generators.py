import numpy as np


class AndGenerator:
    """Generates data for an AND logical gate."""

    def __init__(self, n: int, test_train_split: float, jitter_std=0.08):
        """Initializes the AND data generator."""
        self.n = n
        self.test_train_split = test_train_split
        self.jitter_std = jitter_std

    def generate(self):
        """Generates training and testing data for X (inputs) and y (outputs) for the AND gate."""
        # Generate n random (x1, x2) pairs where both are 0 or 1
        X = np.random.randint(0, 2, size=(self.n, 2))

        # Compute output pairs (via bitwise AND)
        y = X[:, 0] & X[:, 1]

        # Add jitter to each point
        X = X + np.random.normal(0, self.jitter_std, size=X.shape)

        # Shuffle the dataset consistently
        rng = np.random.default_rng()
        indices = rng.permutation(self.n)

        # Split the dataset into training and testing datasets
        split_idx = int(self.n * self.test_train_split)
        train_idx, test_idx = indices[:split_idx], indices[split_idx:]

        X_train, X_test = X[train_idx], X[test_idx]
        y_train, y_test = y[train_idx], y[test_idx]

        return X_train, y_train, X_test, y_test
