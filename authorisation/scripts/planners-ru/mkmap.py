"""ru-src/<id>.ru.txt ('N | текст', N = порядковый номер из dump.py) -> ru-src/<id>.ru.json {en: ru}."""
import json, re, sys
from pathlib import Path
R = Path(__file__).resolve().parents[2] / 'content/planners/ru-src'
pid = sys.argv[1]
show = sys.argv[2:] 
src = []
seen = set()
for p in json.load(open(R / f'{pid}.json')):
    for u in p['units']:
        if u['text'] not in seen:
            seen.add(u['text']); src.append(u['text'])
raw = (R / f'{pid}.ru.txt').read_text()
ru = {}
for m in re.finditer(r'^(\d+) \| (.*?)(?=^\d+ \| |\Z)', raw, re.S | re.M):
    ru[int(m.group(1))] = m.group(2).rstrip('\n')
bad = [i for i in range(len(src)) if i not in ru]
extra = [i for i in ru if i >= len(src)]
print(pid, 'src', len(src), 'ru', len(ru), 'missing', bad[:20], 'extra', extra[:20])
if show:
    a, b = int(show[0]), int(show[1])
    for i in range(a, b):
        print(i, '|', src[i][:60].replace('\n', ' '), '=>', ru.get(i, '???')[:70].replace('\n', ' / '))
json.dump({src[i]: ru[i] for i in range(len(src)) if i in ru}, open(R / f'{pid}.ru.json', 'w'), ensure_ascii=False, indent=1)
