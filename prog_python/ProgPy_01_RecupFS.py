##################################################################################
# import des divers modules utiles
import ProgPy_00_Imports as imp
from ProgPy_00_Imports import URL, dateJour

import pandas as pd
pd.set_option('display.max_colwidth', 50)

##################################################################################

response = imp.requests.get(URL, verify=False, timeout=10)
# print(type(response))
# print(response)
page_index = response.content
# print(type(page_index))
# print(page_index)

print("\ndébut parcours de la page...\n")

soup = imp.BeautifulSoup(page_index, 'html.parser')
list_result = list(soup.find_all(['th','td']))
# print(list_result[0:12])
# print(type(list_result[0]))
# print()
# modification de chaque élément de la liste pour passage type bs4.element.tag -> string
list_result = [str(element) for element in list_result]
# print(list_result[0:12])
# print(type(list_result[0]))
# print()
# list_result = list_result[0:12]

# suppression de quelques patterns
imp.simplifList(list_result)
print(list_result[0:12])

nbline_listresult = divmod(len(list_result),4)[0]
reste_listresult = divmod(len(list_result),4)[1]
print("\ndivision du nombre element par groupe de 4 : \n" +
      "nbre element de la liste : " + str(len(list_result)) + "\n" +
      "nbre de lignes : " + str(nbline_listresult) + "\n" +
      "reste de la division par 4 : " + str(reste_listresult) + "\n")

# création de la liste 
line = 0
df_line = []
for i in range(nbline_listresult-1): #-1 car la dernière ligne est vide
    df_line.append(list_result[line:line+4])
    line+=4
# print(df_line)

df_listFS = pd.DataFrame(df_line, columns=[df_line[0]])
df_listFS = df_listFS[1:]
df_listFS.reset_index(drop=True, inplace=True)

print("contenu du dataframe df_listFS...\n" + 
      "format (nb_ligne, nb_colonne)-> "+str(df_listFS.shape) + "\n")
print(df_listFS.head())
# print(df_listFS[30:35])
# print(df_listFS.tail())
print()
# print("ligne 0 par cellule")
# print(df_listFS.iloc[0,0])
# print(df_listFS.iloc[0,1])
# print(df_listFS.iloc[0,2])
# print(df_listFS.iloc[0,3])

##################################################################################
##################################################################################
# sauvegarde intermédiaire PARTIE A
df_listFS.to_csv('../dataframe/df_listFS_A.csv', sep=';', index=False)
df_listFS = pd.read_csv("../dataframe/df_listFS_A.csv",sep=";")
##################################################################################
##################################################################################

df_listFS['lienURL'] = df_listFS['Vserver'].str.replace('<a href="index.php?','')
df_listFS['finlienURL'] = df_listFS['lienURL'].str.find('>') # on obtient l'endroit du 1er >

# modification ligne après ligne pour uniquement obtenir l'intérieur de la balise <a>...</a>
for lg in range(len(df_listFS)):
    df_listFS.loc[lg,'URL_light'] = df_listFS.loc[lg,'lienURL'][:df_listFS.loc[lg,'finlienURL']-1]
# print(df_listFS['URL_light'].head())

# df_listFS['lienURL_final'] = df_listFS['lienURL'].str[:76]
# print("essai..")
# print(df_listFS[['lienURL','finlienURL','URL_light']])

# print("essai 2...")
# print(df_listFS.loc[30:35,['lienURL','finlienURL','URL_light']])
# print(type(df_listFS['finlienURL'][0]))

# suppression des colonnes devenues inutiles et reordonnancement
df_listFS = df_listFS.drop(columns=['Vserver','lienURL','finlienURL'])
df_listFS = df_listFS[['URL_light','Volume','Capacite','Utilise']]

##################################################################################
##################################################################################
# sauvegarde intermédiaire PARTIE B
df_listFS.to_csv('../dataframe/df_listFS_B.csv', sep=';', index=False)
df_listFS = pd.read_csv("../dataframe/df_listFS_B.csv",sep=";")
##################################################################################
##################################################################################

