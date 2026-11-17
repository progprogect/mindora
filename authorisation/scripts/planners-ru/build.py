"""Build Russian planner PDFs: redact English text, overlay Russian from ru-src/<id>.ru.json.

usage: build.py [id ...]   (default: all five)   -> content/planners/pdfs/ru/<id>.pdf
Layout is done by hand (greedy word wrap, font size shrink) to keep the original baselines.
"""
import json, sys, pymupdf
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / 'content/planners/pdfs'
TXT = ROOT / 'content/planners/ru-src'
OUT = ROOT / 'content/planners/pdfs/ru'
OUT.mkdir(parents=True, exist_ok=True)
IDS = [p.name[:-len('.ru.json')] for p in sorted(TXT.glob('*.ru.json'))]
FD = '/usr/share/fonts/truetype/noto/'
LD = '/usr/share/fonts/truetype/liberation/'
FONTS = {
    'reg': FD + 'NotoSans-Regular.ttf', 'bold': FD + 'NotoSans-Bold.ttf',
    'it': FD + 'NotoSans-Italic.ttf', 'bi': FD + 'NotoSans-BoldItalic.ttf',
    'head': LD + 'LiberationSansNarrow-Bold.ttf',
}
FULLDAYS = {'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'}
ABBR = {'Понедельник': 'Пн', 'Вторник': 'Вт', 'Среда': 'Ср', 'Четверг': 'Чт', 'Пятница': 'Пт', 'Суббота': 'Сб', 'Воскресенье': 'Вс'}
WEEK = ['П', 'В', 'С', 'Ч', 'П', 'С', 'В']
DECOR = ('MagicAlphabet', 'FredokaOne', 'TanHarmoni', 'Bernoru')
_fonts = {}


def font_for(u):
    f, fl, size = u['font'], u['flags'], u['size']
    bold = bool(fl & 16) or 'Bold' in f or 'Black' in f
    ital = bool(fl & 2) or 'Italic' in f
    if f.startswith('Halimun'):
        key = 'it'
    elif size >= 24 or f.startswith(DECOR):
        key = 'head'
    else:
        key = 'bi' if bold and ital else 'bold' if bold else 'it' if ital else 'reg'
    if key not in _fonts:
        _fonts[key] = (pymupdf.Font(fontfile=FONTS[key]), key)
    return _fonts[key]


def rgb(c):
    return ((c >> 16 & 255) / 255, (c >> 8 & 255) / 255, (c & 255) / 255)


def wrap(font, text, width, fs):
    out = []
    for para in text.split('\n'):
        cur = ''
        for w in para.split(' '):
            t = (cur + ' ' + w) if cur else w
            if cur and font.text_length(t, fontsize=fs) > width:
                out.append(cur)
                cur = w
            else:
                cur = t
        out.append(cur)
    return out


def box_free(rects, boxes):
    if len(rects) != 1:
        return True
    r = rects[0]
    return not any(b.x0 - 2 <= r[0] and r[2] <= b.x1 + 2 and b.y0 - 2 <= r[1] and r[3] <= b.y1 + 2 for b in boxes)


def layout(page, text, rects, u, align, report, tag, boxes=(), others=(), allow_grow=True):
    if u.get('rot'):
        # work in an unrotated frame centred on the original box: swap width/height
        r = rects[0]
        cx, cy = (r[0] + r[2]) / 2, (r[1] + r[3]) / 2
        w, h = r[3] - r[1], r[2] - r[0]
        base = cy + (u['size'] * 0.35)
        virt = [[cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2, base]]
        u2 = dict(u)
        saved = u['rot']
        _layout(page, text, virt, u2, 'center', report, '' + tag, (), (), True, saved)
        return
    _layout(page, text, rects, u, align, report, tag, boxes, others, allow_grow, 0)


