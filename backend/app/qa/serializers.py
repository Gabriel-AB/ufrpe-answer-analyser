from qa import models
from rest_framework import serializers


class QuestionSerializer(serializers.ModelSerializer):
    """Serializer for question object."""

    class Meta:
        model = models.Question
        fields = ("id", "topic")
        read_only_fields = ("id",)


class QuestionDetailSerializer(QuestionSerializer):
    """Serializer for question detail view."""

    class Meta(QuestionSerializer.Meta):
        fields = QuestionSerializer.Meta.fields + ("content", "answer")
