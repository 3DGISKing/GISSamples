# coding=utf-8

import re
import math
from imp_lexer import *
from combinators import *
from imp_ast import *


# Basic parsers
def keyword(kw):
    return Reserved(kw, RESERVED)

def process_latlng(latlng):
    body = re.search(r"[0-9]+\.[0-9]+", latlng).group(0)

    value = float(body)

    degree = value / 10000
    degree = math.floor(degree)

    value = value % 10000

    minute = value / 100
    minute = math.floor(minute)

    second = value % 100

    value = degree + minute / 60.0 + second / 3600.0

    if latlng.endswith("N"):
        value = value
    elif latlng.endswith("S"):
        value = -value
    elif latlng.endswith("E"):
        value = value
    elif latlng.endswith("W"):
        value = -value
    else:
        raise RuntimeError('incorrect latlng string')

    return value


latlng = Tag(LATLNG) ^ process_latlng

def process_latlngDMS(dms):
    degree = re.search(r"[0-9]+\s*degree", dms).group(0)
    degree = re.search(r'[0-9]+', degree).group(0)
    degree = float(degree)

    minute = re.search(r"[0-9]+\s*'", dms).group(0)
    minute = re.search(r'[0-9]+', minute).group(0)
    minute = float(minute)

    second = re.search(r"[0-9]+[\.]*[0-9]*\s*''", dms).group(0)
    second = re.search(r'[0-9]+[\.]*[0-9]*\s*', second).group(0)
    second = float(second)

    value = degree + minute/60.0 + second/3600.0

    if dms.endswith("N"):
        value = value
    elif dms.endswith("S"):
        value = -value
    elif dms.endswith("E"):
        value = value
    elif dms.endswith("W"):
        value = -value
    else:
        raise RuntimeError('incorrect latlng string')

    return value

latlngDMS = Tag(LATLNGDMS) ^ process_latlngDMS

def latlongparser():
    return latlng|latlngDMS

def process_number(number):
    return float(number)

number = Tag(NUMBER) ^ process_number

def process_direction(direction):
    if direction == "clockwise":
        return 1
    elif direction == "counter-clockwise":
        return -1
    else:
        raise RuntimeError('invalid direction string')

direction = Tag(DIRECTION) ^ process_direction

# Top level parser
def imp_parse(tokens):
    top_level_parser = parser()
    ast = top_level_parser(tokens, 0)
    return ast

def parser():
    return Phrase(stmt_list())

def stmt_list():
    return Exp(stmt(), (lambda l, r: CompoundStatement(l, r)))

def latlng_stmt_list():
    return Exp(latlng_stmt(), (lambda l, r: CompoundStatement(l, r)))

# Statements

def stmt():
    return  arc_stmt() | \
            then_arc_stmt() | \
            then_to_stmt() | \
            polygon_stmt() | \
            circle_stmt() | \
            latlng_stmt()


def arc_stmt():
    def process(parsed):
        ((((((((((((_, fromlat), fromlng), _), direction), _), _), tolat), tolng), _), _), centerlat), centerlng) = parsed
        return ArcStatement(fromlat, fromlng, tolat, tolng, centerlat, centerlng, direction)
    return  keyword('from') + latlongparser() + latlongparser() + keyword('along') + direction + keyword('arc') + keyword('to') + latlongparser() + latlongparser() + keyword('centered') + keyword('at') + latlongparser() + latlongparser() ^ process

def then_arc_stmt():
    def process(parsed):
        ((((((((((_, _), direction), _), _), tolat), tolng), _), _), centerlat), centerlng) = parsed
        return ThenArcStatment(tolat, tolng, centerlat, centerlng, direction)

    return keyword('then') + keyword('along') + direction + keyword('arc') + keyword('to') + latlongparser() + latlongparser() + keyword('centered') + keyword('at') + latlongparser() + latlongparser() ^ process

def then_to_stmt():
    def process(parsed):
        (((_, _), lat), lng) = parsed
        return ThenToStatment(lat, lng)

    return keyword('then') + keyword('to') + latlongparser() + latlongparser() ^ process

def latlng_stmt():
    def process(parsed):
        (lat, lng) = parsed
        return LatLngStatment(lat, lng)

    return latlongparser() + latlongparser() ^ process

def polygon_stmt():
    def process(parsed):
        (_, stmt) = parsed
        direction = 1
        return PolygonStatment(stmt, direction)
    return keyword('polygon') + Lazy(latlng_stmt_list) ^ process

def circle_stmt():
    def process(parsed):
        (((((((_, _), _), centerlat), centerlng), _), radius), unit) = parsed

        direction = 1
        return CircleStatment(centerlat, centerlng, radius, direction, unit)
    return keyword('circle') + keyword('centered') + keyword('at') + latlongparser() + latlongparser() + keyword('radius') + number + keyword('NM') ^ process



