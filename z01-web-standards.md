---
layout: page
title: Web Standards
permalink: /web-standards/
---

- [HTML](#html)
- [CSS](#css)
- [The DOM](#the-dom)
- [SVG](#svg)

D3 is built on top of several common web standards. Don't worry if you don't
know all the nitty-gritty details of these standards, you can pick this stuff up pretty quickly.

### HTML

HTML (HyperText Markup Language) is a text format that most web pages are
written in. HTML uses a standard set of tags to define the different structural components of a webpage: `<h1>`, `<h2>`
tags define headers, `<p>` tags define paragraphs, `<ol>` and `<ul>` are
orderered and unordered lists. Browsers have common ways to display these tags, so lists show up like lists, and headers like headers.

The `<div>` and `<span>` tags are special because browers don't apply
default styles to them, so HTML authors can use them to define custom groups.

The basic outline of an HTML page is something like this:

<div class="example-row-2">
  <div class="example">
    {% highlight html
      %}{% include examples/html.html %}
    {% endhighlight %}
  </div>

  <iframe class="example"
    height="180"
    src="{{ "/examples/html.html" | prepend: site.baseurl }}">
  </iframe>
</div>

### CSS

CSS (Cascading Stylesheets) is a language for styling HTML pages.

CSS styles (also know as selectors) are typically applied to HTML tags
based on their name, class, or ID.

Here are some simple CSS rules and how they apply.

<div class="example-row-3">
  <div class="example">
    {% highlight html
      %}{% include examples/css.html %}
    {% endhighlight %}
  </div>

  <div class="example">
    {% highlight css
      %}{% include examples/css.css %}
    {% endhighlight %}
  </div>

  <iframe class="example"
    height="200"
    src="{{ "/examples/css-styled/" | prepend: site.baseurl }}">
  </iframe>
</div>

### The DOM

When a browser displays an HTML page, it creates an interactive object graph from the tag hierarchy.
This object graph is called the Document Object Model, or DOM.

The standard DOM API is somewhat verbose, so many libraries like jQuery and D3
provide some syntactic sugar that borrows from CSS notation.

Here are some examples of accessing the DOM programatically.

<div class="example-row-3">
  <div class="example">
    {% highlight html
      %}{% include examples/css.html %}
    {% endhighlight %}
  </div>

  <div class="example">
    {% highlight javascript %}
// DOM API
document.getElementById('some-id');
// <li id="some-id">Unique element</li>
document.getElementsByTagName('p').length;
// 4
var reds = document.getElementsByClassName('red');
// [<p class="red">Red paragraph</p>]
reds[0].innerText
// "Red paragraph"
    {% endhighlight %}
  </div>

  <div class="example">
    {% highlight javascript %}
// D3 Selection API
d3.select('p').size(); // select() only finds one
// 1
d3.selectAll('p').size(); // selectAll() finds all
// 4
var reds = d3.selectAll('.red');
// [ > Array[1] ]
reds.text();
// "Red paragraph"
    {% endhighlight %}
  </div>
</div>

The DOM also handles tracking elements as they are rendered, as well as events
like mouse movement. You can attach listeners to these events to add
various levels of interactivity to your page.

Here are some examples of adding listeners to the `click`, `mouseover` and `mouseleave`
events. D3 has some nice helper methods for working with events as well.

<div class="example-row-3">
  <div class="example">
    {% highlight html
      %}{% include examples/dom.html %}
    {% endhighlight %}
  </div>

  <div class="example">
    {% highlight javascript
      %}{% include examples/dom.js %}
    {% endhighlight %}
  </div>

  <iframe class="example"
    height="180"
    src="{{ "/examples/dom-styled/" | prepend: site.baseurl }}">
  </iframe>
</div>

<div class="info">
  Note: In the D3 examples, the methods on the selection can chain
  (that is, they return themselves, so we can group them visually).
</div>

### SVG

SVG (Scalable Vector Graphics) is an XML format used for
drawing. You can think of SVG in a lot of the same terms as the DOM -- there are elements with parents and
children and attributes, and you can respond to the same mouse/touch events.

Even CSS styles and selectors can apply to SVG elements. The CSS attribute names for SVG
come from the SVG definition, so they are sometimes different from their
HTML brethren. (For example, to change the background color of a div to red you would select it then set  `background-color: red` but to get the same effect on an SVG rectangle you would instead use the attribute `fill: red` since an SVG rect doesn't respond to `background-color` for styling.)


SVG defines tags for lots of basic shapes, like `<rect>` and `<circle>` and `<line>`.

<div class="example-row-3">
  <div class="example">
    {% highlight html
      %}{% include examples/svg1.svg %}
    {% endhighlight %}
  </div>

  <div class="example">
    {% highlight css
      %}{% include examples/svg1.css %}
    {% endhighlight %}
  </div>

  <iframe class="example"
    height="200"
    src="{{ "/examples/svg1-styled/" | prepend: site.baseurl }}">
  </iframe>
</div>

Where HTML has the `<div>` and `<span>` tags, SVG has the `<g>` tag for an
arbitrary group. You'll see `<g>` a lot in D3 examples. They're great for
applying styles to a group (including re-positioning the groups).

The `<text>` tag is good for simple labels. The `<path>` tag is powerful but
complex, it can be used for either lines or arbitrary filled-in shapes depending
on the styling.

<div class="example-row-2">
  <div class="example">
    {% highlight html
      %}{% include examples/svg2.svg %}
    {% endhighlight %}
  </div>

  <div class="example">
    {% include examples/svg2.svg %}
  </div>
</div>

<a href="{{ "/parts-of-a-graph/" | prepend: site.baseurl }}" class="giant-button">
  Next
</a>


