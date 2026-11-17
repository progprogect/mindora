"""Store translations by unit number on a page.
usage: tr.py <id> <page> < lines   where line = 'N | русский текст'  ->  ru-src/<id>.ru.map.json (garbled text -> ru)"""
import json, re, sys
from pathlib import Path
R = Path(__file__).resolve().parents[2] / 'content/planners/ru-src'
pid, page = sys.argv[1], int(sys.argv[2])
units = json.load(open(R / f'{pid}.json'))[page - 1]['units']
p = R / f'{pid}.ru.map.json'
mp = json.load(open(p)) if p.exists() else {}
raw = sys.stdin.read()
n = 0
for m in re.finditer(r'^(!?)(\d+) \| (.*?)(?=^!?\d+ \| |\Z)', raw, re.S | re.M):
    k = int(m.group(2))
    key = f'{page}:{k}' if m.group(1) else units[k]['text']
    val = m.group(3).rstrip('\n')
    if key in mp and mp[key] != val:
        print('  overwrite', k, key[:30], '|', mp[key][:30], '->', val[:30])
    mp[key] = val
    n += 1
json.dump(mp, open(p, 'w'), ensure_ascii=False, indent=1)
left = [k for k, u in enumerate(units) if u['text'] not in mp and f'{page}:{k}' not in mp]
print(pid, 'page', page, 'stored', n, 'untranslated left on page:', left)
