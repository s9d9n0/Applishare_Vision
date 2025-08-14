##################################################################################
# import des divers modules utiles
from ProgPy_00_Imports import requests, URL_Oscar

from pprint import pprint

import pandas as pd
pd.set_option('display.max_colwidth', 50)

##################################################################################

response = requests.get(URL_Oscar, verify=False, timeout=10)
# print(type(response))
# print(response)
# page_index = response.content
# print(type(page_index))
# print(page_index)

# utilisation de la fonction .json()
page_index = response.json()
# print(type(page_index))
# pprint(page_index)

# df = pd.DataFrame(page_index)
# print(df)
# probleme des info "nested" sur plusieurs niveaux -> utilisation de la fonction json_normalize
# df = pd.DataFrame(page_index)['domaineFonctionnel'].apply(pd.Series)
# print(df)
# df.to_csv('df_Oscar.csv', sep=';', index=False)

df_Oscar = pd.json_normalize(page_index)
# sélection des colonnes, renommages, simplification ...
df_Oscar = df_Oscar[['nom','balfMaintenanceInformatique', 
                    'quartier.code', 'domaineSndi.nom',
                    'departement.direction.code',
                    'departement.code','departement.libelle',
                    'domaineFonctionnel.nom']]
df_Oscar.rename(columns={'balfMaintenanceInformatique': 'balf',
                        'quartier.code': 'cod_quartier',
                        'domaineSndi.nom': 'sndi_domaine',
                        'departement.direction.code': 'cod_dir_dep',
                        'departement.code': 'cod_dep',
                        'departement.libelle': 'lib_dep',
                        'domaineFonctionnel.nom': 'dom_fonc'}, inplace=True)

# simplification libellé des colonnes lib_dep et dom_fonc
df_Oscar['lib_dep'] = df_Oscar['lib_dep'].str.replace('Département','Dep.')
df_Oscar['lib_dep'] = df_Oscar['lib_dep'].str.replace('de la |de l\'','',regex=True)
df_Oscar['dom_fonc'] = df_Oscar['dom_fonc'].str.replace('Répertoires','Rep.')
df_Oscar['dom_fonc'] = df_Oscar['dom_fonc'].str.replace('Statistiques','Stat.')
df_Oscar['sndi_domaine'] = df_Oscar['sndi_domaine'].str.replace('Statistiques','Stat.')
df_Oscar['lib_dep'] = df_Oscar['lib_dep'].str.replace('statistiques','stat.')
df_Oscar['lib_dep'] = df_Oscar['lib_dep'].str.replace('Conseil National Information Statistique','CNIS')

# print(df_Oscar)

df_Oscar.to_csv('../dataframe/df_Oscar.csv', sep=';', index=False)

print("")
print("Récupération informations Oscar OK")
print("")
