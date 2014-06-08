---
layout: page
title: Parts of a Graph
permalink: /parts-of-a-graph/
---

The most common visualizations use standard chart formats because they're easy
understand.

If we had a table in Excel and wanted to graph it, it's easy! Just point
it at our rows and columns, set a few colors, and boom! A graph.

<div class="ex-1 example-row-2">
  <div class="example example-source">
    <table class="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2014-1-1</td>
          <td>$10</td>
        </tr>
        <tr>
          <td>2014-2-1</td>
          <td>$20</td>
        </tr>
        <tr>
          <td>2014-3-1</td>
          <td>$40</td>
        </tr>
        <tr>
          <td>2014-4-1</td>
          <td>$80</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="example example-result">
  </div>
</div>

So now we want to make one of these in SVG so we show it off on the interwebs.
It's going to be a bit more work.

So what does D3 actually do?

axis / scales / coordinate systems (input data maps to here, x/y maps to screen)
I have a range of 20 x 20 units, but it maps to a box of 400x500 on the screen (flipped coords, etc)
SVG is Y-Down, most graphs are Y-UP
units / labels (auto-generate date labels, etc)
Dates!
colors are just another scale!
ZOMG color 10

<script type="text/javascript" src="{{ "/javascripts/parts-of-a-graph.js" | prepend: site.baseurl }}"></script>
