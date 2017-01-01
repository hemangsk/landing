from rest_framework import serializers
from bears.models import Bear


class AllBearsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bear
        fields = 'desc, name, languages'


class BearSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bear
        fields = '__all__'