from rest_framework.routers import DefaultRouter
from django.urls import path
from bugphile_app.views import *

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'project_status', ProjectStatusViewSet, basename='project_status')
router.register(r'projects', ProjectViewSet, basename='projects')
router.register(r'issues', IssueViewSet, basename='issues')
router.register(r'issue_priority', IssuePriorityViewSet, basename='issue_priority')
router.register(r'comments', CommentViewSet, basename='comments')
router.register(r'tags', IssueTagViewSet, basename='tags')
router.register(r'issue_status', IssueStatusViewSet, basename='issue_status')
urlpatterns = router.urls

urlpatterns += [
    path(r'oauth', OAuthView.as_view()),
]