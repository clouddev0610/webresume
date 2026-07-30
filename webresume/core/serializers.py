from rest_framework import serializers

from .models import (
    Education,
    Experience,
    ExperienceBullet,
    ExpertiseGroup,
    ExpertiseItem,
    Profile,
    Project,
    ProjectBullet,
)


class ExpertiseItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpertiseItem
        fields = ["id", "text"]


class ExpertiseGroupSerializer(serializers.ModelSerializer):
    items = ExpertiseItemSerializer(many=True, read_only=True)

    class Meta:
        model = ExpertiseGroup
        fields = ["id", "title", "icon", "items"]


class ExperienceBulletSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceBullet
        fields = ["id", "text"]


class ExperienceSerializer(serializers.ModelSerializer):
    bullets = ExperienceBulletSerializer(many=True, read_only=True)
    date = serializers.CharField(source="date_range")
    datePlaceholder = serializers.BooleanField(source="date_is_placeholder")
    current = serializers.BooleanField(source="is_current")

    class Meta:
        model = Experience
        fields = ["id", "role", "company", "date", "datePlaceholder", "current", "bullets"]


class ProjectBulletSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectBullet
        fields = ["id", "text"]


class ProjectSerializer(serializers.ModelSerializer):
    bullets = ProjectBulletSerializer(many=True, read_only=True)
    date = serializers.CharField(source="date_range")
    dateNote = serializers.BooleanField(source="date_is_placeholder")

    class Meta:
        model = Project
        fields = ["id", "title", "date", "dateNote", "bullets"]


class EducationSerializer(serializers.ModelSerializer):
    year = serializers.CharField()
    placeholder = serializers.BooleanField(source="year_is_placeholder")

    class Meta:
        model = Education
        fields = ["id", "name", "issuer", "year", "placeholder"]


class ProfileSerializer(serializers.ModelSerializer):
    """Top-level payload the React app fetches in one request."""

    expertise = ExpertiseGroupSerializer(source="expertise_groups", many=True, read_only=True)
    experience = ExperienceSerializer(many=True, read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)
    education = EducationSerializer(many=True, read_only=True)

    contact = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "id",
            "name",
            "title",
            "tagline",
            "summary",
            "contact",
            "expertise",
            "experience",
            "projects",
            "education",
        ]

    def get_contact(self, obj):
        return {
            "phone": {"value": obj.phone, "isPlaceholder": obj.phone_is_placeholder},
            "email": {"value": obj.email, "isPlaceholder": obj.email_is_placeholder},
            "location": {"value": obj.location, "isPlaceholder": obj.location_is_placeholder},
            "linkedin": {"value": obj.linkedin, "isPlaceholder": obj.linkedin_is_placeholder},
        }