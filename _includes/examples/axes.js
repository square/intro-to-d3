// x is the d3.scaleTime()
var xAxis = d3.axisBottom(x)
  .ticks(4); // specify the number of ticks

var svg = d3.select('body')
  .append('svg')        // create an <svg> element
    .attr('width', 300) // set its dimentions
    .attr('height', 150);

svg.append('g')            // create a <g> element
  .attr('class', 'x axis') // specify classes
  .call(xAxis);            // let the axis do its thing

