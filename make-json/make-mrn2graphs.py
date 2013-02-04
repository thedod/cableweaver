#!/usr/bin/env python
import sys,simplejson as json
d={}
for l in sys.stdin.xreadlines():
    l=l.strip()
    graph,mrn = l.split('|')
    s=d.get(mrn,set())
    s.add(graph.replace('.graphml','.json'))
    d[mrn]=s
for k in d:
    d[k]=list(d[k])
json.dump(d,sys.stdout)
