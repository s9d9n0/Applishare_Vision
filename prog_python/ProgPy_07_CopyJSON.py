import os
import shutil

##################################################################################
# définition du répertoire de travail courant
cheminWork = os.path.dirname(os.path.abspath(__file__))
os.chdir(cheminWork)
print('Nom du répertoire de travail courant :\n', os.getcwd())

##################################################################################

source_dir = '../site/json'
destination_dir = '/var/www/visionapplishare/json'

try:
    shutil.copytree(source_dir, destination_dir,dirs_exist_ok=True)
    print('Répertoire copié avec succès.')
except FileExistsError:
    print('Le répertoire de destination existe déjà.')
except Exception as e:
    print(f'Erreur lors de la copie : {e}')

