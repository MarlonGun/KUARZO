import zipfile
import xml.etree.ElementTree as ET
import os

def read_docx(file_path):
    print(f"\n--- Reading {os.path.basename(file_path)} ---")
    if not os.path.exists(file_path):
        print("File does not exist.")
        return
    try:
        with zipfile.ZipFile(file_path) as z:
            xml_content = z.read('word/document.xml')
            root = ET.fromstring(xml_content)
            
            # Namespace map for Word XML
            namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            text_runs = []
            for elem in root.iter():
                if elem.tag.endswith('t'): # 'w:t' tag contains text
                    text_runs.append(elem.text or "")
                    
            text = "".join(text_runs)
            # Print first 2000 chars and wrap lines
            lines = []
            current_line = []
            length = 0
            for run in text_runs:
                current_line.append(run)
                if "\n" in run or len(current_line) > 10:
                    lines.append(" ".join(current_line))
                    current_line = []
            if current_line:
                lines.append(" ".join(current_line))
            
            full_text = "\n".join(lines)
            print(full_text[:4000])
            if len(full_text) > 4000:
                print("... [TRUNCATED] ...")
    except Exception as e:
        print(f"Error reading docx: {e}")

parent_dir = "c:\\Users\\USUARIO\\Documents\\TODOS MIS TRABAJOS DEL SENA\\TRIMESTRE 7"
read_docx(os.path.join(parent_dir, "Creacion App Escritorio.docx"))
read_docx(os.path.join(parent_dir, "documentacion python.docx"))
