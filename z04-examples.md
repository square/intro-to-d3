---
layout: page
title: Examples
permalink: /examples/
---

---

So what does D3 actually do?

axis / scales / coordinate systems (input data maps to here, x/y maps to screen)
I have a range of 20 x 20 units, but it maps to a box of 400x500 on the screen (flipped coords, etc)
SVG is Y-Down, most graphs are Y-UP
units / labels (auto-generate date labels, etc)
Dates!
colors are just another scale!
ZOMG color 10

---

Ok so let’s work through a quick example

The standard D3 flow

Data binding: “match these data points to these things in the DOM”

select
append
update
remove
Demo with fixed data (d3.json + python SimpleHTTPServer)

(unsure what goes here)
Thinking of building two Radiator endpoints, and demo-ing one of them

GPV endpoint with URL params to filter by currency code, group by {day,week,month} or {mcc}
Demo with simple bar chart
Payments endpoint (last X payments), filter by currency code, mcc,
Demo with a scatterplot (date vs amount)