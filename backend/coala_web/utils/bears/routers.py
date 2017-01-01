from rest_framework import routers
from utils.bears.viewsets import BearViewSet, AllBearsViewSet

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'bears', AllBearsViewSet)