
from shutil import rmtree
from os import mkdir,getcwd
from pandas import read_csv

rmtree("json")
mkdir("json")

# lecture des dataframes puis transformation en JSON...
json_df_listFS = read_csv("./dataframe/df_listFS_C.csv",sep=";").to_json(orient="records")
# print(json_df_listFS)
with open(getcwd() + "/json/df_listFS.json", "w") as outfile:
    outfile.write(json_df_listFS)

json_df_listVV = read_csv("./dataframe/df_listVV.csv",sep=";")[:].to_json(orient="records")
# print(json_df_listVV)
with open(getcwd() + "/json/df_listVV.json", "w") as outfile:
    outfile.write(json_df_listVV)

json_df_fusion = read_csv("./dataframe/df_fusion.csv",sep=";").to_json(orient="records")
# print(json_df_fusion)
with open(getcwd() + "/json/df_fusion.json", "w") as outfile:
    outfile.write(json_df_fusion)

print()
print("...Création des fichiers Json")
