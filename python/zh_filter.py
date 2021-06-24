# -*- coding: utf-8 -*-
# @ description: 过滤vue项目指定文件夹中的所有中文字符串
# @ author: LeeO
# @ created: 2020/11/25

import io
import os
import re
import sys
import csv
import json
import importlib

importlib.reload(sys)

def translate(string):
    out = set()
    line = string.strip()  # 处理前进行相关的处理，包括转换成Unicode等
    slotList = subString(line)
    for slot in slotList:
        if u'\u4e00' <= slot <= u'\u9fff':
            out.add(slot)
    return out

# 获取指定字符串
def subString(string):
    rule = r'\'(.*?)\''
    slotList = re.findall(rule, string)
    return slotList

def extract_file(path):
    result = set()
    try:
        with open(path, 'r', encoding="utf-8") as f:
            lines = f.readlines()
        for line in lines:
            line = line.strip()
            head, sep, tail = line.partition('//')
            string = translate(head)
            if string:
                result.update(string)
    except Exception as e:
        pass
    return result


def extract(path):
    result = set()
    files = os.listdir(path)
    for file in files:
        print(file)
        if file == 'zh-CN.js':
            sub_file = extract_file(path + "/" + file)
            if sub_file:
                result.update(sub_file)
        elif os.path.isdir(path + "/" + file):
            child = extract(path + "/" + file)
            if child:
                result.update(child)
    return result


if __name__ == '__main__':
    path = "F:/EBR_V2.0/src/locale"
    result = extract(path)
    # 字符串
    res_file = open("E:/Demo/python/zh-CN.txt", "w", errors="ignore")
    text_group = open("E:/Demo/python/zh-CN-group.txt", "w", errors="ignore")
    text_long = open("E:/Demo/python/zh-CN-long.txt", "w", errors="ignore")
    result1 = sorted(result, key=lambda i: len(i), reverse=True)
    for s in result1:
        # newStr = s.replace(u'\xa9', u'')
        # res_file.write(newStr + "\n")
        if s.find('{') >= 0:
            text_group.write(s + '\n')
        elif len(s) > 4:
            text_long.write(s + '\n')
        else:
            res_file.write(s + "\n")
