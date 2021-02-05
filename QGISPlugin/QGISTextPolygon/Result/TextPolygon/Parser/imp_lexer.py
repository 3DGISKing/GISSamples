# coding=utf-8

import lexer

RESERVED = 'RESERVED'
INT = 'INT'
ID = 'ID'
LATLNG = 'LATLNG'
LATLNGDMS = 'LATLNGDMS'
DIRECTION = 'DIRECTION'
NUMBER = 'NUMBER'

token_exprs = [
    (r'[ \n\t]+',              None),
    (r'#[^\n]*',               None),

    # ARC Command
    (r'arc',                   RESERVED),
    (r'from',                  RESERVED),
    (r'along',                 RESERVED),
    (r'clockwise',             DIRECTION),
    (r'counter-clockwise',     DIRECTION),
    (r'to',                    RESERVED),
    (r'centered',              RESERVED),
    (r'at',                    RESERVED),

    # then to
    (r'then',                  RESERVED),
    (r'to',                    RESERVED),
    (r'polygon',               RESERVED),
    (r'circle',                RESERVED),
    (r'radius',                RESERVED),
    (r'NM',                    RESERVED),
    (r"[0-9]+\s*degree\s*[0-9]+\s*'\s*[0-9]+[\.]*[0-9]*\s*''\s*[NESW]", LATLNGDMS),
    (r'[0-9]+\.[0-9]+[NSEW]',  LATLNG),
    (r'[0-9]+[\.]*[0-9]*',     NUMBER),
]

def imp_lex(characters):
    return lexer.lex(characters, token_exprs)