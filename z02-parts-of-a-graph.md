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

### Coordinates

This graph has a coordinate system! And scales!

The x-axis goes from January 2014 to April 2014, and the y-axis goes from $0 to
$80. However, the SVG is drawn in a box that's about 200 by 300 pixels. Dates
and pixels don't must map to one another, so we have to come up with a scale to
convert one to the other.

In addition, the y-axis in our browser has the origin, *(0, 0)* top left, while
our graph displays the origin in the bottom left.

### Axes

We can actually read the graph because it has clearly labeled Those labels
with "$10" and "Februrary" have to get to our screen somehow. They're also
formatted correctly for the data type.

### Data

Our graph is showing our data! Somehow, the 4 rows in our source table
have turned into 4 points on the line. On top of that, the points in the line
fit into the coordinate system we've defined.

## The Hard Way

Let's make a graph the hard way! As we've seen earlier, the `<path>` tag is
kind of complex, so we'll swap out a line graph for a scatterplot.

We'll need to manually write out each point. Transform attributes nest, so we
can use `<g>` tags to move entire groups, such as the axes, or even offset the
entire graph by a margin.

<div class="example-row-2">
  <div class="example">
    {% highlight html %}
      {% include examples/scatterplot.svg %}
    {% endhighlight %}
  </div>
  <div class="example">
    {% include examples/scatterplot.svg %}
  </div>
</div>

Man! All that work for such a simple graph? SVG is a lot of work!

---

So what does D3 actually do?

axis / scales / coordinate systems (input data maps to here, x/y maps to screen)
I have a range of 20 x 20 units, but it maps to a box of 400x500 on the screen (flipped coords, etc)
SVG is Y-Down, most graphs are Y-UP
units / labels (auto-generate date labels, etc)
Dates!
colors are just another scale!
ZOMG color 10

<script type="text/javascript" src="{{ "/javascripts/parts-of-a-graph.js" | prepend: site.baseurl }}"></script>
