import os
import time
import json
import shutil

# Correct the path to the configuration file
config_path = os.path.join(os.path.dirname(__file__), '../../fonction.conf.json')
with open(config_path, 'r') as f:
    config = json.load(f)
print(config)

def delete_old_files(base_folder, age_limit_seconds):
    current_time = time.time()
    
    for root, dirs, files in os.walk(base_folder, topdown=False):
        # Supprime les fichiers PDF vieux de plus de 24 heures
        for file in files:
            if file.endswith('.pdf'):
                file_path = os.path.join(root, file)
                file_age = current_time - os.path.getctime(file_path)
                if file_age > age_limit_seconds:
                    print(f"Deleting file: {file_path}")
                    os.remove(file_path)

def delete_old_folders(base_folder, age_limit_seconds):
    current_time = time.time()
    
    for root, dirs, files in os.walk(base_folder, topdown=False):
        # Supprime les dossiers vieux de plus de 24 heures
        for dir in dirs:
            dir_path = os.path.join(root, dir)
            dir_age = current_time - os.path.getctime(dir_path)
            if dir_age > age_limit_seconds:
                print(f"Deleting directory: {dir_path}")
                shutil.rmtree(dir_path)
if __name__ == "__main__":
    base_folder1 = os.path.join('public', 'download')  # Dossier de base à vérifier
    delete_old_files(base_folder1, config['AutoDeleting']['Timeout'])

    base_folder2 = os.path.join('public', 'uploads')  # Dossier de base à vérifier
    delete_old_folders(base_folder2, config['AutoDeleting']['Timeout'])