from django.core.management.base import BaseCommand
from django.db import transaction

from core.models import (
    Education,
    Experience,
    ExperienceBullet,
    ExpertiseGroup,
    ExpertiseItem,
    Profile,
    Project,
    ProjectBullet,
)

SUMMARY = (
    "Systems Analyst and Infrastructure Engineer with 5+ years of experience designing, "
    "implementing, and supporting enterprise infrastructure across manufacturing, healthcare, "
    "defense, and cloud environments. Skilled in systems administration, network architecture, "
    "cybersecurity, operational technology (OT), cloud platforms, virtualization, and software "
    "development. Experienced with Active Directory, Azure AD, SCCM, server infrastructure, and "
    "enterprise technologies, with hands-on expertise in PowerShell, Bash, and Python automation. "
    "Proven ability to support Industry 4.0 initiatives, manufacturing operations, infrastructure "
    "modernization, and mission-critical environments while improving system reliability, "
    "security, uptime, and operational efficiency."
)

TAGLINE = (
    "Systems Analyst & Infrastructure Engineer with 5+ years across manufacturing, healthcare, "
    "defense, and cloud environments \u2014 keeping mission-critical systems online."
)

EXPERTISE = [
    ("Server", "Systems & Identity", [
        "Windows & Linux Systems Administration",
        "Active Directory & Azure Active Directory",
        "Hybrid Identity & Identity Management",
        "DNS & DHCP",
        "Virtualization & Desktop Infrastructure",
        "Linux Administration & Server Management",
        "System Troubleshooting",
    ]),
    ("ShieldCheck", "Networking & Security", [
        "Network Architecture & Cisco Networking",
        "TCP/IP, VLANs & Network Segmentation",
        "OT Networking & Network Security",
        "Wireless & VPN Technologies",
        "OT Cybersecurity & Secure Solution Design",
        "Endpoint & Physical Security",
        "Access Control Systems",
    ]),
    ("Cloud", "Cloud & Industry 4.0", [
        "AWS Cloud Infrastructure",
        "EC2, S3, Lambda, CloudFormation & CloudWatch",
        "Industry 4.0 & Smart Factory Technologies",
        "Manufacturing Systems & Industrial Automation",
        "Industrial Device Integration",
        "Ignition & HighByte",
    ]),
    ("Cpu", "Automation & Development", [
        "PowerShell, Python & Bash Scripting",
        "Infrastructure & Workflow Automation",
        "Automation Engineering",
        "C#, Django & SQL",
        "React Native & API Development",
    ]),
]

