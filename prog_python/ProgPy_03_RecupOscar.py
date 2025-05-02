##################################################################################
# import des divers modules utiles
from ProgPy_00_Imports import requests, URL_Oscar

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
# print(page_index)

# df = pd.DataFrame(page_index)
# print(df)
# probleme des info "nested" sur plusieurs niveaux -> utilisation de la fonction json_normalize
# df = pd.DataFrame(page_index)['domaineFonctionnel'].apply(pd.Series)
# print(df)
# df.to_csv('df_Oscar.csv', sep=';', index=False)

df_Oscar = pd.json_normalize(page_index)
# sélection des colonnes, renommages, simplification ...
df_Oscar = df_Oscar[['nomTechnique','balfMaintenanceInformatique', 
                     'quartier.code', 'domaineSndi.nom',
                     'departement.direction.code','departement.code','departement.libelle','domaineFonctionnel.nom']]
df_Oscar.rename(columns={'nomTechnique': 'nom', 'balfMaintenanceInformatique': 'balf',
                         'quartier.code': 'cod_quartier', 'domaineSndi.nom': 'sndi_domaine',
                         'departement.direction.code': 'cod_dir_dep',
                         'departement.code': 'cod_dep','departement.libelle': 'lib_dep',
                         'domaineFonctionnel.nom': 'domaineFonctionnel'}, inplace=True)

df_Oscar['lib_dep'] = df_Oscar['lib_dep'].str.replace('Département','Dep.')
df_Oscar['lib_dep'] = df_Oscar['lib_dep'].str.replace('de la |de l\'','',regex=True)
df_Oscar['domaineFonctionnel'] = df_Oscar['domaineFonctionnel'].str.replace('Répertoires','Rep.')
df_Oscar['domaineFonctionnel'] = df_Oscar['domaineFonctionnel'].str.replace('Statistiques','Stat.')

# print(df_Oscar)

df_Oscar.to_csv('../dataframe/df_Oscar.csv', sep=';', index=False)