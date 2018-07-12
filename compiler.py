import subprocess
import os

class Operation:

    __p = os.path.abspath("") + "/static"

    @staticmethod
    def run_compiler(lang):
        out = open(Operation.__p+"/out.txt","w")
        err = open(Operation.__p+"/err.txt","w")
        fin = open(Operation.__p+"/in.txt","r")
        rerr = open(Operation.__p+"/rerr.txt","w")
        run_err = ""
        p1 = Operation.__p + "/code"
        if lang == "py":
            path1 = Operation.__p + "/code.py"
            subprocess.call(["python",path1],stdout=out,stderr=err,stdin=fin)
        if lang == "cpp":
            path1 = Operation.__p + "/code.cpp"
            sr = subprocess.call(["g++",path1,"-o",p1],stderr=err)
            err.close()
            err = open(Operation.__p+"/err.txt","r")
            run_err = err.read()
            if run_err == "" :
                subprocess.call([p1],stdout=out,stderr=rerr,stdin=fin)
        if lang == "java":
            path1 = Operation.__p + "/code.java"
            subprocess.call(["javac",path1],stderr=err)
            subprocess.call(["java","-cp",p,"code"],stdout=out,stderr=rerr,stdin=fin)
        if lang == "c":
            path1 = Operation.__p + "/code.c"
            subprocess.call(["g++",path1,"-o",p1],stderr=err)
            err.close()
            err = open(Operation.__p+"/err.txt","r")
            run_err = err.read()
            if run_err == "" :
                subprocess.call([p1],stdout=out,stderr=rerr,stdin=fin)
        out.close()
        err.close()
        fin.close()
        rerr.close()
        rerr = open(Operation.__p+"/rerr.txt","r")
        err = open(Operation.__p+"/err.txt","r")
        compiling_err = ""
        compiling_err = err.read()
        run_err = ""
        run_err = rerr.read()
        if compiling_err == "" and run_err == "":
            return "Compiled Successfully"
        if run_err == "" :
            return "Compilation Error"
        return "Runtime Error"

    @staticmethod
    def check_ac():
        f1 = open(Operation.__p+"/out.txt","r")
        f2 = open(Operation.__p+"/output.txt","r")
        count = 0
        for line1 in f2 :
            if line1 == f1.readline() :
                count+=1
        return count

    @staticmethod
    def show_compilation_err(compiled):
        if compiled == "Compilation Error" :
            err = open(Operation.__p+"/err.txt","r")
        else :
            err = open(Operation.__p+"/rerr.txt","r")
        return err.read()
Operation.check_ac();
