"""Flag pages of ru PDFs with overlapping text lines, text outside page, or tiny text."""
import pymupdf, sys
from pathlib import Path
R = Path(__file__).resolve().parents[2] / 'content/planners/pdfs/ru'
out = {}
for f in sorted(R.glob('*.pdf')):
    d = pymupdf.open(f)
    for pn, p in enumerate(d, 1):
        lines = []
        for b in p.get_text('dict')['blocks']:
            if b['type'] != 0: continue
            for l in b['lines']:
                t = ''.join(s['text'] for s in l['spans']).strip()
                if not t: continue
                sz = max(s['size'] for s in l['spans'])
                # use glyph box shrunk vertically to the x-height band
                x0, y0, x1, y1 = l['bbox']
                h = y1 - y0
                lines.append((pymupdf.Rect(x0, y0 + 0.28 * h, x1, y1 - 0.28 * h), t, sz))
        issues = []
        W, H = p.rect.width, p.rect.height
        for r, t, sz in lines:
            if r.x0 < 8 or r.x1 > W - 8 or r.y1 > H - 4: issues.append(f'edge:{t[:20]}')
            if sz < 6.3 and len(t) > 6: issues.append(f'tiny{sz:.1f}:{t[:16]}')
        for i in range(len(lines)):
            for j in range(i + 1, len(lines)):
                a, b = lines[i][0], lines[j][0]
                inter = a & b
                if inter.is_valid and not inter.is_empty and inter.width > 6 and inter.height > 2.2:
                    issues.append(f'overlap:{lines[i][1][:14]}|{lines[j][1][:14]}')
        if issues: out[(f.stem, pn)] = issues
tot = 0
for (s, pn), v in out.items():
    tot += 1
    print(s, pn, v[:3])
print('pages flagged', tot)
