import json

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from qa import models, serializers
from rest_framework import status
from rest_framework.test import APIClient

QUESTIONS_URL = reverse("qa:question-list")
SELECT_QUESTION_URL = reverse("qa:select-question")
SCORE_QUESTION_URL = reverse("qa:score-answer")


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

    def test_select_random_question(self):
        """Test selecting random question."""
        create_question()
        create_question()

        self.assertTrue(len(models.Question.objects.all()), 2)

        res_a = self.client.get(SELECT_QUESTION_URL)
        res_b = self.client.get(SELECT_QUESTION_URL)

        self.assertEqual(res_a.status_code, status.HTTP_200_OK)
        self.assertEqual(res_b.status_code, status.HTTP_200_OK)

        self.assertEqual(res_a.data["id"], res_b.data["id"])

    def test_score_answer(self):
        """Test scoring answer."""
        question = "How does the human circulatory system work?"
        answer = "The circulatory system is basically a loop of blood throughout our body. The heart pumps oxygen filled blood through our body where the cells take out the oxygen out of the blood. Then the oxygen low blood comes back to the heart, gets pumped into the lungs where it gets filled with oxygen again. Then the cycle repeats."
        topic = "Biology"
        create_question(
            {
                "content": question,
                "answer": answer,
                "topic": topic,
            }
        )

        payload = json.dumps({"question": question, "answer": answer})
        res = self.client.post(
            SCORE_QUESTION_URL, data=payload, content_type="application/json"
        )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["score"], 5)
