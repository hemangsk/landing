import json
import os
import subprocess
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse

env = dict(os.environ, **{'PYTHONUNBUFFERED':'1'})

def run_command(cmd):
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE,
                         stderr=subprocess.PIPE,
                         stdin=subprocess.PIPE, env=env)
    out, err = p.communicate()
    return out

@csrf_exempt
@require_http_methods([ "GET" , "POST"])
def home(request):
    if request.method == "GET" :
        cmd = ["coala", "--json", "-o", "data.json", "--show-bears"]
        run_command(cmd)
        res = {}
        with open('data.json') as json_data:
            bear_json = json.load(json_data)
            for bear in bear_json["bears"]:
                bear_desc = bear["metadata"]["desc"]
                bear_languages = bear["LANGUAGES"]
                res[bear["name"]] = {"desc": bear_desc,
                                     "languages": bear_languages}
            return JsonResponse(res)


@csrf_exempt
@require_http_methods(["GET", "POST"])
def search(request):
    if request.method == "GET":
        bear_query = request.GET['bear']
        print(bear_query)
        cmd = ["coala", "--json", "-o", "data.json", "--show-bears"]
        run_command(cmd)
        with open('data.json') as json_data:
            bear_data = json.load(json_data)
            for bear in bear_data["bears"]:
                if (bear["name"] == bear_query):
                    return JsonResponse(bear)
