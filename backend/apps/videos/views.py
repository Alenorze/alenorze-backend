from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class YouTubeVideosAPIView(APIView):
    def get(self, request):
        return Response({'videos': []}, status=status.HTTP_200_OK)
