import io
import os
import re
import sys
import csv
import json
import xlwt
import importlib

importlib.reload(sys)

if __name__ == '__main__':
    path = "D:/MES/zh.txt"
    result = set()
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()
        newLines1 = []
        newLines2 = []
        i = 1
        for line in lines:
            line = line.strip('\n')
            newLines1.append(line)
            newLines2.append(i)
            i = i + 1
        # excel
        workbook = xlwt.Workbook(encoding='utf-8')
        # 创建一个worksheet
        worksheet = workbook.add_sheet('sheet')
        x = 1  # 在第二行开始写
        y = 0  # 在第一列开始写
        xls = xlwt.Workbook()
        sheet = xls.add_sheet('sheet', cell_overwrite_ok=True)  # 生成excel的方法，声明excel

        for line in newLines1:
            sheet.write(0, 0, 'name')  # 在第一行第一列单元格写"name"
            sheet.write(x, y, line + '\n')  # x代表行，y代表列
            x += 1
        y += 1
        y = 0
        xls.save('D:/MES/zh.xls')  # 保存
