# coding=utf-8
import sys
from imp_parser import *

if __name__ == '__main__':
    filename = "E:/test.txt"
    text = open(filename).read()
    tokens = imp_lex(text)

    parse_result = imp_parse(tokens)

    stmt_list = get_stmt_list(parse_result.value)

    pointlistlist = []

    for i, stmt in enumerate(stmt_list):
        stmt.run(pointlistlist)



    sys.stdout.write("program exited")



