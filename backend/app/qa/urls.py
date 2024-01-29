from rest_framework.routers import DefaultRouter
from qa import views
from django.urls import path, include

router = DefaultRouter()
router.register("questions", views.QuestionViewSet, "question")

app_name = "qa"

urlpatterns = [
    path("", include(router.urls)),
]
