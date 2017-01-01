from django.db import models
import json


class Bear(models.Model):
    name = models.CharField(max_length=250)
    desc = models.TextField()
    languages = models.TextField()


    def set_languages(self, languages_array):
        self.languages = json.dumps(languages_array)

    def get_languages(self):
        return json.loads(self.languages)