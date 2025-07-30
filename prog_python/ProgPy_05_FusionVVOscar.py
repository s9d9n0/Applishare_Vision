##################################################################################
# import des divers modules utiles
import ProgPy_00_Imports as imp
from ProgPy_00_Imports import dateJour

import pandas as pd
pd.set_option('display.max_colwidth', 100)

##################################################################################
 
# récupération de la base Oscar, limitation à quelques colonnes puis recodifications pônctuelles...
df_Oscar = pd.read_csv('../dataframe/df_Oscar.csv', sep=';')

df_Oscar = df_Oscar[['nom','cod_quartier','sndi_domaine','cod_dir_dep','cod_dep']]
df_Oscar['nom'] = df_Oscar['nom'].str.lower()
for lg in range(len(df_Oscar)):
    if df_Oscar.loc[lg,'nom']=="capi - poste de gestion":
        df_Oscar.loc[lg,'nom'] = "capi"
    if df_Oscar.loc[lg,'nom']=="census21":
        df_Oscar.loc[lg,'nom'] = "census"
    # mise en commantaire des lignes ci-dessous afin d'éviter des doublons lors de la fusion
    # if df_Oscar.loc[lg,'nom']=="edlmeta":
    #     df_Oscar.loc[lg,'nom'] = "edl"
    # if df_Oscar.loc[lg,'nom']=="odicbatch":
    #     df_Oscar.loc[lg,'nom'] = "odic"
    # if df_Oscar.loc[lg,'nom']=="p7cms":
    #     df_Oscar.loc[lg,'nom'] = "p7"


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

print(df_VV.head(20))
print("")

# df_Vue = df_VV
# df_Vue.to_csv('../dataframe/df_listVUE.csv', sep=';', index=False)

# fusion entre les 2 dataframes...
df_VV_et_Oscar = pd.merge(df_VV,df_Oscar, on="nom", how="left")
df_VV_et_Oscar = df_VV_et_Oscar.fillna("n.d.")
df_VV_et_Oscar.reset_index(drop=True, inplace=True)


############################################
# pour visualiser les différences...
df_Vue = df_VV_et_Oscar[(df_VV_et_Oscar['quartier']!=df_VV_et_Oscar['cod_quartier']) & (df_VV_et_Oscar['cod_quartier']!="n.d.")]

df_Vue2 = pd.merge(df_VV,df_Oscar, on="nom", how="outer")
df_Vue2 = df_Vue2.fillna("n.d.")
df_Vue2.reset_index(drop=True, inplace=True)

df_Vue2_absVV    = df_Vue2[df_Vue2['Volume']=="n.d."]
df_Vue2_absOscar = df_Vue2[df_Vue2['cod_dep']=="n.d."]

df_Vue2 = pd.concat([df_Vue2_absVV,df_Vue2_absOscar])

############################################

# rearrangement de colonnes avec methode insert
df_VV_et_Oscar.insert(0, 'cod_dir_dep', df_VV_et_Oscar.pop('cod_dir_dep'))
df_VV_et_Oscar.insert(1, 'cod_dep', df_VV_et_Oscar.pop('cod_dep'))
df_VV_et_Oscar.insert(2, 'sndi_domaine', df_VV_et_Oscar.pop('sndi_domaine'))

df_VV_et_Oscar = df_VV_et_Oscar.drop(columns=['nom','cod_quartier'])
# df_VV_et_Oscar = df_VV_et_Oscar.drop(columns=['cod_quartier'])

print(df_VV_et_Oscar)

# df_doublons = df_VV_et_Oscar[df_VV_et_Oscar.duplicated()]
# print("doublons :")
# print(df_doublons.shape)
# print(df_doublons)
# print("")


##########################
# sauvegarde intermédiaire
df_Vue.to_csv('../dataframe/df_listVVOscar_incoherencesQuartier.csv', sep=';', index=False)
df_Vue2.to_csv('../dataframe/df_listVVOscar_unmatches.csv', sep=';', index=False)


# nouveau fichier df_listVV.csv en sortie avec les 3 colonnes issues d'Oscar au début
df_VV_et_Oscar.to_csv('../dataframe/df_listVVOscar.csv', sep=';', index=False)
df_VV_et_Oscar = pd.read_csv("../dataframe/df_listVVOscar.csv",sep=";")
##########################
