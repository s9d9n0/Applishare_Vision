import os
import shutil

##################################################################################
# définition du répertoire de travail courant
cheminWork = os.path.dirname(os.path.abspath(__file__))
os.chdir(cheminWork)
print('Nom du répertoire de travail courant :\n', os.getcwd())

##################################################################################

# recopie du répertoire json tout entier
source_dir = '../site/json'
destination_dir = '/var/www/visionapplishare/json'

try:
    shutil.copytree(source_dir, destination_dir,dirs_exist_ok=True)
    print('Répertoire copié avec succès.')
except FileExistsError:
    print('Le répertoire de destination existe déjà.')
except Exception as e:
    print(f'Erreur lors de la copie : {e}')


# recopie des autres fichiers necessaires...
source_dir = '../site'
destination_dir = '/var/www/visionapplishare'

# list_fichiers = ['index.html','style.css','fonction_AffichDate.js','fonction_FiltreTable.js','fonction_TriTable.js','fonction_CreaTable.js']
list_fichiers = ['index.html',
                'index_EtatFS.html',
                'style.css',
                'Js_00_EventClick.js',
                'Js_00_FetchDataJSON.js',
                'Js_01_AffichDate.js',
                'Js_02_CreaTable.js',
                'Js_03_FiltreTable.js',
                'Js_04_TriTable.js']
for fichier in list_fichiers:
    src_file = source_dir + "/" + fichier
    dst_file = destination_dir + "/" + fichier
    shutil.copy(src_file,dst_file)
    print("fichier " + fichier + " recopié avec succès !")

