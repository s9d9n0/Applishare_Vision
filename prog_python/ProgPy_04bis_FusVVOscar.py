##################################################################################
# import des divers modules utiles
import ProgPy_00_Imports as imp
from ProgPy_00_Imports import dateJour

import pandas as pd
pd.set_option('display.max_colwidth', 50)

##################################################################################
 
df_Oscar = pd.read_csv('../dataframe/df_Oscar.csv', sep=';')

# limitation à quelques colonnes plus recodifications pônctuelles...
df_Oscar = df_Oscar[['nom','cod_quartier','sndi_domaine','cod_dir_dep','cod_dep']]
df_Oscar['nom'] = df_Oscar['nom'].str.lower()
for lg in range(len(df_Oscar)):
    if df_Oscar.loc[lg,'nom']=="capi - poste de gestion":
        df_Oscar.loc[lg,'nom'] = "capi"
    if df_Oscar.loc[lg,'nom']=="census21":
        df_Oscar.loc[lg,'nom'] = "census"
    if df_Oscar.loc[lg,'nom']=="edlmeta":
        df_Oscar.loc[lg,'nom'] = "edl"
    if df_Oscar.loc[lg,'nom']=="odicbatch":
        df_Oscar.loc[lg,'nom'] = "odic"
    if df_Oscar.loc[lg,'nom']=="p7cms":
        df_Oscar.loc[lg,'nom'] = "p7"


df_VV = pd.read_csv("../dataframe/df_listVV.csv",sep=";")

# détection du dernier "_" ligne après ligne pour extraction de la partie nom
for lg in range(len(df_VV)):
    df_VV.loc[lg,'inverse'] = df_VV.loc[lg,'Application'][::-1]
    df_VV.loc[lg,'longueur'] = len(df_VV.loc[lg,'Application'])
    df_VV.loc[lg,'dernier_'] = df_VV.loc[lg,'inverse'].find('_')
    df_VV.loc[lg,"nom"] = df_VV.loc[lg,'Application'][:int(df_VV.loc[lg,'longueur']-df_VV.loc[lg,'dernier_']-1)]
    # modifications supplémentaires afin d'obtenir un meilleur merging avec le df_Oscar
    if list(filter(lambda x: df_VV.loc[lg,"nom"][0:4] in x, ["brpp"])): # pour permettre de relier brpp2, brppws à brpp
        df_VV.loc[lg,"nom"] = "brpp"
    if list(filter(lambda x: df_VV.loc[lg,"nom"][0:4] in x, ["capi"])): # pour permettre de relier capi3g à capi
        df_VV.loc[lg,"nom"] = "capi"
    if list(filter(lambda x: df_VV.loc[lg,"nom"][0:6] in x, ["census"])): # pour permettre de relier censushub à census
        df_VV.loc[lg,"nom"] = "census" 
    if list(filter(lambda x: df_VV.loc[lg,"nom"][0:4] in x, ["rmes","rmsr"])): # rmsr pour permettre de relier rmsrdfi à rmes
        df_VV.loc[lg,"nom"] = "rmes"
    if list(filter(lambda x: df_VV.loc[lg,"nom"][0:8] in x, ["wspegase"])): # pour permettre de relier wspegase à pegase
        df_VV.loc[lg,"nom"] = "pegase"




df_VV.drop(['inverse','longueur','dernier_'], axis="columns", inplace=True)


df_Vue = df_VV
df_Vue.to_csv('../dataframe/df_listVUE.csv', sep=';', index=False)



print(df_VV.head(20))



df_VVOscar = pd.merge(df_VV,df_Oscar, on="nom", how="left")
df_VVOscar = df_VVOscar.fillna("")
df_VVOscar.reset_index(drop=True, inplace=True)

print(df_VVOscar)

df_Vue = df_VVOscar[(df_VVOscar['quartier']!=df_VVOscar['cod_quartier']) & (df_VVOscar['cod_quartier']!="")]
print(df_Vue)

df_Vue2 = pd.merge(df_VV,df_Oscar, on="nom", how="outer")
df_Vue2 = df_Vue2.fillna("")
df_Vue2.reset_index(drop=True, inplace=True)

##########################
# sauvegarde intermédiaire
df_Vue.to_csv('../dataframe/df_listVVOscar_incoherences.csv', sep=';', index=False)
df_Vue2.to_csv('../dataframe/df_listVVOscar_unmatches.csv', sep=';', index=False)


df_VVOscar.to_csv('../dataframe/df_listVVOscar.csv', sep=';', index=False)
df_VVOscar = pd.read_csv("../dataframe/df_listVVOscar.csv",sep=";")


