import pandas as pd
df = pd.read_json(r'zh-CN.json')
df.to_csv(r'zh-CN.csv', index = None)
df.to_excel(r'zh-CN.xlsx')