from flask import Flask, Response, jsonify, request
from flask import render_template
import subprocess
import json

app = Flask(__name__, static_url_path='')


def run_command(cmd):
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE,
                         stderr=subprocess.PIPE,
                         stdin=subprocess.PIPE)
    out, err = p.communicate()
    return out


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/search/bears', methods=['GET'])
def search_bears():
    bear_query = request.args.get('bear')
    cmd = ["coala", "--json", "-o", "data.json", "--show-bears"]
    run_command(cmd)
    with open('data.json') as json_data:
        bear_data = json.load(json_data)
        for bear in bear_data["bears"]:
            if(bear["name"] == bear_query):
                return jsonify(**bear)
        return jsonify({"404": "Bear not found! Please recheck the bear name!"})


@app.route('/api/list/bears/')
def list_bears():
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
        return jsonify(**res)


if __name__ == '__main__':
    app.run(debug=True)
