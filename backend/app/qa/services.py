import numpy as np
import tensorflow as tf


class OpenQuestionScoringService:
    def __init__(self):
        self.vectorizer = self._load_vectorizer()
        self.model = self._load_model()

    def _load_model(self):
        model = tf.keras.models.load_model(
            "/code/backend/models/glove_oq_scorer_model.keras"
        )
        return model

    def _load_vectorizer(self):
        text_vectorizer_layer_model = tf.keras.models.load_model(
            "/code/backend/models/glove_text_vec_layer_model.keras"
        )
        text_vectorizer_layer = text_vectorizer_layer_model.layers[0]
        return text_vectorizer_layer

    def __call__(self, *args, **kwargs):
        self.score(self, *args, **kwargs)

    def score(self, question, answer):
        text = question + " " + answer
        vectorized = self.vectorizer([text])
        y_pred = self.model(vectorized)
        y_pred = np.argmax(y_pred, axis=1)
        return y_pred[0]