def _layout(page, text, rects, u, align, report, tag, boxes, others, allow_grow, rot):
    font, key = font_for(u)
    if any(ch.strip() and not font.has_glyph(ord(ch)) for ch in text):
        if 'dejavu' not in _fonts:
            _fonts['dejavu'] = (pymupdf.Font(fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'), 'dejavu')
        font = _fonts['dejavu'][0]
    base = u['size']
    pw = page.rect.width
    x0 = min(r[0] for r in rects)
    x1 = max(r[2] for r in rects)
    W = x1 - x0
    n = len(rects)
    heading = key == 'head' and base >= 24
    pitch0 = (rects[-1][4] - rects[0][4]) / (n - 1) if n > 1 else 0
    max_lines = n
    if not heading and box_free(rects, boxes):
        below = [r[1] for r in others if r[1] > rects[-1][1] + 2 and min(r[2], x1) - max(r[0], x0) > 4]
        limit = (min(below) if below else page.rect.height - 40) - 0.5 * base
        step = pitch0 or 1.3 * base
        extra = int((limit - rects[-1][4]) / step)
        max_lines = n + max(0, min(extra, 3 if n > 1 else 1))
    xl, xr = x0, x1
    box = None
    if n == 1 and not heading:
        cx0, cx1 = (x0 + x1) / 2, rects[0][1] + (rects[0][3] - rects[0][1]) / 2
        for b in boxes:
            if b.x0 - 2 <= x0 and x1 <= b.x1 + 2 and b.y0 - 2 <= rects[0][1] and rects[0][3] <= b.y1 + 2:
                box = b
                break
    if box is not None:
        xl, xr = box.x0 + 4, box.x1 - 4
        align = 'center' if abs((x0 + x1) / 2 - (box.x0 + box.x1) / 2) < 10 else 'left'
        if align == 'left':
            xl = max(box.x0 + 4, x0 - 1)
        allow_grow = False
        if box.height >= 2 * 1.35 * base * 1.1:
            max_lines = 2
    # neighbours on the same line limit horizontal growth
    ry0, ry1 = rects[0][1], rects[0][3]
    right_lim = min([r[0] for r in others if r[0] >= x1 - 1 and min(r[3], ry1) - max(r[1], ry0) > 3] + [pw - 24]) - 6
    left_lim = max([r[2] for r in others if r[2] <= x0 + 1 and min(r[3], ry1) - max(r[1], ry0) > 3] + [24]) + 6
    if box is not None and n == 1:
        # a shared bar (table header): confine the text to its own cell between neighbours
        nb_l = [r[2] for r in others if r[2] <= x0 + 1 and min(r[3], ry1) - max(r[1], ry0) > 3]
        nb_r = [r[0] for r in others if r[0] >= x1 - 1 and min(r[3], ry1) - max(r[1], ry0) > 3]
        if nb_l:
            xl = max(xl, (max(nb_l) + x0) / 2 + 1)
        if nb_r:
            xr = min(xr, (x1 + min(nb_r)) / 2 - 1)
        if nb_l or nb_r:
            align = 'center'
            max_lines = max(max_lines, 2)
    if allow_grow and n == 1:
        grow = 0.6 if heading else (0.35 if W > 90 else 1.2)
        if align == 'center':
            c = (x0 + x1) / 2
            half = min(W * (1 + grow) / 2, c - left_lim, right_lim - c)
            half = max(half, W / 2)
            xl, xr = c - half, c + half
        else:
            xr = max(min(x0 + W * (1 + grow), right_lim), x1)
    width = xr - xl
    min_scale = 0.45 if heading else 0.66
    allowed = max_lines
    scale = 1.0
    lines = None
    # phase A: keep the original number of lines, shrink down to 0.8 (0.55 for headings)
    floor_a = 0.55 if heading else 0.8
    while True:
        fs = base * scale
        lines = wrap(font, text, width, fs)
        if (len(lines) <= n and max(font.text_length(l, fontsize=fs) for l in lines) <= width + 0.5) or scale <= floor_a:
            break
        scale -= 0.03
    if len(lines) > n or max(font.text_length(l, fontsize=fs) for l in lines) > width + 0.5:
        # phase B: use the free room below (if any), then shrink further
        max_lines = allowed
        scale = 1.0
        while True:
            fs = base * scale
            lines = wrap(font, text, width, fs)
            if (len(lines) <= max_lines and max(font.text_length(l, fontsize=fs) for l in lines) <= width + 0.5) or scale <= min_scale:
                break
            scale -= 0.03
    if len(lines) > max_lines:
        report.append(f'{tag}: OVERFLOW {len(lines)}>{max_lines} lines @{scale:.2f}: {text[:50]}')
    if scale < 0.8:
        report.append(f'{tag}: shrunk {scale:.2f}: {text[:50]}')
    pitch = pitch0 * min(1.0, scale + 0.1) if pitch0 else 1.25 * fs
    if pitch0 and len(lines) > n and len(lines) * pitch > n * pitch0 + pitch0 * 1.2:
        pitch = pitch0 * 0.9
    tw = pymupdf.TextWriter(page.rect, color=rgb(u['color']))
    for k, ln in enumerate(lines):
        w = font.text_length(ln, fontsize=fs)
        if align == 'center':
            x = (xl + xr) / 2 - w / 2
        else:
            x = xl
        yb = rects[0][4] + k * pitch - ((len(lines) - n) * pitch / 2 if (box is not None and len(lines) > n) else 0)
        tw.append((x, yb), ln, font=font, fontsize=fs)
    if rot:
        cx, cy = (x0 + x1) / 2, (rects[0][1] + rects[-1][3]) / 2
        tw.write_text(page, morph=(pymupdf.Point(cx, cy), pymupdf.Matrix(rot)))
    else:
        tw.write_text(page)


def other_rects(pg, me):
    return [r for v in pg['units'] if v is not me for r in v['rects']]


def build(pid):
    units = json.load(open(TXT / f'{pid}.json'))
    tr = json.load(open(TXT / f'{pid}.ru.json'))
    doc = pymupdf.open(SRC / f'{pid}.pdf')
    report, missing = [], set()
    for pg in units:
        page = doc[pg['page'] - 1]
        override, rows = {}, {}
        for u in pg['units']:
            if u['text'] in ('M', 'T', 'W', 'F', 'S'):
                rows.setdefault(round(u['rects'][0][1] / 4), []).append(u)
        for grp in rows.values():
            grp.sort(key=lambda u: u['rects'][0][0])
            if len(grp) == 7:
                for u, ch in zip(grp, WEEK):
                    override[id(u)] = ch
        todo = []
        boxes = sorted(
            (d['rect'] for d in page.get_drawings()
             if d.get('fill') is not None and 12 < d['rect'].width < page.rect.width * 0.9 and 8 < d['rect'].height < page.rect.height * 0.9),
            key=lambda r: r.width * r.height)
        for ui, u in enumerate(pg['units']):
            src = u['text']
            ru = override.get(id(u), tr.get(f'{pg["page"]}:{ui}', tr.get(src)))
            if ru is None:
                missing.add(src)
                continue
            if ru in FULLDAYS and ru in ABBR and sum(1 for v in pg['units'] if tr.get(v['text']) in FULLDAYS and abs(v['rects'][0][4] - u['rects'][0][4]) < 2) >= 7:
                ru = ABBR[ru]
            if src.isascii() and src.isupper() and len(src) > 3:
                ru = ru.upper()
            todo.append((u, ru))
        for u, ru in todo:
            for r in u['rects']:
                page.add_redact_annot(pymupdf.Rect(r[0] - 0.3, r[1] + 0.4, r[2] + 0.3, r[3] - 0.4))
        page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE, graphics=pymupdf.PDF_REDACT_LINE_ART_NONE)
        for u, ru in todo:
            tag = f'p{pg["page"]}'
            if u['kind'] == 'row':
                parts = [p.strip() for p in ru.split('|')]
                if len(parts) < len(u['rects']):
                    parts += u['text'].split(' | ')[len(parts):]
                if len(parts) != len(u['rects']):
                    report.append(f'{tag}: ROW MISMATCH {u["text"]!r} -> {ru!r}')
                    continue
                for part, r in zip(parts, u['rects']):
                    layout(page, part, [r], u, 'left', report, tag, boxes, other_rects(pg, u))
            else:
                layout(page, ru, u['rects'], u, u['align'], report, tag, boxes, other_rects(pg, u))
    doc.save(OUT / f'{pid}.pdf', garbage=3, deflate=True)
    return report, missing


if __name__ == '__main__':
    for pid in sys.argv[1:] or IDS:
        rep, miss = build(pid)
        print(f'== {pid}: missing {len(miss)}, issues {len(rep)}')
        for m in sorted(miss)[:5]:
            print('  MISSING', m[:70])
        for r in rep[:60]:
            print('  ', r)
