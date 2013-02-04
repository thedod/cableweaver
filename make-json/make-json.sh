#!/bin/sh
export OUTDIR=cableweaver
mkdir -p $OUTDIR/graphs $OUTDIR/json
echo ==== Creating full graph
./c2g "$OUTDIR/full.graphml"
echo ==== Splitting to subgraphs
./splitgraph --source "$OUTDIR/full.graphml" -d "$OUTDIR/graphs" --multilevel --clusters
echo ==== Resplitting large graphs
cd "$OUTDIR/graphs"
find -size +100k -exec ../../splitgraph --source '{}' --multilevel \;
echo ==== Generating mrn2graphs.json
grep 'v_label">' *.graphml | sed -e 's/:.*">/|/' -e 's/<.*$//' | python ../../make-mrn2graphs.py > ../json/mrn2graphs.json
cd ../..
echo ==== Generating list of graphs
find $OUTDIR/graphs/ -type f > $OUTDIR/list-of-graphs
echo ==== Generating json files
./g2json -i "$OUTDIR/list-of-graphs" -d "$OUTDIR/json"
echo ==== done
