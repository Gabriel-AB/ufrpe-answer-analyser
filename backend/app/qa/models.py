from django.db import models


class Question(models.Model):
    content = models.TextField(max_length=2000)
    topic = models.TextField(max_length=250)
    answer = models.TextField(max_length=2000)
