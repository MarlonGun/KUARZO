; ================================================================
; KuarzoAdmin.spec — Configuración de PyInstaller para el Panel Admin
; Generado para uso con: pyinstaller KuarzoAdmin.spec
; ================================================================

block_cipher = None

a = Analysis(
    ['main.py'],
    pathex=['.'],
    binaries=[],
    datas=[
        ; Incluir todos los assets necesarios
        ('../assets/images/logo.png', 'assets/images'),
        ('../assets/images/favicon.png', 'assets/images'),
        ('../assets/fonts', 'assets/fonts'),
    ],
    hiddenimports=[
        'customtkinter',
        'PIL',
        'PIL._tkinter_finder',
        'matplotlib',
        'matplotlib.backends.backend_tkagg',
        'requests',
        'mysql.connector',
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.zipfiles,
    a.datas,
    [],
    name='KuarzoAdmin',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,       ; False = no muestra ventana de consola al abrir
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    ; icon='../assets/images/icon.ico',  ; Descomenta si tienes el icono en .ico
)
