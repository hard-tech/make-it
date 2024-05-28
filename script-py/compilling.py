from PIL import Image
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os
import sys

def convert_images_to_pdf(input_folder, output_file):
    images = [f for f in os.listdir(input_folder) if (f.endswith('.png') | f.endswith('.jpg') | f.endswith('.jpeg')) ]
    if not images:
        print("Aucune image PNG trouvée dans le dossier spécifié.")
        return

    images.sort()  # Tri des noms de fichiers par ordre alphabétique

    if os.path.exists(output_file):
        os.remove(output_file)
        print(f"Ancien PDF supprimé: {output_file}")

    pdf = canvas.Canvas(output_file, pagesize=letter)

    for image_name in images:
        image_path = os.path.join(input_folder, image_name)
        img = Image.open(image_path)
        width, height = img.size
        pdf.setPageSize((width, height))
        pdf.drawInlineImage(image_path, 0, 0)
        pdf.showPage()

    pdf.save()
    print(f"PDF généré: {output_file}")

    # Supprime les images après la compilation
    for image_name in images:
        image_path = os.path.join(input_folder, image_name)
        os.remove(image_path)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 script-py/compilling.py FolderName")
        sys.exit(1)

    input_folder = sys.argv[1]
    output_file = f"outputs/{sys.argv[1].split('/')[1]}.pdf"

    convert_images_to_pdf(input_folder, output_file)