EXPERIENCE = [
    dict(
        role="Digital Technology Systems Analyst",
        company="Pierce Manufacturing",
        date_range="Dec 20XX \u2013 Present",
        date_is_placeholder=True,
        is_current=True,
        bullets=[
            "Support enterprise IT infrastructure across manufacturing, corporate, and Operational Technology (OT) environments, ensuring high system availability and operational continuity for production and business operations.",
            "Partner with manufacturing and engineering teams to improve fabrication equipment reliability by troubleshooting OT systems, implementing secure infrastructure solutions, and supporting Industry 4.0 initiatives that increase equipment uptime and production efficiency.",
            "Design, deploy, and maintain secure network infrastructure including switches, wireless networks, servers, storage, and enterprise applications while participating in new facility technology buildouts and infrastructure modernization projects.",
            "Implement secure solution designs for manufacturing equipment and OT devices through network segmentation, endpoint hardening, access control, and cybersecurity best practices.",
            "Analyze operational and manufacturing data to identify trends, improve system performance, reduce downtime, and support data-driven business decisions.",
            "Develop automation solutions using PowerShell, Python, and Bash scripting to streamline software deployments, system administration, and infrastructure upgrade processes.",
            "Administer and troubleshoot Windows workstations, laptops, iPhones, iPads, IP phones, printers, barcode and label printers, and other enterprise end-user technologies supporting daily manufacturing operations.",
        ],
    ),
    dict(
        role="IT Specialist",
        company="Advance Urology Institute",
        date_range="Dec 2023 \u2013 Jun 2024",
        date_is_placeholder=False,
        is_current=False,
        bullets=[
            "Supported enterprise IT operations across multiple healthcare facilities throughout Florida, improving infrastructure reliability and increasing system availability for physicians, clinical staff, and administrative teams.",
            "Increased facility uptime by troubleshooting, upgrading, and maintaining network infrastructure, including managed switches, wireless connectivity, server room equipment, and critical end-user technologies.",
            "Administered and supported eClinicalWorks (eCW) and Athenahealth EHR platforms, ensuring reliable access to patient records and minimizing disruptions to clinical workflows.",
            "Managed server room operations including equipment installation, hardware lifecycle management, server decommissioning, cable management, and infrastructure maintenance.",
            "Performed endpoint lifecycle management by staging, imaging, configuring, deploying, and supporting desktops, laptops, printers, and mobile devices across multiple care centers.",
            "Diagnosed and resolved hardware, software, operating system, network, and UPS-related issues through onsite and remote support, minimizing downtime and improving user satisfaction.",
            "Administered information security controls, supported compliance initiatives, and collaborated with IT leadership on infrastructure upgrades, technology refreshes, and strategic projects.",
            "Built strong relationships with physicians and staff by delivering dependable technical support that increased end-user trust, system reliability, and overall operational efficiency.",
        ],
    ),
    dict(
        role="Service Desk Analyst",
        company="Pole Star Global Defense",
        date_range="Jun 2022 \u2013 Dec 2023",
        date_is_placeholder=False,
        is_current=False,
        bullets=[
            "Delivered technical support for U.S. and foreign government clients, supporting mission-critical maritime security, navigation, and vessel tracking systems operating on domestic and international vessels.",
            "Monitored, maintained, and administered critical government maritime applications and systems, ensuring high availability and operational continuity for global maritime operations.",
            "Troubleshot, configured, and maintained maritime communication and access router infrastructure to ensure reliable vessel connectivity and secure remote communications.",
            "Deployed, monitored, and maintained cloud infrastructure hosted in AWS, including EC2 instances, utilizing AWS CloudWatch, CloudFormation, Athena, and related services to support production environments.",
            "Leveraged AWS CloudWatch and PRTG to monitor critical real-time data feeds, application performance, server health, and infrastructure availability, proactively identifying and resolving issues.",
            "Utilized Linux, PuTTY, and Remote Desktop Protocol (RDP) to remotely configure, troubleshoot, and maintain cloud servers, end-client systems, and production infrastructure.",
            "Troubleshot and maintained maritime navigation and tracking technologies including Automatic Identification System (AIS) and Long-Range Identification and Tracking (LRIT) equipment deployed aboard domestic and international vessels.",
            "Assisted in emergency maritime response operations by supporting critical vessel tracking systems and providing technical assistance during search and rescue events and other operational incidents.",
            "Managed customer accounts, support workflows, and case documentation utilizing Salesforce while maintaining service level objectives and customer satisfaction.",
            "Developed standard operating procedures (SOPs), technical documentation, and delivered training to internal staff to improve operational consistency and knowledge sharing.",
            "Managed incident, service request, and problem tickets, customer accounts, and support workflows through Salesforce, ensuring SLA compliance, accurate documentation, and exceptional customer service across government and commercial clients.",
        ],
    ),
    dict(
        role="Mobile Application Developer",
        company="Resilience Inc.",
        date_range="Jun 2022 \u2013 Dec 2023",
        date_is_placeholder=False,
        is_current=False,
        bullets=[
            "Led a team of four developers building Social Emotional Learning mobile applications, improving user experience metrics by 15% through technology research and implementation.",
            "Developed cross-platform mobile and web applications using React, Angular, Ionic, C#, ASP.NET, Java, Spring Boot, TypeScript, and SQL Server.",
            "Refactored legacy codebases to improve scalability and performance; delivered an e-commerce mobile app and a school management system from the ground up.",
        ],
    ),
]

