from flask import Flask, render_template, jsonify, request
from flask_restful import Resource, Api
from compiler import Operation
from writer import Writer
from pymongo import MongoClient
import pprint

app = Flask('blindcode_webapp',static_url_path=None, static_folder='static', static_host=None)
api = Api(app)
client = MongoClient()
db = client.blindcode
users = db.users

@app.route('/')
def profile():
    return render_template('index.html')

@app.route('/main')
def main():
    return render_template('main.html')

class Submit(Resource):
    def post(self):
        ret = request.get_json()
        ret["score"]=0;
        Writer.write_code(ret["lang"],ret["codestr"])
        ret["status"] = Operation.run_compiler(ret['lang'])
        if ret["status"] == "Compiled Successfully" :
            ret["testpass"] = Operation.check_ac()
            if ret["testpass"] == 0:
                ret["msg"] = "Wrong Answer"
            else:
                ret["msg"] = "Accepted"
                ret["score"] += int(ret["timeleft"])/5
                ret["score"] += 10*ret["testpass"]
            ret["score"] += 20
        else :
            ret["msg"] = Operation.show_compilation_err(ret["status"])
        user_id = users.insert_one(ret).inserted_id
        pprint.pprint(users.find_one())
        return ret

api.add_resource(Submit,"/submit")

if __name__ == "__main__":
    app.run(debug=True)
