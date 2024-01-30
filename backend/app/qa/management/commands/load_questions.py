import pandas as pd
from django.core.management.base import BaseCommand
from qa import models


class Command(BaseCommand):
    """Django command to load questions stored in CSV file."""

    def handle(self, *args, **options):
        df = pd.read_csv("/code/backend/data/question_answer__system.csv")
        for _, row in df.iterrows():
            models.Question.objects.create(
                content=row["question"], topic=row["topic"], answer=row["answer"]
            )
