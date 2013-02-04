This is an initial commit (and it's 5AM), so what you see here is the [prototype](http://is.gd/cableweaver)'s README. I'll be back.

-------------------------------------------

Here's a small gallery of [Cable2Graph](http://wlwardiary.github.com/cable2graph/) cable reference culsters (the graphs are named after countries, but they don't "represent" the entire body of cables related to them. It's just a handy naming convention). Each node (circle) represents a cable. Each link (line) represents reference between 2 cables.

#### Instructions

* Hover over a node to see details of the cable it represents.
* Click on a node to open the related cable in a new tab.
* Shift+click on the node to toggle between *manual placement* and *auto placement* modes (see below). Default is *auto placement*.
* When you drag a node, all nodes in *auto placement* mode rearrange themselves as if the links were "rubber bands".
* When you release a node that is in *auto placement* mode, it snaps into place according to the "rubber bands" attached to it.
  This is why it is usually best to switch a node to *manual placement* before dragging it.

Reaching a readable layout (where all arrows are visible and distinguishable) can take up to 20 minutes depending on the graph
(Syria and Jordan are the most complex, Iran is easy). Here's a [screenshot gallery](http://is.gd/cableweavergallery) of all graphs after tidying them up a bit.

#### Legend

* Node's fill color represents sending Embassy.
* Border is dashed if cable is missing, otherwise the color represents classification
(<font color="00ff00">UNCLASSIFIED</font>, <font color="#0000ff">CONFIDENTIAL</font>, and <font color="#ff0000">SECRET</font>).
* Border is darker when node is in *manual placement* mode.
* Border width represents node's [HITS authority](https://en.wikipedia.org/wiki/HITS_algorithm) (how "strongly" it is involved in [in]direct reference).
* Link arrowhead points to the referenced (i.e. earlier) cable.
* Link width represents [betweenness centrality](The color represents the embassy send://en.wikipedia.org/wiki/Betweenness_centrality)
  of the reference (in how many shortest-paths between pairs of cables it appears).

#### Under the hood

* This is a proof of concept: trying to use [d3](http://d3js.org) force-layout to render WikiLeaks
  [Cable2Graph](http://wlwardiary.github.com/cable2graph/) clusters.
  Hopefully, this will become a public web service with a server-side component generating the graphs on demand.
* If you fork this, bear in mind that the json file contains additional information you may wish to visualize (e.g. [pagerank](https://en.wikipedia.org/wiki/Pagerank)).
* If you want to try this with your own
  [nbh](https://github.com/wlwardiary/cable2graph/blob/master/nbh)/[splitgrraph](https://github.com/wlwardiary/cable2graph/blob/master/splitgraph)
  graphml files, you can convert them with [g2json](https://gist.github.com/4589092#file-g2json) -
  a minimalistic fork of [g2svg](https://github.com/wlwardiary/cable2graph/blob/master/g2svg) (included in this gist).
