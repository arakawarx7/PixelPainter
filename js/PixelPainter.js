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
  var controlsDiv = document.createElement('div');
  var currentColorDisplay = document.createElement('div');
  var swatchSize = 16;
  var clearButton = document.createElement('button');
  var saveButton = document.createElement('button');
  var fetchButton = document.createElement('button');
  var colors = {
    red: 'red',
    orange: 'orange',
    yellow: 'yellow',
    green: 'mediumseagreen',
    blue: 'royalblue',
    purple: 'darkslateblue',
    black: 'black',
    white: 'white',
    pink: 'pink',
    peach: 'peachpuff',
    lightyellow: 'cornsilk',
    lightgreen: 'lightgreen',
    lightblue: 'deepskyblue',
    lightpurple: 'mediumpurple',
    brown: 'saddlebrown',
    tan: 'peru'
  };
  var currentColor = 'black';
  var mouseIsDown = false;

  module.clearCanvas = function(){
    var matches = document.body.querySelectorAll('.pixCell');
    for(var i = 0; i < matches.length; i++){
      matches[i].style.backgroundColor = 'white';
    }
  };

  module.changeColor = function(e) {
    mouseIsDown = true;
    if(e.target.style.backgroundColor !== currentColor) {
      e.target.style.backgroundColor = currentColor;
    } else {
      e.target.style.backgroundColor = 'white';
    }
  };

  module.changeColorContinuous = function(e) {
    if(mouseIsDown) {
      e.target.style.backgroundColor = currentColor;
    }
  };

  module.storeColor = function(e){
    currentColor = e.target.style.backgroundColor;
    currentColorDisplay.style.backgroundColor = currentColor;
  };

  module.saveData = function(){
    var dataArray =[];
    pixelData = document.body.querySelectorAll('.pixCell');
    for(var i = 0; i < pixelData.length; i++){
      dataArray.push(pixelData[i].style.backgroundColor);
    }
    localStorage.setItem('pixStorage',JSON.stringify(dataArray)); // this saves data to local storage
  };

  module.getData = function(){
    var data = JSON.parse(localStorage.getItem('pixStorage'));
    console.log("getdata",data);
    console.log(data);
    var matches = document.body.querySelectorAll('.pixCell');
    for(var i = 0; i < matches.length; i++){
      matches[i].style.backgroundColor = data[i];
    }
  };

  //now let's see if we can make a tool that continuously changes color
  //over different colors (i.e. rainbow lines)

  module.createCanvas = function() {
    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
        var pixCell = document.createElement('div');
        pixCell.className = 'pixCell';
        pixCell.style.width = pixelSize;
        pixCell.style.height = pixelSize;
        pixCell.style.left = (x * pixelSize) + 'px';
        pixCell.style.top = (y * pixelSize) + 'px';
        pixCell.addEventListener('mousedown', module.changeColor);
        pixCell.addEventListener('mouseover', module.changeColorContinuous);
        pixCell.addEventListener('dragover', function(evt) {
          mouseIsDown = true;
          module.changeColorContinuous(evt);
        });
        ppCanvas.appendChild(pixCell);
      }
    }
  };

  module.createColorSwatch = function() {
    for(var col in colors){
      var pixColor = document.createElement('div');
      pixColor.className = 'colorSwatch';
      pixColor.addEventListener('click', module.storeColor);
      pixColor.style.backgroundColor = colors[col];
      pixColor.style.width = swatchSize + 'px';
      pixColor.style.height = swatchSize + 'px';

      colorDiv.appendChild(pixColor);
    }
  };

  ppCanvas.style.width = (width * pixelSize) + 2;
  ppCanvas.style.height = (height * pixelSize) + 2;
  ppCanvas.id = 'ppCanvas';

  colorDiv.style.width = (8 * swatchSize) + (swatchSize) + 'px';
  colorDiv.id = 'colorDiv';
  colorDiv.style.left = (parseInt(ppCanvas.style.width) + swatchSize + pixelSize) + 'px';

  controlsDiv.style.width = (8 * swatchSize) + (swatchSize) + 'px';
  controlsDiv.id = 'controlsDiv';
  controlsDiv.style.left = (parseInt(ppCanvas.style.width) + swatchSize + pixelSize) + 'px';

  currentColorDisplay.id = 'currentColorDiv';
  currentColorDisplay.innerHTML = 'color';
  currentColorDisplay.style.backgroundColor = currentColor;
  //currentColorDisplay.style.width = (8 * swatchSize) + (swatchSize) + 'px';
  currentColorDisplay.style.height = swatchSize + 'px';

  clearButton.addEventListener('click',module.clearCanvas);
  clearButton.innerHTML = '💣';
  controlsDiv.appendChild(clearButton);

  saveButton.addEventListener('click',module.saveData);
  saveButton.innerHTML = '💾';
  controlsDiv.appendChild(saveButton);

  fetchButton.addEventListener('click',module.getData);
  fetchButton.innerHTML = '🗁';
  controlsDiv.appendChild(fetchButton);

  //turn off continuous drawing when mouse is released
  document.addEventListener('mouseup', function() {mouseIsDown = false;});
  //disable drag
  document.addEventListener('drag', function(){mouseIsDown = false;});

  module.createCanvas();
  module.createColorSwatch();
  colorDiv.appendChild(currentColorDisplay);
  colorDiv.appendChild(controlsDiv);
  ppDiv.appendChild(colorDiv);
  ppDiv.appendChild(ppCanvas);

  return module;
}

var pp = pixelPainter(64, 64);