from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profile
from .serializers import ProfileSerializer


class ResumeView(APIView):
    """
    GET /api/resume/  -> the first (only) Profile, fully nested.
    """

    def get(self, request):
        profile = Profile.objects.prefetch_related(
            "expertise_groups__items",
            "experience__bullets",
            "projects__bullets",
            "education",
        ).first()

        if not profile:
            return Response(
                {"detail": "No profile found. Run `python manage.py seed_resume` first."},
                status=404,
            )

        return Response(ProfileSerializer(profile).data)