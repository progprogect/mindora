import sys, pymupdf
from pathlib import Path
R = Path(__file__).resolve().parents[2] / 'content/planners/pdfs'
pid, out, *pages = sys.argv[1:]
lang = 'ru/' if '--ru' in pages else ''
pages = [int(p) for p in pages if p.isdigit()]
d = pymupdf.open(R / f'{lang}{pid}.pdf')
for p in pages:
    d[p - 1].get_pixmap(dpi=90).save(f'{out}/{pid}{"-ru" if lang else ""}-{p}.png')
