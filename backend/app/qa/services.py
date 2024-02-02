import joblib
import torch
from transformers import AutoModel, AutoTokenizer


class OpenQuestionScoringService:
    def __init__(self):
        model_ckpt = "distilbert-base-uncased"
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.tokenizer = self._load_tokenizer(model_ckpt)
        self.model = self._load_model(model_ckpt)
        self.scorer = self._load_scorer()

    def _load_scorer(self):
        scorer = joblib.load("/code/backend/models/svm_ovr_model.pkl")
        return scorer

    def _load_model(self, model_ckpt: str):
        model = AutoModel.from_pretrained(model_ckpt).to(self.device)
        return model

    def _load_tokenizer(self, model_ckpt: str):
        tokenizer = AutoTokenizer.from_pretrained(model_ckpt)
        return tokenizer

    def __call__(self, *args, **kwargs):
        self.score(self, *args, **kwargs)

    def score(self, question, answer):
        # Concatenate question and answer
        text = question + " " + answer

        with torch.no_grad():
            # Tokenize the text
            inputs = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True)
            inputs = {k: v.to(self.device) for k, v in inputs.items()}

            # Forward pass through the model
            outputs = self.model(**inputs)
            last_hidden_state = outputs.last_hidden_state

            # Extract the hidden state of the [CLS] token
            cls_hidden_state = last_hidden_state[:, 0, :].cpu().numpy()

        # Predict using the scorer
        y_pred = self.scorer.predict(cls_hidden_state)

        return y_pred[0]
