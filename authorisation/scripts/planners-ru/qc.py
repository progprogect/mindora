"""Sanity checks for ru PDFs: page counts and leftover Latin words."""
import re, sys, pymupdf
from pathlib import Path
R = Path(__file__).resolve().parents[2] / 'content/planners/pdfs'
IDS = sorted(p.stem for p in (R / 'ru').glob('*.pdf'))
ALLOW = {'TikTok', 'Instagram', 'YouTube', 'Messenger', 'GIF', 'DND', 'DIY', 'ex', 'PM', 'AM'}
for pid in IDS:
    en, ru = pymupdf.open(R / f'{pid}.pdf'), pymupdf.open(R / f'ru/{pid}.pdf')
    left = []
    for i, p in enumerate(ru, 1):
        for w in re.findall(r'[A-Za-z]{3,}', p.get_text()):
            if w not in ALLOW:
                left.append((i, w))
    print(pid, 'pages', len(en), len(ru), 'OK' if len(en) == len(ru) else 'MISMATCH', 'latin left:', len(left), left[:12])
