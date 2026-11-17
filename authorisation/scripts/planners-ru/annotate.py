"""Render pages with numbered boxes on units that still have no translation (text layer of these PDFs is garbled).
usage: annotate.py <id> <out_dir> <page> [...]"""
import json, sys, pymupdf
from pathlib import Path
R = Path(__file__).resolve().parents[2] / 'content/planners'
pid, out, *pages = sys.argv[1:]
units = json.load(open(R / f'ru-src/{pid}.json'))
mp_path = R / f'ru-src/{pid}.ru.map.json'
mp = json.load(open(mp_path)) if mp_path.exists() else {}
doc = pymupdf.open(R / f'pdfs/{pid}.pdf')
for n in map(int, pages):
    page = doc[n - 1]
    todo = []
    for k, u in enumerate(units[n - 1]['units']):
        if u['text'] in mp or f'{n}:{k}' in mp:
            continue
        r = u['rects'][0]
        col = (1, 0, 0) if k % 2 == 0 else (0, 0.2, 1)
        page.draw_rect(pymupdf.Rect(r[:4]), color=col, width=0.4)
        page.insert_text((r[0] - 1, r[1] + 0.5), str(k), fontsize=7.5, color=col)
        todo.append(k)
    page.get_pixmap(dpi=84).save(f'{out}/{pid}-a{n}.png')
    print(n, 'to translate:', len(todo), 'of', len(units[n - 1]['units']))
