
# Possibilité de travailler aussi dans un environnement virtuel
# cd -> vers le répertoire
# python -m venv venv
# python -m pip install --upgrade pip
# source venv/Scripts/activate
# pip install requests BeautifulSoup4 pandas

##################################################################################
# import des divers modules utiles
import os
import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
import datetime

import warnings
warnings.filterwarnings('ignore')


##################################################################################
# définition de l'URL général
URL = "http://pdnetapplht101.ad.insee.intra/index.php"

# définition de l'URL vers l'API Oscar
URL_Oscar = "https://api-referentiel-applications.insee.fr/applications"

# définition du répertoire de travail courant
cheminWork = os.path.dirname(os.path.abspath(__file__))
os.chdir(cheminWork)

# définition de la date du jour avec conversion en string
dateJour = datetime.datetime.now()
dateJour = dateJour.strftime("%Y-%m-%d_%Hh%Mm")

##################################################################################
# définition des fonctions personnelles

def simplifList(l : list) -> list:
    for cell in range(len(l)):
        l[cell] = re.sub(r'<th>|</th>|<td>|</td>', '', l[cell])
        l[cell] = re.sub(r'title=""', '', l[cell])
        l[cell] = re.sub(r' >', '>', l[cell])
        l[cell] = re.sub(r'\n', '', l[cell])


def creaVar(df : pd.DataFrame) -> pd.DataFrame:
    for lg in range(len(df)):
        if df.loc[lg,'Volume'][6:10]=="_as_" or df.loc[lg,'Volume'][6:10]=="_ls_":
            df.loc[lg,'env'] = df.loc[lg,'Volume'][4:6]
            df.loc[lg,'quartier'] = df.loc[lg,'Volume'][10:12].upper()
            df.loc[lg,'dc'] = df.loc[lg,'Volume'][13:15]
            df.loc[lg,'zone'] = df.loc[lg,'Volume'][16:18]
            if df.loc[lg,'zone']=="50":
                df.loc[lg,'zone']="Int"
            if df.loc[lg,'zone']=="00":
                df.loc[lg,'zone']="Dmz"
            df.loc[lg,'type'] = df.loc[lg,'Volume'][19:25]

        elif df.loc[lg,'Volume'][6:11]=="_as4_":
            df.loc[lg,'env'] = df.loc[lg,'Volume'][4:6]
            df.loc[lg,'quartier'] = df.loc[lg,'Volume'][11:13].upper()
            df.loc[lg,'dc'] = df.loc[lg,'Volume'][14:16]
            df.loc[lg,'zone'] = df.loc[lg,'Volume'][17:19]
            if df.loc[lg,'zone']=="50":
                df.loc[lg,'zone']="Int"
            if df.loc[lg,'zone']=="00":
                df.loc[lg,'zone']="Dmz"
            df.loc[lg,'type'] = df.loc[lg,'Volume'][20:26]

        elif df.loc[lg,'Volume'][6:11]=="_aus_":
            df.loc[lg,'env'] = df.loc[lg,'Volume'][4:6]
            df.loc[lg,'quartier'] = df.loc[lg,'Volume'][11:].upper()
            df.loc[lg,'dc'] = "d1"
            df.loc[lg,'zone'] = "Int"
            df.loc[lg,'type'] = "aus"

        elif df.loc[lg,'Volume'][6:11]=="_dpt_" or df.loc[lg,'Volume'][6:11]=="_pdc_":
            df.loc[lg,'env'] = df.loc[lg,'Volume'][4:6]
            df.loc[lg,'quartier'] = df.loc[lg,'Volume'][7:13].upper()
            df.loc[lg,'dc'] = df.loc[lg,'Volume'][14:16]
            df.loc[lg,'zone'] = df.loc[lg,'Volume'][17:19]
            if df.loc[lg,'zone']=="50":
                df.loc[lg,'zone']="Int"
            if df.loc[lg,'zone']=="00":
                df.loc[lg,'zone']="Dmz"
            df.loc[lg,'type'] = df.loc[lg,'Volume'][20:26]

        else:
            df.loc[lg,'env'] = "??"
            df.loc[lg,'quartier'] = "??"
            df.loc[lg,'dc'] = "??"
            df.loc[lg,'zone'] = "??"
            df.loc[lg,'type'] = "??"


def separVolUnite(df : pd.DataFrame) -> pd.DataFrame:
    df['Cap'] = df['Capacite'].str.replace(r'[a-zA-Z]', '',regex=True)
    df['CapUnite'] = df['Capacite'].str.replace(r'[0-9\.]', '',regex=True)
    df['Use'] = df['Utilise'].str.replace(r'[a-zA-Z]', '',regex=True)
    df['UseUnite'] = df['Utilise'].str.replace(r'[0-9\.]', '',regex=True)
    # print(df[0:4][['Capacite','Cap','CapUnite','Utilise','Use','UseUnite']])


def transfoUnite(df : pd.DataFrame) -> pd.DataFrame:
    for lg in range(len(df)):
        if df.loc[lg,'CapUnite']=="TB":
            df.loc[lg,'Cap'] = float(df.loc[lg,'Cap']) * 1024
        if df.loc[lg,'CapUnite']=="GB":
            df.loc[lg,'Cap'] = float(df.loc[lg,'Cap']) * 1  
        if df.loc[lg,'CapUnite']=="MB":
            df.loc[lg,'Cap'] = round(float(df.loc[lg,'Cap']) / 1024, 6)

        if df.loc[lg,'UseUnite']=="TB":
            df.loc[lg,'Use'] = float(df.loc[lg,'Use']) * 1024
        if df.loc[lg,'UseUnite']=="GB":
            df.loc[lg,'Use'] = float(df.loc[lg,'Use']) * 1  
        if df.loc[lg,'UseUnite']=="MB":
            df.loc[lg,'Use'] = round(float(df.loc[lg,'Use']) / 1024, 6)
        if df.loc[lg,'UseUnite']=="KB":
            df.loc[lg,'Use'] = round(float(df.loc[lg,'Use']) / 1024**2, 6)
        if df.loc[lg,'UseUnite']=="B":
            df.loc[lg,'Use'] = round(float(df.loc[lg,'Use']) / 1024**3, 6)


def pourcentage(line, Num, Denom, precision):
    return round(float(line[Num]) / float(line[Denom]) * 100,precision)


if __name__ == "__main__":

    print('Nom du répertoire de travail courant :')
    print(os.getcwd())
    print("")

    print('date et heure du jour :')
    # print(type(dateJour))
    print(dateJour)
    print("")

