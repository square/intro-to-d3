var xAxis = d3.svg.axis()
  .scale(x)         // x is the d3.time.scale()
  .orient('bottom') // the ticks go below the graph
  .ticks(4);        // specify the number of ticks

var svg = d3.select('body')
  .append('svg')        // create an <svg> element
    .attr('width', 300) // set its dimentions
    .attr('height', 150);

svg.append('g')            // create a <g> element
  .attr('class', 'x axis') // specify classes
  .call(xAxis);            // let the axis do its thing

