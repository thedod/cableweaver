The `json/` folder alredy contains all the subgraphs you need in order to run this,
but if you want to generate them from scratch, here's how:

* Clone cable2graph: `git clone https://github.com/wlwardiary/cable2graph.git` and install the needed dependencies.
* Copy all files from this folder to the `cable2graph` folder and `cd` there.
* Run `./make-json.sh`. This should take a while and would create `cable2graph/cableweaver/` (~600MB).
* Move `cable2graph/cableweaver/json/` (~200MB) to your cableweaver project folder.
* You can delete the rest of `cable2graph/cableweaver/`
