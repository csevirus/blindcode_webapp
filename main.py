from flask import Flask, render_template, jsonify, request
from flask_restful import Resource, Api
from compiler import Operation
from writer import Writer

app = Flask('blindcode_webapp',static_url_path=None, static_folder='static', static_host=None)
api = Api(app)

@app.route('/')
def profile():
    return render_template('index.html')

@app.route('/main')
def main():
    return render_template('main.html')

class Submit(Resource):
    def post(self):
        json = request.get_json()
        ret = {"status":"","message":"","testpass":0}
        Writer.write_code(json["lang"],json["codestr"])
        ret["status"] = Operation.run_compiler(json['lang'])
        if ret["status"] == "Compiled Successfully" :
            ret["testpass"] = Operation.check_ac()
            if ret["testpass"] == 0:
                ret["message"] = "Wrong Answer"
            else:
                ret["message"] = "Accepted"
        else :
            ret["message"] = Operation.show_compilation_err(ret["status"])
        return ret

api.add_resource(Submit,"/submit")

if __name__ == "__main__":
    app.run(debug=True)
