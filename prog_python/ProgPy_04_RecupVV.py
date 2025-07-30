##################################################################################
# import des divers modules utiles
import ProgPy_00_Imports as imp
from ProgPy_00_Imports import dateJour

import pandas as pd
pd.set_option('display.max_colwidth', 50)

##################################################################################

df_listURL = pd.read_csv("../dataframe/df_listURL.csv",sep=";")

#initialisation dataframe de résultat
# init = {'Volume': ['debut'], 'Application': ['debut'], 'Capacite': [0], 'Utilise': [0]}
# df_VV = pd.DataFrame(columns=['Volume','Application','Capacite','Utilise'])
# print(df_VV)
# print()


# On crée une liste de Dataframe...
listing_df_partVV = []

# print("**********************")
# print("DEBUT BOUCLE NIVEAU VV")
# print("**********************")
print("")
# for i in range(80):
for i in range(len(df_listURL)):
    # print(df_listURL.loc[i,'URL_heavy'])
    responseVV = imp.requests.get(df_listURL.loc[i,'URL_heavy'])
    page_indexVV = responseVV.content
    soupVV = imp.BeautifulSoup(page_indexVV, 'html.parser')
    list_resVV = list(soupVV.find_all(['th','td']))
    list_resVV = [str(element) for element in list_resVV]
    imp.simplifList(list_resVV)
    
    # print(list_resVV[4:])
    nbline_listresVV = divmod(len(list_resVV),4)[0]
    # print("nbre lignes : "+ str(nbline_listresVV))
    
    # création de la liste 
    lineVV = 0
    df_lineVV = []
    for i in range(nbline_listresVV):
        df_lineVV.append(list_resVV[lineVV:lineVV+4])
        lineVV+=4
    # print(df_lineVV)

    df_partVV = pd.DataFrame(df_lineVV, columns=[df_lineVV[0]])
    df_partVV = df_partVV[1:]
    df_partVV.reset_index(drop=True, inplace=True)

    listing_df_partVV.append(df_partVV)

# print()  
# print("********************")
# print("FIN BOUCLE NIVEAU VV")
# print("********************")

# from IPython.display import display
# from tabulate import tabulate

print("nbre de Dataframes obtenus : " + str(len(listing_df_partVV)))
# print(listing_df_partVV[0])
# print()
# print("ESSAI")
# print(type(listing_df_partVV[0].columns))
# print(listing_df_partVV[0].columns)

# display(listing_df_partVV[0])
# print(tabulate(listing_df_partVV[0], headers = list(listing_df_partVV[0].columns) , tablefmt = 'psql'))
print()
# print(listing_df_partVV[1])
# print()

df_VV = listing_df_partVV[0]
for i in range(1,len(listing_df_partVV)):
    df_VV = pd.concat([df_VV,listing_df_partVV[i]])
df_VV.reset_index(drop=True, inplace=True)

# print("IMPRESSION TABLE :")
# print(df_VV)
# df_Final = pd.DataFrame(listing_df_partVV)

##########################
# sauvegarde intermédiaire
df_VV.to_csv('../dataframe/df_listVV.csv', sep=';', index=False)
df_VV = pd.read_csv("../dataframe/df_listVV.csv",sep=";")
##########################

imp.separVolUnite(df_VV)
imp.transfoUnite(df_VV)

# display(df_VV[0:10])
# print()

# retrait des lignes contenant certains mots comme 0B au niveau de la colonne Application ...
# afin que le ratio se déroule parfaitement ensuite...
df_VV = df_VV[~df_VV['Application'].str.contains('0B')]
df_VV = df_VV.reset_index()

# modification ligne après ligne pour calcul du ratio
# for lg in range(len(df_VV)):
#     df_VV.loc[lg,'Use%'] = round(
#         float(df_VV.loc[lg,'Use']) / float(df_VV.loc[lg,'Cap']) * 100,2)
df_VV['UsePrct'] = df_VV.apply(imp.pourcentage, axis=1, args=('Use','Cap',1))

df_VV = df_VV.drop(columns=['Capacite','CapUnite','Utilise','UseUnite'])

# print(df_VV[5:16][['Cap','Use','Use%']])
# print()

