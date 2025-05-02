##################################################################################
# import des divers modules utiles
from ProgPy_00_Imports import URL

import pandas as pd
pd.set_option('display.max_colwidth', 50)

##################################################################################

df_listFS = pd.read_csv("../dataframe/df_listFS_C.csv",sep=";")

df_listURL = df_listFS[['URL_light','Volume']].copy()
# print(type(df_listURL))
# print(df_listURL.columns.tolist())
# print(df_listURL[5:16][['URL_light']])

df_listURL['URL_light'] = df_listURL['URL_light'].str.replace('&amp;','&',regex=False)

# modification ligne après ligne pour création chemin URL des pages VV
for lg in range(len(df_listURL)):
    df_listURL.loc[lg,'URL_heavy'] = URL + '?' + df_listURL.loc[lg,'URL_light'] + '&qtree=' + df_listURL.loc[lg,'Volume']

# print(df_listURL.loc[2:5,'URL_heavy'])

#retrait des lignes contenant certains mots test, aus_ESP_U, aus_ESP_Z, ...
# df_listURL = df_listURL[~df_listURL['Volume'].str.contains("aus_DEP|aus_ECH|aus_ESP_U|aus_ESP_Z|aus_HAB|aus_POL|aus_VER")]
df_listURL = df_listURL[~df_listURL['Volume'].str.contains("aus_ESP_U|aus_ESP_Z")]
df_listURL.reset_index(drop=True, inplace=True)
# print(df_listURL)

# suppression des colonnes devenues inutiles et reordonnancement
df_listURL = df_listURL.drop(columns=['URL_light','Volume'])

##################################################################################
##################################################################################
# sauvegarde intermédiaire
df_listURL.to_csv('../dataframe/df_listURL.csv', sep=';', index=False)
df_listURL = pd.read_csv("../dataframe/df_listURL.csv",sep=";")
##################################################################################
##################################################################################
