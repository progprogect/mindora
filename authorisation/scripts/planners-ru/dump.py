import json,sys
from pathlib import Path
R=Path(__file__).resolve().parents[2]/'content/planners'
pid=sys.argv[1]
seen={}
for p in json.load(open(R/f'ru-src/{pid}.json')):
    for u in p['units']:
        if u['text'] not in seen: seen[u['text']]=len(seen)
for t,i in seen.items(): print(i,'|',t)