PROJECTS = [
    dict(
        title="Enterprise Hybrid Identity Lab",
        date_range="2026",
        date_is_placeholder=False,
        bullets=[
            "Built an enterprise Active Directory environment utilizing Windows Server.",
            "Implemented hybrid identity architecture integrating on-premises Active Directory and cloud identity services.",
            "Configured DNS, DHCP, Group Policy, and organizational unit management.",
            "Developed secure network segmentation and access controls.",
            "Simulated enterprise infrastructure scenarios for systems engineering and cybersecurity training.",
        ],
    ),
    dict(
        title="Virtualized Infrastructure Platform",
        date_range="Jun 2022 \u2013 Dec 2023",
        date_is_placeholder=True,
        bullets=[
            "Designed and deployed multiple virtualized environments utilizing Windows Server and Ubuntu Server.",
            "Hosted infrastructure services, application services, and monitoring systems.",
            "Implemented backup, recovery, and disaster recovery testing procedures.",
            "Built isolated environments for software development, automation testing, and infrastructure validation.",
        ],
    ),
]

EDUCATION = [
    dict(name="Computer Science \u2014 Bachelor\u2019s Degree", issuer="Western Governors University", year="20XX \u2013 20XX", placeholder=True),
    dict(name="Computer Programming & Analysis", issuer="St. Petersburg College", year="20XX", placeholder=True),
    dict(name="Computer Programming Certification", issuer="St. Petersburg College", year="20XX", placeholder=True),
    dict(name="General Education", issuer="St. Petersburg College", year="20XX", placeholder=True),
    dict(name="A+ Certification", issuer="CompTIA", year="20XX", placeholder=True),
    dict(name="Security+ Certification", issuer="CompTIA", year="20XX", placeholder=True),
    dict(name="AWS Cloud Practitioner Certification", issuer="Amazon Web Services", year="20XX", placeholder=True),
    dict(name="Linux Foundations", issuer="Linux", year="20XX", placeholder=True),
]


class Command(BaseCommand):
    help = "Seed the database with resume content (idempotent: clears and re-creates)."

    @transaction.atomic
    def handle(self, *args, **options):
        Profile.objects.all().delete()

        profile = Profile.objects.create(
            name="Ny\u2019Queen Woodard",
            title="Systems Engineer",
            tagline=TAGLINE,
            summary=SUMMARY,
            phone="(___) ___-____",
            phone_is_placeholder=True,
            email="yourname@email.com",
            email_is_placeholder=True,
            location="City, State",
            location_is_placeholder=True,
            linkedin="linkedin.com/in/yourprofile",
            linkedin_is_placeholder=True,
        )

        for order, (icon, title, items) in enumerate(EXPERTISE):
            group = ExpertiseGroup.objects.create(profile=profile, title=title, icon=icon, order=order)
            for i_order, text in enumerate(items):
                ExpertiseItem.objects.create(group=group, text=text, order=i_order)

        for order, exp in enumerate(EXPERIENCE):
            exp = dict(exp)  # copy so we don't mutate the module-level constant on re-run
            bullets = exp.pop("bullets")
            experience = Experience.objects.create(profile=profile, order=order, **exp)
            for b_order, text in enumerate(bullets):
                ExperienceBullet.objects.create(experience=experience, text=text, order=b_order)

        for order, proj in enumerate(PROJECTS):
            proj = dict(proj)  # same reason
            bullets = proj.pop("bullets")
            project = Project.objects.create(profile=profile, order=order, **proj)
            for b_order, text in enumerate(bullets):
                ProjectBullet.objects.create(project=project, text=text, order=b_order)

        for order, edu in enumerate(EDUCATION):
            Education.objects.create(
                profile=profile,
                order=order,
                name=edu["name"],
                issuer=edu["issuer"],
                year=edu["year"],
                year_is_placeholder=edu["placeholder"],
            )

        self.stdout.write(self.style.SUCCESS(
            f"Seeded profile '{profile.name}' with "
            f"{profile.expertise_groups.count()} expertise groups, "
            f"{profile.experience.count()} experience entries, "
            f"{profile.projects.count()} projects, "
            f"{profile.education.count()} education entries."
        ))