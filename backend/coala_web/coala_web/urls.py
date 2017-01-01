"""coala_web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import serializers, viewsets, routers
# Serializers define the API representation.
from bears.models import Bear


class BearSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bear
        fields = '__all__'

# ViewSets define the view behavior.
class BearViewSet(viewsets.ModelViewSet):
    queryset = Bear.objects.all()
    serializer_class = BearSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'bears', BearViewSet)



urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include(router.urls)),
]
