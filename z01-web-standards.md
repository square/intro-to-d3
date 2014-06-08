---
layout: page
title: Web Standards
permalink: /web-standards/
---

Like we mentioned, D3 takes advantage of a lot of web standards. We're going
to give quick whirlwind tour of the relevant ones. Don't worry if you don't
know all the nitty-gritty details, you can pick this stuff up pretty quickly.

- [HTML](#html)
- [CSS](#css)
- [The DOM](#the-dom)
- [SVG](#svg)

### HTML

HTML (HyperText Markup Language) is a text format that most web pages are
written in. It's loosely related to the XML family, but much less strict (for
example some tags such as `<br>` don't need matching closing tags.

There are a standard set of HTML tags with standard meanings, `<h1>`, `<h2>`
tags define headers, `<p>` tags define paragraphs, `<ol>` and `<ul>` are
orderered and unordered lists. Browsers have common ways to display these tags, so lists show up like lists, and headers like headers.

The `<div>` and `<span>` tags are special because browers don't apply
default styles to them, so HTML authors can use them to define custom groups.

The basic outline of an HTML page is something like this:

<div class="example-row-2">
  <div class="example">
    {% highlight html %}
      {% include examples/html.html %}
    {% endhighlight %}
  </div>

  <iframe class="example"
    height="180"
    src="{{ "/examples/html.html" | prepend: site.baseurl }}">
  </iframe>
</div>

### CSS

CSS (Cascading Stylesheets) is a language for styling web pages.

Styles describe elements on a page. Styles (selectors) are usually applied by
tag name, class or ID. Many parts of an element can be used to define
a style--even attribute values--but we won't need to worry about that today.

Here are some simple CSS rules and how they apply.

<div class="example-row-3">
  <div class="example">
    {% highlight html %}
      {% include examples/css.html %}
    {% endhighlight %}
  </div>

  <div class="example">
    {% highlight css %}
      {% include examples/css.css %}
    {% endhighlight %}
  </div>

  <iframe class="example"
    height="180"
    src="{{ "/examples/css-styled/" | prepend: site.baseurl }}">
  </iframe>
</div>

### The DOM

Browsers turn HTML document structures into an object graph, this is the
Document Object Model, but many folks refer to it as the DOM. In this graph,
elements have children, and most HTML attributes are available as properties on these objects.

The standard DOM API is somewhat verbose, so many libraries like jQuery and D3
provide some syntactic sugar, that borrows from CSS notation.

<div class="example-row-3">
  <div class="example">
    {% highlight html %}
      {% include examples/css.html %}
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
// D3 Select API
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

### SVG

SVG stands for Scalable Vector Graphic. It's an XML format specifically for
drawing. Modern browsers support SVG natively, and we can think of SVG
in a lot of the same terms as the DOM -- there are elements with parents and
children and attributes.

Even CSS styles can apply to SVG elements! The CSS attribute names for SVG
come from the SVG definition, so they are sometimes different from their
HTML brethren.

SVG has lots of basic shapes, like `<rect>` and `<circle>` and `<line>`.

<div class="example-row-3">
  <div class="example">
    {% highlight html %}
      {% include examples/svg1.svg %}
    {% endhighlight %}
  </div>

  <div class="example">
    {% highlight css %}
      {% include examples/svg1.css %}
    {% endhighlight %}
  </div>

  <iframe class="example"
    height="180"
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
    {% highlight html %}
      {% include examples/svg2.svg %}
    {% endhighlight %}
  </div>

  <div class="example">
    {% include examples/svg2.svg %}
  </div>
</div>

<a href="{{ "/parts-of-a-graph/" | prepend: site.baseurl }}" class="giant-button">
  Next
</a>


