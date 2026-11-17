"""Extract translatable text units from planner PDFs -> content/planners/ru-src/<id>.json.

Unit = paragraph (consecutive single-segment lines with same style/left edge)
       or row (one line with several column segments; text joined by ' | ').
"""
import json, re, sys, pymupdf
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / 'content/planners/pdfs'
OUT = ROOT / 'content/planners/ru-src'
OUT.mkdir(parents=True, exist_ok=True)
IDS = ['deep-focus-at-work', 'distraction-free', 'dream-bigger', 'live-with-purpose', 'personal-growth']
DAYS = {'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'S', 'M', 'T', 'W', 'F'}
class _HL:
    @staticmethod
    def search(t):
        return any(c.isalpha() for c in t)


HAS_LETTER = _HL()


def line_segments(line):
    """Split a line into column segments: whitespace runs wider than ~0.9em separate segments (char level)."""
    segs = []
    cur = None
    ws = []  # pending whitespace chars
    for sp in line['spans']:
        for ch in sp['chars']:
            c = ch['c']
            x0, y0, x1, y1 = ch['bbox']
            if c.isspace():
                ws.append((c, ch['bbox']))
                continue
            if cur is not None and ws:
                gap = x0 - cur['bbox'][2]
                if gap > max(0.9 * sp['size'], 7):
                    segs.append(cur)
                    cur = None
                else:
                    cur['text'] += ' '
            if cur is None:
                cur = {'text': '', 'bbox': [x0, y0, x1, y1], 'span': sp, 'base': ch['origin'][1], 'dir': line['dir']}
            cur['text'] += c
            cur['bbox'] = [cur['bbox'][0], min(cur['bbox'][1], y0), x1, max(cur['bbox'][3], y1)]
            ws = []
    if cur is not None:
        segs.append(cur)
    for g in segs:
        g['text'] = re.sub(r'\s+', ' ', g['text']).strip()
    return [g for g in segs if g['text']]


def style(span, d=(1, 0)):
    rot = 0 if abs(d[0]) > 0.7 and d[0] > 0 else (90 if d[1] < -0.7 else (-90 if d[1] > 0.7 else 180))
    return {'rot': rot, 'size': round(span['size'], 1), 'font': span['font'].split('+')[-1], 'color': span['color'], 'flags': span['flags']}


def join_lines(parts):
    out = ''
    for t in parts:
        if not out:
            out = t
        elif out.endswith('-') and t[:1].islower():
            out += t
        else:
            out += ' ' + t
    return out


def extract(pid, wide=False):
    doc = pymupdf.open(SRC / f'{pid}.pdf')
    pages = []
    for pno, page in enumerate(doc, 1):
        W = page.rect.width
        rows = []  # (y, segs)
        for b in page.get_text('rawdict')['blocks']:
            if b['type'] != 0:
                continue
            for l in b['lines']:
                segs = line_segments(l)
                # justified text: many single-word segments -> one text line
                if (len(segs) >= 4 and all(len(g['text'].split()) == 1 for g in segs)
                        and not all(g['text'].rstrip('.') in DAYS for g in segs)):
                    m = dict(segs[0])
                    m['text'] = ' '.join(g['text'] for g in segs)
                    m['bbox'] = [segs[0]['bbox'][0], min(g['bbox'][1] for g in segs), segs[-1]['bbox'][2], max(g['bbox'][3] for g in segs)]
                    segs = [m]
                if segs:
                    rows.append(segs)
        rows.sort(key=lambda s: (round(s[0]['bbox'][1] / 3), s[0]['bbox'][0]))
        singles_all = [g[0]['bbox'] for g in rows if len(g) == 1]

        def local_xmax(x0, y0):
            return max([b[2] for b in singles_all if abs(b[0] - x0) < 3 and abs(b[1] - y0) < 100] + [x0])
        units = []
        cur = None
        for segs in rows:
            if len(segs) > 1:
                cur = None
                if any(HAS_LETTER.search(s['text']) for s in segs):
                    units.append({'kind': 'row', 'text': ' | '.join(s['text'] for s in segs),
                                  'rects': [[round(v, 1) for v in s['bbox']] + [round(s['base'], 1)] for s in segs],
                                  **style(segs[0]['span'], segs[0]['dir'])})
                continue
            s = segs[0]
            st = style(s['span'], s['dir'])
            bx = s['bbox']
            def joinable(c):
                if c is None or c['kind'] != 'para' or re.match(r'^(\d+\.|[•✦●○▪-]\s)', s['text']):
                    return False
                if c['size'] != st['size'] or c['font'] != st['font'] or c.get('rot', 0) != st['rot'] or c['color'] != st['color']:
                    return False
                last = c['rects'][-1]
                dy = bx[1] - last[1]
                aligned = abs(bx[0] - last[0]) < 4 or abs((bx[0] + bx[2]) - (last[0] + last[2])) < 8
                if aligned and ((0 < dy < 1.65 * st['size'] and not wide)
                                or (wide and 0 < dy < 1.95 * st['size']
                                    and last[2] >= last[0] + 0.85 * (local_xmax(last[0], last[1]) - last[0]))):
                    return True
                return bool(wide and st['rot'] == 0 and 0 < dy < 1.7 * st['size']
                            and abs((bx[0] + bx[2]) / 2 - (last[0] + last[2]) / 2) < 3.5)

            target = None
            for c in ([cur] if not wide else [u2 for u2 in reversed(units[-14:])]):
                if joinable(c):
                    target = c
                    break
            if target is not None:
                target['parts'].append(s['text'])
                target['rects'].append([round(v, 1) for v in bx] + [round(s['base'], 1)])
                cur = target
            else:
                cur = {'kind': 'para', 'parts': [s['text']], 'rects': [[round(v, 1) for v in bx] + [round(s['base'], 1)]], **st}
                units.append(cur)
        out = []
        for u in units:
            if u['kind'] == 'para':
                u['text'] = join_lines(u.pop('parts'))
            if not HAS_LETTER.search(u['text']):
                continue
            r = u['rects']
            if u['kind'] == 'para':
                x0 = [a[0] for a in r]; x1 = [a[2] for a in r]
                c = [(a[0] + a[2]) / 2 for a in r]
                if len(r) > 1 and max(c) - min(c) < 4 and max(x0) - min(x0) > 6:
                    align = 'center'
                elif len(r) == 1:
                    cx = c[0]
                    align = 'center' if abs(cx - W / 2) < 6 and r[0][0] > 40 and (r[0][2] - r[0][0]) < W * 0.8 else 'left'
                else:
                    align = 'left'
                u['align'] = align
            else:
                u['align'] = 'left'
            out.append(u)
        # spread single words on one baseline (justified/centred word-by-word lines) -> one unit
        merged, k = [], 0
        while k < len(out):
            u = out[k]
            run = [u]
            if u['kind'] == 'para' and len(u['rects']) == 1 and len(u['text'].split()) == 1:
                j = k + 1
                while (j < len(out) and out[j]['kind'] == 'para' and len(out[j]['rects']) == 1
                       and len(out[j]['text'].split()) <= 2 and out[j]['size'] == u['size'] and out[j]['font'] == u['font']
                       and abs(out[j]['rects'][0][4] - u['rects'][0][4]) < 1.5
                       and 0 < out[j]['rects'][0][0] - run[-1]['rects'][0][2] < 90):
                    run.append(out[j])
                    j += 1
            if len(run) >= 3 and any(r['text'][:1].islower() or not r['text'].isascii() for r in run) and all(0 < run[i + 1]['rects'][0][0] - run[i]['rects'][0][2] < (45 if run[i]['text'].isascii() and run[i + 1]['text'].isascii() else 24) for i in range(len(run) - 1)):
                m = dict(u)
                m['text'] = ' '.join(r['text'] for r in run)
                m['rects'] = [[min(r['rects'][0][0] for r in run), min(r['rects'][0][1] for r in run),
                               max(r['rects'][0][2] for r in run), max(r['rects'][0][3] for r in run), u['rects'][0][4]]]
                merged.append(m)
                k += len(run)
            else:
                merged.append(u)
                k += 1
        out = merged
        # stacked single lines sharing a centre line but not a left edge -> centred labels
        singles = [u for u in out if u['kind'] == 'para' and len(u['rects']) == 1]
        for a in singles:
            for b in singles:
                if a is b or abs(a['size'] - b['size']) > 0.2:
                    continue
                ra, rb = a['rects'][0], b['rects'][0]
                dy = rb[1] - ra[1]
                if 0 < dy < 2.2 * a['size'] and abs((ra[0] + ra[2]) / 2 - (rb[0] + rb[2]) / 2) < 3 and abs(ra[0] - rb[0]) > 4:
                    a['align'] = b['align'] = 'center'
        pages.append({'page': pno, 'units': out})
    (OUT / f'{pid}.json').write_text(json.dumps(pages, ensure_ascii=False, indent=1))
    return pages


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    for pid in args or IDS:
        pages = extract(pid, wide='--wide' in sys.argv)
        uniq = {u['text'] for p in pages for u in p['units']}
        print(pid, 'units', sum(len(p['units']) for p in pages), 'unique', len(uniq), 'words', sum(len(t.split()) for t in uniq))
