$(function() {
    $.getJSON('json/mrn2graphs.json',function(data,statustext,xhr) {
        window.mrn2json = data;
        var mrndiv=$('#mrn-div').empty();
        if (xhr.status!=200) {
            mrndiv.append('<div/>').addClass('alert alert-error').html(
                "Couldn't load json/mrn2graphs.json: "+statustext+"."); 
            return;
        }

        mrndiv.append(
            $('<p/>').append('Enter cable <abbr title="Message Reference Number">MRN</abbr>s (one per line). ')
                .append('You can search for MRNs at the following ')
                .append('<a target="_blank" href="https://en.wikipedia.org/wiki/Contents_of_the_United_States_diplomatic_cables_leak#Sites_offering_search_capabilities">sites</a>, or try an ')
                .append(
                    $('<a/>').attr('href','#').text('example').on('click',function() {
                        $('#mrns').val('08BRASILIA1612\n08STATE115523\n08STATE121356\n08VIENNA1414').trigger('change');
                        return false;
                    })
                )
                .append('.')
            )
            .append('<form><textarea id="mrns" placeholder="10TELAVIV413"></textarea></form>');
        $('#mrns').on("change",function() { search4Graphs($(this).val().split("\n")); });
    });
    initSvg();
});

function search4Graphs(mrns) {
    mrns = mrns.map(function(s) { return s.trim().toUpperCase(); }).filter(function(s) { return s; });
    var graph2mrns = {};
    for (i = 0 ; i<mrns.length ; i++) {
        var graphs = mrn2json[mrns[i]] || [];
        for (j = 0 ; j<graphs.length ; j++) {
            graph2mrns[graphs[j]] = (graph2mrns[graphs[j]] || []).concat(mrns[i]);
        }
    }
    var graph_menu = [];
    for (pair in Iterator(graph2mrns)) { graph_menu.push(pair); }
    graph_menu.sort(function(x,y) { return x[1].length-y[1].length; });
    console.log(graph_menu);
    if (!graph_menu.length) {
        $('#graph-menu-div').html(
            '<div class="alert">No graphs found.<br>Try another search.</div>');
        return;
    }
    var ul = $('<ul/>').addClass('nav nav-stacked nav-tabs');
    for (i = 0 ; i< graph_menu.length ; i++) {
        ul.append(
            $('<li/>').append(
                $('<a>').attr('href','json/'+graph_menu[i][0]).html(graph_menu[i][1].join(' , '))
                    .on("click",function() { populate($(this).attr("href")); return false; })
            )
        );
    }
    $('#graph-menu-div').empty().append(ul);
}


// Helper so that a link doesn't cover the nodes
// returns a line between x1,x2 and y1,y2 that is
// begins r1 "later" and ends r2 "earlier"
// is there a fancy d3 way to do this?!?
function shorten(x1,y1,x2,y2,r1,r2) {
    if (x1==y1 && x2==y2)
        return {x1:x1,x2:x2,y1:y1,y2:y2};
    a = Math.atan(Math.abs(y2-y1)/Math.abs(x2-x1)); // atan can swallow Infinity
    return {
      x1:x1+(x2>x1?1:-1)*r1*Math.cos(a),
      y1:y1+(y2>y1?1:-1)*r1*Math.sin(a),
      x2:x2+(x2>x1?-1:1)*r2*Math.cos(a),
      y2:y2+(y2>y1?-1:1)*r2*Math.sin(a)
    }
}

function initSvg() {
    window.svg_width = 700;
    window.svg_height = 480;
    window.node_color = d3.scale.category20().domain(d3.range(0,1000));

    window.force = d3.layout.force()
        .charge(-100)
        .linkDistance(30)
        .size([svg_width, svg_height]);

    window.svg = d3.select("#graph-area").append("svg")
        .attr("width", svg_width)
        .attr("height", svg_height);

    svg.append("svg:defs")
      .append("svg:marker")
        .attr("id","arrow-head").attr("viewBox", "0 0 10 10")
        .attr("refX", 1).attr("refY", 5)
        .attr("markerWidth", 4).attr("markerHeight", 3)
        .attr("markerUnit", "strokeWidth").attr("orient", "auto")
        .append("svg:polyline")
          .style("fill","#000")
          .attr("points", "0,0 5,5 0,10 1,5");
}

function populate(file) {
  console.log(file);
  force.stop();
  svg.selectAll("line.link").remove();
  svg.selectAll("circle.node").remove();
  d3.selectAll("a.menu-item").classed("active",false);
  d3.json(file, function(error, graph) {
    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();
  
  var link = svg.selectAll("line.link").data(graph.links)
      .enter().append("line")
        .attr("marker-end","url(#arrow-head)")
        .attr("class", "link");
  
  var node = svg.selectAll("circle.node").data(graph.nodes)
      .enter().append("circle")
        .attr("id", function(d) { return "c"+d.label.replace(':','-') })
        .attr("class", function(d) {return "node "+d.nodeclass; })
        .attr("r", 8)
        // hash-generated unique colors - less readable (close colors are possible)
        .style("fill", function(d) { return d.color; })
        // more readable color scale, but cycles thru 20 colors (duplicates if >20)
        //.style("fill", function(d) { return node_color(d.colorindex); })
        .on("contextmenu",function(d) {
           console.log(d);
           return false;
        })
        .on("click",function(d) {
          if (d3.event.shiftKey) {
            d3.select(this).classed("active",d.fixed = !d.fixed)
          } else {
            if (d.uri) {
              window.open(d.uri);
            } else {
              alert('Missing cable');
            }
          }
        })
      .call(force.drag);
  
    var link_stroke = d3.scale.linear()
        .domain([
          d3.min(graph.links,function(d) { return d.betweenness || 0 }),
          d3.max(graph.links,function(d) { return d.betweenness || 0 })
        ])
        .range([2,6]);
    link.property("stroke_width", function(d) { return link_stroke(d.betweenness || 0); });
    link.style("stroke-width", function(d) { return this.stroke_width+"px"; });
  
    var node_stroke = d3.scale.linear()
        .domain([
          d3.min(graph.nodes,function(d) { return d.authority || 0 }),
          d3.max(graph.nodes,function(d) { return d.authority || 0 })
        ])
        .range([2,6]);
    node.style("stroke-width", function(d) { return node_stroke(d.authority || 0)+"px"; });
  
    node.append("title")
        .text(function(d) {
          return d.label + (d.date?" ("+d.date+(d.classification?", "+d.classification:"")+")":"") + (d.subjects?":\n"+d.subjects:"");
        });
  
    force.on("tick", function() {
      link.property("shorty", function(d) {
            return shorten(d.source.x,d.source.y,d.target.x,d.target.y,
              parseFloat(d3.select('#c'+d.source.label.replace(':','-')).attr("r"))+3,
              parseFloat(d3.select("#c"+d.target.label.replace(':','-')).attr("r"))+3+this.stroke_width
            );
          })
          .attr("x1", function(d) { return this.shorty.x1 })
          .attr("y1", function(d) { return this.shorty.y1 })
          .attr("x2", function(d) { return this.shorty.x2 })
          .attr("y2", function(d) { return this.shorty.y2 })
  
      // The https://gist.github.com/1129492 trick to avoid out-of-the-box nodes
      node.attr("cx", function(d) { return d.x = Math.max(12, Math.min(svg_width - 12, d.x)); })
          .attr("cy", function(d) { return d.y = Math.max(12, Math.min(svg_height - 12, d.y)); });
    });
  });
}
