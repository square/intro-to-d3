// DOM API
var clickMe = document.getElementById('click-me');
clickMe.onclick = () => {
  if (this.style.backgroundColor) {
    this.style.backgroundColor = '';
  } else {
    this.style.backgroundColor = 'red';
  }
}

// D3 Selection API. Note: it attaches the
// callbacks to each element in the selection
d3.selectAll('.hover-me')
  .on('mouseover', () => {
    this.style.backgroundColor = 'yellow';
  })
  .on('mouseleave', () => {
    this.style.backgroundColor = '';
  });