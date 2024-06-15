# create_folder.py
import os
import sys

def ensure_upload_folder_exists():
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

def create_subfolder(folder_name):
    ensure_upload_folder_exists()
    folder_path = os.path.join('uploads', folder_name)
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
    return folder_path

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python create_folder.py <folder_name>")
        sys.exit(1)
    
    folder_name = sys.argv[1]
    create_subfolder(folder_name)