df_VV["deb"] = df_VV["Volume"].str.find('">') # on obtient l'endroit du debut
df_VV["fin"] = df_VV["Volume"].str.find('</a>') # on obtient l'endroit de la fin
# modification ligne après ligne
for lg in range(len(df_VV)):
    df_VV.loc[lg,"Volume2"] = df_VV.loc[lg,"Volume"][df_VV.loc[lg,"deb"]+2:df_VV.loc[lg,"fin"]]

# Rearrangement colonnes et renommage
df_VV = df_VV[['Volume2', 'Application','Cap','Use','UsePrct']]
df_VV.rename(columns={'Volume2': 'Volume'}, inplace=True)

df_VV['Cap'] = pd.to_numeric(df_VV['Cap'], errors='coerce')
df_VV['Use'] = pd.to_numeric(df_VV['Use'], errors='coerce')
df_VV['Use'] = round(df_VV['Use'],2)

imp.creaVar(df_VV)
df_VV = df_VV[['Volume','env','quartier','dc','zone','type','Application','Cap','Use','UsePrct']]

# tri selon plusieurs colonnes
df_VV = df_VV.sort_values(by=['dc','zone','env','quartier','type','Application'], 
                          ascending=[True,True,False,True,True,True])
df_VV.reset_index(drop=True, inplace=True)

print("IMPRESSION TABLE DES VV (10 premières et dernières lignes) :")
print(df_VV.head(10))
print("...")
print(df_VV.tail(10))

df_VV_top20 = df_VV.sort_values(by=['UsePrct'], ascending=[False]).head(20)
df_VV_top20.reset_index(drop=True, inplace=True)
print("\n")
print("IMPRESSION TOP 20 DE LA TABLE DES VV :")
print(df_VV_top20)

##########################
# sauvegarde intermédiaire
df_VV.to_csv('../dataframe/df_listVV.csv', sep=';', index=False)
df_VV = pd.read_csv("../dataframe/df_listVV.csv",sep=";")

df_VV_top20.to_csv('../dataframe/df_listVV_top20.csv', sep=';', index=False)
##########################


##########################*
df_VV_historique = df_VV.drop(columns=['Volume'])
# sauvegarde historique
df_VV_historique.to_csv("../dataframe/historique/listVV/df_listVV_"+dateJour+".csv", sep=';', index=False)
df_VV_historique = pd.read_csv("../dataframe/historique/listVV/df_listVV_"+dateJour+".csv",sep=";")
##########################


listfile = []
for item in imp.os.listdir("../dataframe/historique/listVV"):
    if item.startswith("df_listVV") and item.endswith("08h00m.csv") and not item.endswith("histo.csv"):
        listfile.append(item)
print("\n")
print(listfile)

# selection des 5 derniers éléments
listfile = listfile[-5:]
#print(listfile)

listdf = []
for item in listfile:
    datecal = item[10:27] # ainsi datecal est égale à la partie de string du nom de chaque .csv
    datecal_short = item[12:14]+item[15:17]+item[18:20]+item[20:27]
    print(datecal)
    df_temp = pd.read_csv("../dataframe/historique/listVV/df_listVV_"+datecal+".csv",sep=";")
    df_temp.rename(columns={'Cap': 'Cap'+datecal_short, 
                            'Use': 'Use'+datecal_short, 
                            'UsePrct': 'UsePrct'+datecal_short}, inplace=True)
    listdf.append(df_temp)
    # df_temp.to_csv("../dataframe/historique/df_listVV_"+datecal+"_rename.csv", sep=';', index=False)


df_listVV_histo = pd.merge(listdf[0], listdf[1], 
                           on=['env','quartier','dc','zone','type','Application'], how="outer")
for i in range(2,len(listdf)):
    df_listVV_histo = pd.merge(df_listVV_histo, listdf[i], 
                               on=['env','quartier','dc','zone','type','Application'], how="outer")

colonnes = df_listVV_histo.columns.to_list()
col1 = colonnes[0:6]
col2 = colonnes[6:]
col2.sort()

# print("\n")
# print(col1)
# print(col2)
# print("\n")
# concatenation des 2 listes obtenues puis ordonnancement des colonnes selon cette liste
col = [*col1, *col2]
df_listVV_histo = df_listVV_histo[col]

df_listVV_histo.to_csv("../dataframe/historique/df_listVV_histo.csv", sep=';', index=False)

