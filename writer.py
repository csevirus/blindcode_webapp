import os

class Writer:

    __filename = os.path.abspath("") + "/static/code."

    @staticmethod
    def write_code(lang,code):
        fin = open(Writer.__filename+lang,"w")
        fin.write(code)
        fin.close()
