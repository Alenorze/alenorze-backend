from django.urls import path

from .views import YouTubeVideosAPIView


app_name = 'videos'

urlpatterns = [
    path('latest-youtube-videos/', YouTubeVideosAPIView.as_view())
]
