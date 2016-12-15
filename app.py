from flask import Flask
from flask import render_template

app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
    return render_template('index.html')

# start the server with the 'run()' method
if __name__ == '__main__':
    app.run(debug=True)