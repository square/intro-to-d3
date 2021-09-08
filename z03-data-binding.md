---
layout: page
title: Data Binding
permalink: /data-binding/
---

- [Selections `d3.selectAll`](#selections-d3selectall)
- [Joins `selection.data()` and `selection.join()`](#joins-selectiondata-and-selectionjoin)
- [Adding Elements](#adding-elements)
- [Removing Elements](#removing-elements)
- [Identity and the Key Function](#identity-and-the-key-function)
- [Transitions `selection.transition()`](#transitions-selectiontransition)

D3 selections are a different way to look at data binding. Essentially, D3 maintains a mapping of data points to DOM elements, keeping track of exactly which data maps to which element. When data points are added, changed, or removed, the associated DOM elements can be programmatically added, updated, or removed correspondingly. This feature is extremely powerful, and allows you to add many different kinds of custom interactivity in your visualizations.

<div class="info">
    Note: The `selection.join` API used in this tutorial is only available to D3 v5 and later. For the older data binding pattern, please refer to previous versions of this tutorial.
</div>

## Selections `d3.selectAll`

We've referenced `d3.select()` and `d3.selectAll()` a few times already
but now, it's really time to dig in. `d3.select()` will find one element,
`d3.selectAll` will match all available elements.

With types, the functions might look something like:

```
d3.select(String selector) -> (d3.selection)
```

D3 selections are a group of elements that match a query **or could match a
query later** (the elements may not have been constructed yet).

## Joins `selection.data()` and `selection.join()`

Selections are used to map pieces of our data to elements in the DOM. Suppose we
have some data:

<div class="example-row-1">
  <div class="example">
    {% highlight javascript %}
var sales = [
  { product: 'Hoodie',  count: 7 },
  { product: 'Jacket',  count: 6 },
  { product: 'Snuggie', count: 9 },
];
    {% endhighlight %}
  </div>
</div>

And we want to map these to points on a scatterplot. We know we want each object
in this array to turn into a `<rect>` tag, inside of our `<svg>`
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
<!-- after, rects graph -->
<svg>
  <rect /><!-- { product: 'Hoodie',  count: 7 } -->
  <rect /><!-- { product: 'Jacket',  count: 6 } -->
  <rect /><!-- { product: 'Snuggie', count: 9 } -->
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

var rects = svg.selectAll('rect')
    .data(sales);

rects.size();
// 0 -- no <rect> elements exist yet!
    {% endhighlight %}
  </div>
</div>

Okay, now we have a selection but still no elements! We have more work to do.

The `selection.join()` API allows us to define what happens when we join data with a selection. In other words, we use this API to define how to handle additions, changes, or removals to the data since the last join. 

The `selection.join()` API takes 3 functions as arguments:
- the first function will be called with a selection containing data points which do not have DOM elements yet
- the second function will be called with a selection which contains all the data points
- the third function will be called with a selection which contains data points which have been removed, but for which DOM elements still exist.

The second and third arguments are optional. This can be a bit confusing at first, but don't worry. Continue reading, and I'll explain how all this works through examples. Feel free to reference the [official documentation](https://github.com/d3/d3-selection#selection_join).

<div class="info">
  In D3 selections, "enter" refers to data points which do not have a corresponding DOM element (data that was added since the last join) and "exit" refers to DOM elements which do not have a corresponding data point (data that was removed since the last join). 
  <br>
  <br>
  The `selection.enter()` and `selection.exit()` method of selections can be used to access these subsets - that was how we handled additions and removals before the `selection.join()` API existed. 
  <br>
  <br>
  Now, the "enter" and "exit" selections are automatically passed to the first and third arguments of `selection.join()` - we just need to provide functions to handle them.
</div>

## Adding Elements

Again, our goal is to have a rectangle for each data point. We are starting with
none and we have 4 new data points, so obviously the right thing to do is to
add a new `<rect>` for each data point.

The way D3 looks at this is a more subtle: we want to add a `<rect>`
per data point, *but only for the new points since the last data join*. Since this
is the first data binding (there are no rects currently), everything is new,
it's straightforward to add new points. It's important to keep in mind that for
the next selection, things will be more complex since there will already be
rects.

The part of a D3 selection that represents these element-less data-points
is passed to the first argument in `selection.join`. The elements don't add themselves, we have to
create the elements that will match the selection ourselves. We use the same
attribute editing helpers to configure each circle per its data point.

<div class="example-row-2">
  <div class="example">
    {% highlight javascript %}
// recall that scales are functions that map from
// data space to screen space
var maxCount = d3.max(sales, (d, i) => d.count);
var x = d3.scaleLinear()
    .range([0, 300])
    .domain([0, maxCount]);
var y = d3.scaleOrdinal()
    .rangeRoundBands([0, 75])
    .domain(sales.map((d, i) => d.product));

rects.join(
    // NEW - handle data points w/o rectangles
    newRects => {
        newRects.append('rect')
        .attr('x', x(0))
        .attr('y', (d, i) => y(d.product))
        .attr('height', y.rangeBand())
        .attr('width', (d, i) => x(d.count));
    },
);
    {% endhighlight %}
  </div>

  <div class="example">
    <div class="info">
      We're getting a little sneaky here! We're introducing an <em>ordinal</em>
      scale, one that's discrete instead of continuous.
    </div>

    <p>
      The <kbd>d3.scaleOrdinal()</kbd> helps us create buckets for each
      element. In this case, that's one per product.
    </p>
    <p>
      The domain is the 3 product names. The range is a little different,
      <kbd>rangeRoundBands</kbd> is a helper function that sets the range, but
      tells D3 to pick buckets that are whole pixel widths (no fractions).
    </p>
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

## Removing Elements

Whereas "enter" selects elements that have added since the last data
join, "exit" is the opposite, it applies to elements that have been
removed.

Suppose we drop the first point from our source array, we can find and operate
on the corresponding element in the DOM via the exit selection.

We can use the `remove()` method to immediately delete matched elements; it's
the opposite of `append()`. 

If you only want to delete matched elements, you may omit the argument entirely from `selection.join()` since calling `remove()` is the default behavior.

<div class="example-row-2">
  <div class="example">
    {% highlight javascript %}
// define new logic for handling joins
rects.join(
    newRects => {
        newRects.append('rect')
        .attr('x', x(0))
        .attr('y', (d, i) => y(d.product))
        .attr('height', y.rangeBand())
        .attr('width', (d, i) => x(d.count));
    },
    rects => {},
    // NEW - delete elements whose data has been removed
    rectsToRemove => {
        rectsToRemove.remove();
    }
);

sales.pop(); // drops the last element
rects.data(sales); // join the data again
    {% endhighlight %}
  </div>

  <div class="example">
    <svg width="300" height="100">
      <g transform="translate(5, 5)">
        <rect x="0" y="0"  height="25" width="233.33" />
        <rect x="0" y="25" height="25" width="200" />
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
// true -- identity
obj1 == obj1;

var obj2 = { value: 2 };
var obj3 = { value: 2 };
// false -- huh? they have the same values!
obj2 == obj3;
    {% endhighlight %}
  </div>
</div>

But the example above works! It only removed one element
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
  { product: 'Hoodie', count: 7 },
  { product: 'Jacket', count: 6 }
];

var sales2 = [
  { product: 'Jacket',  count: 6 }, // same
  { product: 'Snuggie', count: 9 }  // new
];

var rects = svg.selectAll('rect')
  .data(sales1, (d, i) => d.product)
  .join(enter => enter.append("rect"));

rects.size(); // 2 -- first join adds two new elements

// removes 1 element, adds 1 element
rects.data(sales2, (d, i) => d.product); 
    {% endhighlight %}
  </div>
</div>

## Transitions `selection.transition()`

The key function is also important in case parts of our objects change -- if we
change a count, then we can update the appropriate element without having to
delete and re-add the element, we can update it in place.

One of D3's most visually pleasing features is its ability to help with
transitions. The key function is critical here for object permanence.

Suppose we have per-product sales we want to update as more products are sold?
We can use transitions to demonstrate this update.

<div class="ex-2 example-row-2">
  <div class="example example-source">
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

  <div class="example example-source">
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

<div class="ex-2 example-row-2">
  <div class="example">
    {% highlight javascript %}
function toggle() {
    sales = (sales == days[0]) ? days[1] : days[0];
    update();
}

function update() {
    svg.selectAll('rect')
    .data(sales, (d, i) => d.product)
    .join(
        enter => {
            enter.append('rect')
            .attr('x', x(0))
            .attr('y', (d, i) => y(d.product))
            .attr('height', y.bandwidth())
            .attr('width', (d, i) => x(d.count));
        },
        update => {
            update.attr('width', (d, i) => x(d.count));
        },
    );
};
    {% endhighlight %}
  </div>

  <div class="example example-result">
    <div>
      <svg width="300" height="100"></svg>
      <button class="toggle">toggle()</button>
    </div>
  </div>
</div>

Ok, but now time to make it pretty. That's where `selection.transition()`
comes in. In the above example, we were just using the plain update
selection to change the values. Here, we'll use `transition()` to make our transition much slicker.

`transition()` selections can have custom timing attributes like `.duration()`
and `.delay()` and even a custom easing function `.ease()`, but the defaults
are pretty nice.

<div class="ex-3 example-row-2">
  <div class="example">
    {% highlight javascript %}
function toggle() {
    sales = (sales == days[0]) ? days[1] : days[0];
    update();
}

function update() {
    svg.selectAll('rect')
    .data(sales, (d, i) => d.product)
    .join(
        enter => {
            enter.append('rect')
            .attr('x', x(0))
            .attr('y', (d, i) => y(d.product))
            .attr('height', y.bandwidth())
            .attr('width', (d, i) => x(d.count));
        },
        update => {
            // NEW!
            update.transition().duration(1000)
            .attr('width', (d, i) => x(d.count));
        },
    );
};
    {% endhighlight %}
  </div>

  <div class="example example-result">
    <div>
      <svg width="300" height="100"></svg>
      <button class="toggle">toggle()</button>
    </div>
  </div>
</div>

Ok! That was the basics of D3! We've got a few more complex examples, but they
mostly build on what we've already shown.

<a href="{{ "/examples" | prepend: site.baseurl }}" class="giant-button">
  Next
</a>


<script type="text/javascript" src="{{ "/javascripts/data-binding.js" | prepend: site.baseurl }}"></script>
