import random

from qa import models, serializers, services
from rest_framework import serializers as rest_framework_serializers
from rest_framework import status, views, viewsets
from rest_framework.response import Response


class QuestionViewSet(viewsets.ModelViewSet):
    """View set for managing question API."""

    queryset = models.Question.objects.all()
    serializer_class = serializers.QuestionDetailSerializer

    def get_queryset(self):
        """Retrieve questions"""
        return self.queryset.order_by("-id")

    def get_serializer_class(self):
        """Return the serializer class for request"""
        if self.action in ("list"):
            return serializers.QuestionSerializer

        return self.serializer_class

    def retrieve(self, request, pk=None, *args, **kwargs):
        """Retrieve a question."""
        try:
            question = self.queryset.get(pk=pk)
        except models.Question.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(question)

        return Response(serializer.data, status=status.HTTP_200_OK)


class QuestionRandomSelectionApiView(views.APIView):
    def get(self, request, format=None):
        try:
            all_questions = models.Question.objects.all()
            if not all_questions:
                raise models.Question.DoesNotExist
            nq = len(all_questions) - 1
            end = random.randint(0, nq)
            start = (end - 1) if end > 0 else 0
            question = all_questions[start:end][0]
        except models.Question.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.QuestionDetailSerializer(question)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OpenQuestionScoringApiView(views.APIView):
    class InputSerializer(rest_framework_serializers.Serializer):
        question = rest_framework_serializers.CharField()
        answer = rest_framework_serializers.CharField()

    def post(self, request, *args, **kwargs):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        service = services.OpenQuestionScoringService()
        score = service.score(
            question=serializer.validated_data["question"],
            answer=serializer.validated_data["answer"]
        )
        return Response(data={"score": score}, status=status.HTTP_200_OK)
