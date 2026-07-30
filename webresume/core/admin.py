from django.contrib import admin

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


class ExpertiseItemInline(admin.TabularInline):
    model = ExpertiseItem
    extra = 1


@admin.register(ExpertiseGroup)
class ExpertiseGroupAdmin(admin.ModelAdmin):
    list_display = ["title", "profile", "order"]
    inlines = [ExpertiseItemInline]


class ExperienceBulletInline(admin.TabularInline):
    model = ExperienceBullet
    extra = 1


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ["role", "company", "date_range", "is_current", "order"]
    inlines = [ExperienceBulletInline]


class ProjectBulletInline(admin.TabularInline):
    model = ProjectBullet
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "date_range", "order"]
    inlines = [ProjectBulletInline]


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ["name", "issuer", "year", "order"]


class ExpertiseGroupInline(admin.StackedInline):
    model = ExpertiseGroup
    extra = 0
    show_change_link = True


class ExperienceInline(admin.StackedInline):
    model = Experience
    extra = 0
    show_change_link = True


class ProjectInline(admin.StackedInline):
    model = Project
    extra = 0
    show_change_link = True


class EducationInline(admin.TabularInline):
    model = Education
    extra = 0


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["name", "title", "email"]
    inlines = [ExpertiseGroupInline, ExperienceInline, ProjectInline, EducationInline]