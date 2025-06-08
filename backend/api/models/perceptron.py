import numpy as np


class Perceptron:
    def __init__(
        self,
        X_train,
        y_train,
        X_test,
        y_test,
        learning_rate: float = 0.1,
    ):
        # Initialize training and testing datasets
        self.X_train = X_train
        self.y_train = y_train
        self.X_test = X_test
        self.y_test = y_test

        # Initialize hyperparameters
        self.learning_rate = learning_rate

        # Initialize random weights and biases
        # NOTE: A row per output (1), a column per input
        self.w = np.random.randn(1, self.X_train.shape[1])
        self.b = np.random.randn(1)

    def _step(self, z):
        return 1 if z >= 0 else 0

    def _propagate(self, x):
        # 1. Forward propagation, calculate 'z'
        z = float(self.w @ x + self.b)

        # 2. Forward propagation, calculate 'y_hat' using step function
        y_hat = self._step(z)

        return z, y_hat

    def _evaluate(self):
        # Loop over all testing examples to determine correct percentage
        correct = 0
        for x_i, y_i in zip(self.X_test, self.y_test):
            _, y_hat = self._propagate(x_i)
            correct += int(y_hat == y_i)

        return correct / len(self.y_test)

    def train_one_example(self, x, y):
        # 1. Forward propagation
        z, y_hat = self._propagate(x)

        # 2. Calculate loss
        loss = y - y_hat

        # 3. Update weights and biases
        self.w += self.learning_rate * loss * x.reshape(1, -1)
        self.b += self.learning_rate * loss

        # 4. Run evaluation
        accuracy = self._evaluate()

        return {
            "x": x,
            "z": z,
            "y_hat": y_hat,
            "y": y,
            "accuracy": accuracy,
        }
