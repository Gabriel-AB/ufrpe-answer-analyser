from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from qa import models, serializers
from rest_framework import status
from rest_framework.test import APIClient

QUESTIONS_URL = reverse("qa:question-list")


def create_user(email="user@email.com", password="user_password"):
    """Create and return a new user."""
    user = get_user_model().objects.create(email=email, password=password)
    return user


def get_detail_url(question_id):
    """Create and return a question detail URL."""
    return reverse("qa:question-detail", args=[question_id])


def create_question(params={}):
    """Create and return a new question object."""
    defaults = {
        "content": "How old are you?",
        "topic": "You",
        "answer": "Mind your business!",
    }
    defaults.update(params)
    question = models.Question.objects.create(**defaults)
    return question


class PublicQuestionApiTests(TestCase):
    """Test the public features of the question API."""

    def setUp(self):
        self.client = APIClient()


class PrivateQuestionApiTests(TestCase):
    """Test the private features of the question API."""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user()

    def test_retrieve_questions(self):
        """Test retrieving a list of questions."""
        create_question()
        create_question()

        res = self.client.get(QUESTIONS_URL)

        questions = models.Question.objects.all().order_by("-id")
        serializer = serializers.QuestionSerializer(questions, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_get_question_detail(self):
        """Test getting question detail."""
        question = create_question()

        url = get_detail_url(question.id)
        res = self.client.get(url)

        serializer = serializers.QuestionDetailSerializer(question)
        self.assertEqual(res.data, serializer.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_partially_update_question(self):
        """Test partially updating a question."""
        question = create_question()

        payload = {"content": "How are you?", "answer": "I'm just fine!"}
        url = get_detail_url(question.id)
        res = self.client.patch(url, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        question.refresh_from_db()
        self.assertEqual(question.content, payload["content"])
        self.assertEqual(question.answer, payload["answer"])

    def test_fully_update_question(self):
        """Test fully updating a question."""
        question = create_question()

        payload = {"content": "How are you?", "answer": "I'm just fine!", "topic": "Me"}
        url = get_detail_url(question.id)
        res = self.client.put(url, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        question.refresh_from_db()
        self.assertEqual(question.content, payload["content"])
        self.assertEqual(question.answer, payload["answer"])
        self.assertEqual(question.topic, payload["topic"])

    def test_delete_question(self):
        """Test deleting a question."""
        question = create_question()

        url = get_detail_url(question.id)
        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(models.Question.objects.filter(id=question.id).exists())
