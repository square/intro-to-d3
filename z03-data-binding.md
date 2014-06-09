---
layout: page
title: Data Binding
permalink: /data-binding/
---

- [Selections `d3.selectAll`](#selections-d3selectall)
- [Joins `selection.data()`](#joins-selectiondata)
- [Adding Elements `selection.enter()`](#adding-elements-selectionenter)
- [Removing Elements `selection.exit()`](#removing-elements-selectionexit)
- [Identity and the Key Function](#identity-and-the-key-function)
- [Transitions `selection.transition()`](#transitions-selectiontransition)

<div class="info">
  Heads up! Data binding is probably the hardest part of D3 to "get".
  Personally, it took this being re-explained like 2 or 3 times to really
  internalize what was going on.
</div>

D3 selections are a different way to look at data binding, they're powerful
because the same selection can be updated for different data later on. Updating
is the most powerful part of selections.

## Selections `d3.selectAll`

Ok, so we've referenced `d3.select()` and `d3.selectAll()` a few times already
but now, it's really time to dig in. `d3.select()` will find one element,
`d3.selectAll` will match all available elements.

With types, the functions might look something like:

```
d3.select(String selector) -> (d3.selection)
```

D3 selections are a group of elements that match a query **or could match the
query later**, the elements may not have been constructed yet.

## Joins `selection.data()`

Selections are used to map pieces of our data to elements in the DOM. Suppose we
have some data:

<div class="example-row-1">
  <div class="example">
    {% highlight javascript %}
var sales = [
  { date: new Date('2014-5-04'), count: 7 },
  { date: new Date('2014-5-11'), count: 6 },
  { date: new Date('2014-5-18'), count: 9 },
  { date: new Date('2014-5-25'), count: 10 }
];
    {% endhighlight %}
  </div>
</div>

And we want to map these to points on a scatterplot. We know we want each object
in this array into of these to turn into `<circle>` tag, inside of our `<svg>`
below:

<div class="example-row-2">
  <div class="example">
    {% highlight html %}
<!-- before, empty graph -->
<svg>
</svg>
    {% endhighlight %}
  </div>

  <div class="example">
    {% highlight html %}
<!-- after, circles graph -->
<svg>
  <circle /><!-- { date: 2014-5-04, count: 7 } -->
  <circle /><!-- { date: 2014-5-11, count: 6 } -->
  <circle /><!-- { date: 2014-5-18, count: 9 } -->
  <circle /><!-- { date: 2014-5-25, count: 10 } -->
</svg>
    {% endhighlight %}
  </div>
</div>

To connect these, we're going to create a selection and use `.data()` to bind
our data to the selection.

<div class="example-row-1">
  <div class="example">
    {% highlight javascript %}
var svg = d3.select('svg');
svg.size();
// 1 -- one <svg> element exists

var circles = svg.selectAll('circle')
  .data(sales);

circles.size();
// 0 -- no <circle> elements exist yet!
    {% endhighlight %}
  </div>
</div>

Ok but now we have a selection but still no elements! We have more work to do.

## Adding Elements `selection.enter()`

Again, our goal is to have a circle for each data point. We are starting with
none and we have 4 new data points, so obviously the right thing to do is to
add a new `<circle>` for each data point.

The way D3 looks at this is a more subtle: we want to add a `<circle>`
per data point, *but only for the new points the last data join*. Since this
is the first data binding (there are no circles currently), everything is new,
it's straightforward to add new points. It's important to keep in mind that for
the next selection, things will be more complex since there will already be
circles.

The part of a D3 selection that represents these element-less data-points
is `selection.enter()`;

<div class="example-row-1">
  <div class="example">
    {% highlight javascript %}
var newCircles = circles.enter();
    {% endhighlight %}
  </div>
</div>

So now `newCircles` represents these element-less data-points, so we use
`append` to add new elements. The elements don't add themselves, we have to
create the elements that will match the selection ourselves. We use the same
attribute editing helpers to configure each circle per its data point.


<div class="example-row-1">
  <div class="example">
    {% highlight javascript %}
// recall that scales are functions that map from
// data space to screen space
var y = d3.scale.linear()
  .range([100, 0])
  .domain(d3.extent(sales, function(d, i) {
    return d.count;
  }));
var x = d3.time.scale()
  .range([0, 270])
  .domain(d3.extent(sales, function(d, i) {
    return d.date;
  }));

newCircles.append('circle')
  .attr('r', 5)
  .attr('cx', function(d, i) {
    // map from data to screen space
    var date = d.date,
        pixels = x(date);
    return pixels;
  })
  .attr('cy', function(d, i) { return y(d.count) })
  .attr('fill', 'steelblue');
    {% endhighlight %}
  </div>
</div>

So how does it turn out? Let's take a look:

<div class="example-row-2">
  <div class="example">
    {% highlight html %}
<svg width="300" height="100">
{% include examples/binding.svg %}<svg>
    {% endhighlight %}
  </div>

  <div class="example">
    <svg width="300" height="100">
      <g transform="translate(5, 5)">
        {% include examples/binding.svg %}
      </g>
    </svg>
  </div>
</div>

<div class="info">
  Check out how these attribute helpers can take immediate values as well
  as callbacks. Just like with <kbd>d3.min</kbd>, these callbacks use the same
  style of <kbd>(d, i)</kbd> parameters to represent the element and its index.
</div>

## Removing Elements `selection.exit()`

Where `selection.enter()` selects elements that have added since the last data
join, `selection.exit()` is the opposite, it applies to elements that have been
removed.

Suppose we drop the first point from our source array, we can find and operate
on the corresponding element in the DOM via `selection.exit()`.

We can use the `remove()` method to immediately delete matched elements, it's
the opposite of `append()`.

<div class="example-row-2">
  <div class="example">
    {% highlight javascript %}
sales.shift(); // drops the first element

var circles = circles.data(sales); // join the data again

var circlesToRemove = circles.exit();

circlesToRemove.size()
// 1 -- one element is part of the exit selection

circlesToRemove.remove(); // instantly removes
    {% endhighlight %}
  </div>

  <div class="example">
    <svg width="300" height="100">
      <g transform="translate(5, 5)">
        <circle r="5" cx="90"  cy="40" fill="steelblue" />
        <circle r="5" cx="180" cy="10" fill="steelblue" />
        <circle r="5" cx="270" cy="0"  fill="steelblue" />
      </g>
    </svg>
  </div>
</div>

## Identity and the Key Function

As a quick aside: Javascript object equality is very shallow. Objects are only
equal if they are actually the same object (identity), not if they have the same
values:

<div class="example-row-1">
  <div class="example">
    {% highlight javascript %}
var obj1 = { value: 1 };
var obj2 = { value: 2 };

obj1 == obj1;
// true -- identity
obj1 == obj2;
// false -- huh? they have the same values!
    {% endhighlight %}
  </div>
</div>

But the example with `selection.exit()` above works! It only removed one element
from the DOM because we only removed one element from the array, and all the
rest of the objects were the exact same.

What if we get a new page of data, with some overlap, but we no longer have the
exact same object instances? Well, we will have to find some way to
match objects to each other, and with D3, that's where a key function comes in.

When we introduced `selection.data()` earlier, we left out the hidden second
parameter, the key function. It's another `(d, i)` callback.

This example keys objects on their date, so we can match elements across
separate arrays.

<div class="example-row-1">
  <div class="example">
    {% highlight javascript %}
var sales1 = [
  { date: new Date('2014-5-04'), count: 7 },
  { date: new Date('2014-5-11'), count: 6 }
];

var sales2 = [
  { date: new Date('2014-5-11'), count: 6 }, // same
  { date: new Date('2014-5-18'), count: 9 }  // new
];

var circles = svg.selectAll('circle')
  .data(sales1, function(d, i) { return d.date; } );

circles.enter().append('circle');

circles.size();
// 2 -- first join, adds two new elements

var nextCircles = circles
  .data(sales2, function(d, i) { return d.date; });

nextCircles.exit().size();
// 1 -- one element to remove
nextCircles.exit().remove();

nextCircles.enter().append('circle'); // adds one element
    {% endhighlight %}
  </div>
</div>

## Transitions `selection.transition()`

The key function also important in case parts of our objects change -- if we
change a count, then we can update the appropriate element without having to
delete and re-add the element, we can update it in place.

One of D3's most visually pleasing features is its ability to help with
transitions. The key function is critical here for object permanence.

Suppose we have per-product sales we want to update as more products are sold?
We can use transitions to demonstrate this update.

<div class="example-row-2">
  <div class="example">
    <table class="data-table">
      <thead>
        <tr>
          <th colspan="2">
            Day 1
          </th>
        </tr>
        <tr>
          <th>Product</th>
          <th>Sales (Cumulative)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hoodie</td>
          <td>10</td>
        </tr>
        <tr>
          <td>Jacket</td>
          <td>3</td>
        </tr>
        <tr>
          <td>Snuggie</td>
          <td>2</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="example">
    <table class="data-table">
      <thead>
        <tr>
          <th colspan="2">
            Day 2
          </th>
        </tr>
        <tr>
          <th>Product</th>
          <th>Sales (Cumulative)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hoodie</td>
          <td>16</td>
        </tr>
        <tr>
          <td>Jacket</td>
          <td>7</td>
        </tr>
        <tr>
          <td>Snuggie</td>
          <td>8</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="example-row-2">
  <div class="example">
    {% highlight javascript %}
      var day1Sales = 
    {% endhighlight %}
  </div>

  <div class="example">
    WOWOW
  </div>
</div>


---

So what does D3 actually do?

axis / scales / coordinate systems (input data maps to here, x/y maps to screen)
I have a range of 20 x 20 units, but it maps to a box of 400x500 on the screen (flipped coords, etc)
SVG is Y-Down, most graphs are Y-UP
units / labels (auto-generate date labels, etc)
Dates!
colors are just another scale!
ZOMG color 10
