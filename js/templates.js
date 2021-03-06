render_export = Mustache.compile('<!DOCTYPE html>\n'+
'<html lang="en">\n'+
'  <head>\n'+
'    <meta charset="utf-8">\n'+
'    <meta http-equiv="X-UA-Compatible" content="chrome=1">\n'+
'    <title>A CableWeaver story line: {{title}}</title>\n'+
'    <link href="https://fonts.googleapis.com/css?family=Chivo:900" rel="stylesheet" type="text/css">\n'+
'    <link rel="stylesheet" type="text/css" href="{{{root}}}/stylesheets/stylesheet.css" media="screen" />\n'+
'    <link rel="stylesheet" type="text/css" href="{{{root}}}/stylesheets/pygment_trac.css" media="screen" />\n'+
'    <link rel="stylesheet" type="text/css" href="{{{root}}}/stylesheets/print.css" media="print" />\n'+
'    <!--[if lt IE 9]>\n'+
'    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>\n'+
'    <![endif]-->\n'+
'    <style type="text/css">\n'+
'      .node { stroke: #000; stroke-width: 1.5px; stroke-opacity: .6 }\n'+
'      .node.MISSING { stroke:black; stroke-dasharray:2,2 }\n'+
'      .node.SECRET-NOFORN { stroke: #7f0000; }\n'+
'      .node.SECRET { stroke: #7f0000; }\n'+
'      .node.CONFIDENTIAL-NOFORN { stroke: #00007f; }\n'+
'      .node.CONFIDENTIAL { stroke: #00007f; }\n'+
'      .node.UNCLASSIFIED { stroke: #007f00; }\n'+
'      .node.UNCLASSIFIED-FOR-OFFICIAL-USE-ONLY { stroke: #007f00; }\n'+
'      .link { stroke: #000; stroke-opacity: .6; }\n'+
'      dd { margin-left:40px }\n'+
'      blockquote { font-size:120% }\n'+
'    </style>\n'+
'  </head>\n'+
'  <body>\n'+
'    <div id="container">\n'+
'      <div class="inner">\n'+
'        <header>\n'+
'          <h1><a target="_top" href="{{{root}}}">Cable Weaving</a></h1>\n'+
'          <h2>Stories <a target="_top" href="{{{cableweaver_root}}}">woven</a>\n'+
'              out of <a target="_top" href="https://en.wikipedia.org/wiki/United_States_diplomatic_cables_leak">cables</a></h2>\n'+
'        </header>\n'+
'        <script type="text/javascript" src="{{{root}}}/bl.ocks.js"></script>\n'+
'        <hr>\n'+
'        <section id="main_content">\n'+
'          <h1>{{title}}</h1>\n'+
'          <h4>Hover over a circle for cable information,\n'+
'            or <a target="_top" href="{{{cableweaver_root}}}/{{{permahash}}}">click for interactive graph</a></h4>\n'+
'          <div id="svg">{{{svg}}}</div>\n'+
'          <h3 align="right"><a target="_top" href="https://github.com/thedod/cableweaver/wiki#legend">Legend</a></h3>\n'+
'          <h2>Summary</h2>\n'+
'          <em>Summarize this story here...</em>\n'+
'          <h2>Story line</h2>\n'+
'          <dl>\n'+
'            {{#storyline}}\n'+
               // ugly tweak to use plusd instead of window.open(d.uri)
'              {{#data.uri}}<dt><h4>{{index}}) <a target="_top" href="https://www.wikileaks.org/plusd/cables/{{data.label}}_a.html">{{data.label}}</a>'+
'              {{data.date}} {{data.classification}}</dt>{{/data.uri}}\n'+
'              {{^data.uri}}<dt><h4>{{index}}) {{data.label}}</h4></dt>{{/data.uri}}\n'+
'              <dd>\n'+
'              <h4>{{#data.subjects}}{{data.subjects}}{{/data.subjects}}{{^data.subjects}}MISSING{{/data.subjects}}</h4>\n'+
'              <!-- Enter remarks for {{data.label}} here. To quote from the cable use the convention: <blockquote>SOME TEXT...</blockquote> -->\n'+
'              </dd>\n'+
'            {{/storyline}}\n'+
'          </dl>\n'+
'        </section>\n'+
'      </div>\n'+
'    </div>\n'+
'  </body>\n'+
'</html>');

render_readme = Mustache.compile("The initial version of this page was exported from [a CableWeaver story line]({{{cableweaver_root}}}/{{{permahash}}}).\n\n"+
"Possibly [and hopefully], additional information was added manually. If you have anything to add to this page, don't be shy.\n"+
"[Fork us a scoop](https://github.com/thedod/cableweaver/wiki/How-to-help) :)");
