##################################################################################
# import des divers modules utiles
from ProgPy_00_Imports import pourcentage

import pandas as pd
pd.set_option('display.max_colwidth', 50)

##################################################################################

df_VV = pd.read_csv("../dataframe/df_listVV.csv",sep=";")

df_VV_groupVol1 = df_VV.groupby(["Volume"])["Cap"].sum()
df_VV_groupVol1 = df_VV_groupVol1.to_frame().reset_index()

df_VV_groupVol2 = df_VV.groupby(["Volume"])["Use"].sum()
df_VV_groupVol2 = df_VV_groupVol2.to_frame().reset_index()

df_VV_groupVol = pd.merge(df_VV_groupVol1,df_VV_groupVol2, on="Volume")
df_VV_groupVol = df_VV_groupVol.reset_index()
df_VV_groupVol.rename(columns={'Cap': 'SomCapVV', 'Use': 'SomUseVV'}, inplace=True)

df_VV_groupVol['SomCapVV'] = round(df_VV_groupVol['SomCapVV'],2)
df_VV_groupVol['SomUseVV'] = round(df_VV_groupVol['SomUseVV'],2)

###

df_listFS = pd.read_csv("../dataframe/df_listFS_C.csv",sep=";")
df_listFS = df_listFS.drop(columns=['URL_light']) # colonne inutile en amont de la fusion

df_fusion = pd.merge(df_listFS,df_VV_groupVol, on="Volume", how="right")
df_fusion = df_fusion.reset_index()

df_fusion = df_fusion.drop(columns=['level_0','index'])

# modification ligne après ligne pour calcul du ratio de suralloc/sousalloc
# for lg in range(len(df_fusion)):
#     df_fusion.loc[lg,"AllocFS%"] = round(
#         float((df_fusion.loc[lg,"SomCapVV"]) - float(df_fusion.loc[lg,'CapFS'])) / float(df_fusion.loc[lg,'CapFS']) * 100,2)
df_fusion['UseCapFS%'] = df_fusion.apply(pourcentage, axis=1, args=('SomCapVV','CapFS',1))
df_fusion['UseCapFS%'] = df_fusion['UseCapFS%'] - 100
df_fusion['UseCapFS%'] = round(df_fusion['UseCapFS%'],2)

df_fusion['diff_UseFS-SomUseVV'] = round(df_fusion['UseFS'] - df_fusion['SomUseVV'],2)

# Rearrangement colonnes
df_fusion = df_fusion[['Volume','env','quartier','dc','zone','type',
                       'CapFS','SomCapVV','UseCapFS%','UseFS','SomUseVV','diff_UseFS-SomUseVV']]

##########################
# sauvegarde intermédiaire
df_fusion.to_csv('../dataframe/df_fusion.csv', sep=';', index=False)
df_fusion = pd.read_csv("../dataframe/df_fusion.csv",sep=";")
##########################
