from qa import models, serializers
from rest_framework import viewsets


class QuestionViewSet(viewsets.ModelViewSet):
    """View set for managing question API."""

    queryset = models.Question.objects.all()
    serializer_class = serializers.QuestionDetailSerializer

    def get_queryset(self):
        """Retrive questions"""
        return self.queryset.order_by("-id")

    def get_serializer_class(self):
        """Return the serializer class for request"""
        if self.action in ("list"):
            return serializers.QuestionSerializer

        return self.serializer_class
