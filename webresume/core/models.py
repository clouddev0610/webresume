from django.db import models


class Profile(models.Model):
    """The one resume owner's headline info."""

    name = models.CharField(max_length=120)
    title = models.CharField(max_length=120)
    tagline = models.TextField(blank=True)
    summary = models.TextField()

    phone = models.CharField(max_length=40, blank=True)
    phone_is_placeholder = models.BooleanField(default=False)
    email = models.EmailField(blank=True)
    email_is_placeholder = models.BooleanField(default=False)
    location = models.CharField(max_length=120, blank=True)
    location_is_placeholder = models.BooleanField(default=False)
    linkedin = models.CharField(max_length=200, blank=True)
    linkedin_is_placeholder = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class ExpertiseGroup(models.Model):
    profile = models.ForeignKey(Profile, related_name="expertise_groups", on_delete=models.CASCADE)
    title = models.CharField(max_length=80)
    icon = models.CharField(
        max_length=40,
        default="Server",
        help_text="lucide-react icon name, e.g. Server, ShieldCheck, Cloud, Cpu",
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class ExpertiseItem(models.Model):
    group = models.ForeignKey(ExpertiseGroup, related_name="items", on_delete=models.CASCADE)
    text = models.CharField(max_length=160)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.text


class Experience(models.Model):
    profile = models.ForeignKey(Profile, related_name="experience", on_delete=models.CASCADE)
    role = models.CharField(max_length=140)
    company = models.CharField(max_length=140)
    date_range = models.CharField(max_length=80)
    date_is_placeholder = models.BooleanField(default=False)
    is_current = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.role} @ {self.company}"


class ExperienceBullet(models.Model):
    experience = models.ForeignKey(Experience, related_name="bullets", on_delete=models.CASCADE)
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.text[:60]


class Project(models.Model):
    profile = models.ForeignKey(Profile, related_name="projects", on_delete=models.CASCADE)
    title = models.CharField(max_length=140)
    date_range = models.CharField(max_length=80)
    date_is_placeholder = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class ProjectBullet(models.Model):
    project = models.ForeignKey(Project, related_name="bullets", on_delete=models.CASCADE)
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.text[:60]


class Education(models.Model):
    profile = models.ForeignKey(Profile, related_name="education", on_delete=models.CASCADE)
    name = models.CharField(max_length=160)
    issuer = models.CharField(max_length=140)
    year = models.CharField(max_length=40)
    year_is_placeholder = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name
