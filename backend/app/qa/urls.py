from django.urls import include, path
from qa import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("questions", views.QuestionViewSet, "question")

app_name = "qa"

urlpatterns = [
    path("", include(router.urls)),
    path(
        "select/",
        views.QuestionRandomSelectionApiView.as_view(),
        name="select-question",
    ),
]
