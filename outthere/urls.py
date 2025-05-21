"""
URL configuration for outthere project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from standards.views import home,standards, standards_results

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", home, name="home"),
    path("standards/", standards, name="standards"),
    path("standards/results/<str:gender>/<str:state>/<int:lower_age>/<int:higher_age>/<int:min_income>/<str:race>/<int:min_height>/<int:max_height>/<str:education>/<str:politics>/", standards_results, name="standards_results"),
]
