/*
*  PixelPainter creates a canvas that can be painted on.
* @param {Number} width  --> Width of the canvas, in number of cells
* @param {Number} height --> Height of the canvas, in number of cells
*/

function pixelPainter(width, height) {
  var module = {};
  var ppDiv = document.getElementById('pixelPainter');
  var ppCanvas = document.createElement('div');
  var pixelSize = 8;
  var colorDiv = document.createElement('div');
  var swatchSize = 16;
  var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black', 'white'];
  var currentColor ='black';

  colorDiv.style.width = 4 * swatchSize;
  colorDiv.style.height = 2 * swatchSize;
  ppCanvas.style.width = width * pixelSize;
  ppCanvas.style.height = height * pixelSize;
  ppCanvas.style.position = 'absolute';

  module.changeColor = function(e) {
    if(e.target.style.backgroundColor !== currentColor) {
      e.target.style.backgroundColor = currentColor;
    } else {
      e.target.style.backgroundColor = 'white';
    }
  };

  module.changeColorContinuous = function(e) {
    e.target.style.backgroundColor = currentColor;
    console.log(e);
  };

  //now let's see if we can make a tool that continuously changes color
  //over different colors (i.e. rainbow lines)

  module.storeColor = function(e){
    currentColor = e.target.style.backgroundColor;
  };

  //do work here
  for(var y = 0; y < height; y++) {
    for(var x = 0; x < width; x++) {
      var pixCell = document.createElement('div');
      pixCell.style.width = pixelSize;
      pixCell.style.height = pixelSize;
      pixCell.style.border = '1px dotted black';
      pixCell.style.position = 'absolute';
      pixCell.style.left = '' + (x * pixelSize);
      pixCell.style.top = '' + (y * pixelSize);
      pixCell.style.backgroundColor = 'white';
      pixCell.addEventListener('mousedown', module.changeColor);
      //look up MouseDown and look into making a custom drag handler
      pixCell.addEventListener('dragover', module.changeColorContinuous);
      ppCanvas.appendChild(pixCell);
    }
  }

  for(var i =0; i < colors.length; i++){
    var pixColor = document.createElement('div');
    pixColor.addEventListener('click', module.storeColor);
    pixColor.style.border = '1px dotted black';
    pixColor.style.backgroundColor = colors[i];
    pixColor.style.width = swatchSize;
    pixColor.style.height = swatchSize;
    pixColor.style.position = 'absolute';
    pixColor.style.left = swatchSize * i;

    colorDiv.appendChild(pixColor);
  }

  ppDiv.appendChild(colorDiv);
  ppDiv.appendChild(ppCanvas);

  return module;
}

var pp = pixelPainter(64, 64);