imp.creaVar(df_listFS)
imp.separVolUnite(df_listFS)
imp.transfoUnite(df_listFS)

# print(df_listFS['env'])

# df_listFS['env'] = df_listFS['Volume'].str.slice(4,6)
# print(df_listFS['env'])
# df_listFS['quartier'] = df_listFS['Volume'].str.slice(6,13)
# print(df_listFS['quartier'])
# df_listFS['dc'] = df_listFS['Volume'].str.slice(13,15)
# print(df_listFS['dc'])
# df_listFS['zone'] = df_listFS['Volume'].str.slice(16,18)
# print(df_listFS['zone'])
# df_listFS['type'] = df_listFS['Volume'].str.slice(19,25)
# print(df_listFS['type'])

# Fonction pourcentage - Version 1
# for lg in range(len(df_listFS)):
#     df_listFS.loc[lg,"Use%"] = round(
#         float(df_listFS.loc[lg,"Use"]) / float(df_listFS.loc[lg,'Cap']) * 100,2)
# Fonction pourcentage - Version 2
# def pourcentage(line):
#     return round(float(line['Use']) / float(line['Cap']) * 100,2)
# df_listFS['Use%'] = df_listFS.apply(pourcentage, axis=1)

# Fonction pourcentage - Version 3 (mis dans ProgPy_00_imports)
# def pourcentage(line,Num,Denom):
#     return round(float(line[Num]) / float(line[Denom]) * 100,2)
df_listFS['Use%'] = df_listFS.apply(imp.pourcentage, axis=1, args=('Use','Cap'))

df_listFS = df_listFS.drop(columns=['Capacite','CapUnite','Utilise','UseUnite'])

print(df_listFS[1:11][['Cap','Use','Use%']])
print()

# reordonnancement et renommage des colonnes
df_listFS = df_listFS[['URL_light','Volume','env','quartier','dc','zone','type','Cap','Use','Use%']]
df_listFS.rename(columns={'Cap': 'CapFS', 'Use': 'UseFS'}, inplace=True)

# retrait des lignes de type test | aus puis tri selon plusieurs colonnes
df_listFS = df_listFS[~df_listFS['Volume'].str.contains("test")]
df_listFS = df_listFS[~df_listFS['Volume'].str.contains("aus_COM|aus_DEP|aus_ECH|" \
                                                        "aus_ESP_U|aus_ESP_Z|" \
                                                        "aus_GEN|aus_HAB|aus_POL|" \
                                                        "aus_RFS|aus_VER")]
df_listFS.reset_index(drop=True, inplace=True)

df_listFS = df_listFS.sort_values(by=['env','quartier','dc','zone','type'], 
                                  ascending=[True,True,True,True,True])

##################################################################################
##################################################################################
# sauvegarde intermédiaire PARTIE C
df_listFS.to_csv("../dataframe/df_listFS_C.csv", sep=';', index=False)
df_listFS = pd.read_csv("../dataframe/df_listFS_C.csv",sep=";")
##################################################################################
##################################################################################


##################################################################################
##################################################################################
df_listFS_historique = df_listFS.drop(columns=['URL_light','Volume'])
# sauvegarde historique
df_listFS_historique.to_csv("../dataframe/historique/df_listFS_"+dateJour+".csv", sep=';', index=False)
df_listFS_historique = pd.read_csv("../dataframe/historique/df_listFS_"+dateJour+".csv",sep=";")
##################################################################################
##################################################################################

# BROUILLON...
# pour trier selon un ordre selon plusieurs colonnes...
# df_listFS = df_listFS.sort_values(by=['quartier','dc','zone'], ascending=[True,True,False])

# pour trouver les lignes en doublons
# doublon_ligne = df_listFS[df_listFS.duplicated()]
# print("Lignes en doublons")
# doublon_ligne.to_csv('DoublonLigne.csv', sep=';', index=False)
# df_scrape_niv0.drop_duplicates(inplace=True)
