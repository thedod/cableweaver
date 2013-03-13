render_export = Mustache.compile('<!DOCTYPE html>\n'+
'<html lang="en">\n'+
'  <head>\n'+
'    <meta charset="utf-8">\n'+
'    <meta http-equiv="X-UA-Compatible" content="chrome=1">\n'+
'    <title>A CableWeaver story line: {{permahash}}</title>\n'+
'    <link href="https://fonts.googleapis.com/css?family=Chivo:900" rel="stylesheet" type="text/css">\n'+
'    <link rel="stylesheet" type="text/css" href="stylesheets/stylesheet.css" media="screen" />\n'+
'    <link rel="stylesheet" type="text/css" href="stylesheets/pygment_trac.css" media="screen" />\n'+
'    <link rel="stylesheet" type="text/css" href="stylesheets/print.css" media="print" />\n'+
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
'          <h1><a href=".">Cable Weaving</a></h1>\n'+
'          <h2>Stories <a target="_blank" href="http://thedod.github.com/cableweaver">woven</a>\n'+
'              out of <a target="_blank" href="https://en.wikipedia.org/wiki/United_States_diplomatic_cables_leak">cables</a></h2>\n'+
'        </header>\n'+
'        <hr>\n'+
'        <section id="main_content">\n'+
'          <h1>A CableWeaver story line:</h1>\n'+
'          <h1>A story called "{{permahash}}"</h1>\n'+
'          <em>please find it a better name ;)</em>\n'+
'          <h3><a target="_blank" href="{{{permalink}}}">Graph</a></h3>\n'+
'          <div id="svg">{{{svg}}}</div>\n'+
'          <h2>Summary</h2>\n'+
'          <em>Summarize this story here...</em>\n'+
'          <h2>Story line</h2>\n'+
'          <dl>\n'+
'            {{#storyline}}\n'+
'              {{#data.uri}}<dt><h4>{{index}}) <a target="_blank" href="{{{data.uri}}}">{{data.label}}</a> {{data.date}} {{data.classification}}</dt>{{/data.uri}}\n'+
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
