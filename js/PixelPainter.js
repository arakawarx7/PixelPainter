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
  var swatchSize = 16;
  var savedDataDiv = document.createElement('div');
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

  ppCanvas.style.width = (width * pixelSize) + 2;
  ppCanvas.style.height = (height * pixelSize) + 2;
  ppCanvas.style.position = 'relative';
  ppCanvas.style.border = "2px solid black";
  ppCanvas.style.margin = "4px";

  colorDiv.style.width = (8 * swatchSize) + (swatchSize) + 'px';
  colorDiv.style.position = 'fixed';
  colorDiv.style.border = "2px solid black";
  colorDiv.style.left = (parseInt(ppCanvas.style.width) + swatchSize + pixelSize) + 'px';

  controlsDiv.style.width = (8 * swatchSize) + (swatchSize) + 'px';
  controlsDiv.style.position = 'fixed';
  controlsDiv.style.border = "2px solid black";
  controlsDiv.style.left = (parseInt(ppCanvas.style.width) + swatchSize + pixelSize) + 'px';




  var clearButton = document.createElement('button');
  module.clearCanvas = function(){
    var matches = document.body.querySelectorAll('.pixCell');
    for(var i = 0; i < matches.length; i++){
      matches[i].style.backgroundColor = 'white';
    }
  };
  clearButton.addEventListener('click',module.clearCanvas);
  clearButton.innerHTML = 'clear';
  controlsDiv.appendChild(clearButton);

  module.changeColor = function(e) {
    mouseIsDown = true;
    if(e.target.style.backgroundColor !== currentColor) {
      e.target.style.backgroundColor = currentColor;
    } else {
      e.target.style.backgroundColor = 'white';
    }
  };

  module.saveData = function(){
    var dataArray =[];
    pixelData = document.body.querySelectorAll('.pixCell');
    for(var i = 0; i < pixelData.length; i++){
      dataArray.push(pixelData[i].style.backgroundColor);
      }
    localStorage.setItem('pixStorage',JSON.stringify(dataArray)); // this saves data to local storage
    //to get back this data.   call--> JSON.parse(localStorage.getItem('pixStorage')) <--
      console.log(dataArray);
  }


    saveButton.addEventListener('click',module.saveData);
    saveButton.innerHTML = 'save';
    controlsDiv.appendChild(saveButton);

    module.getData = function(){
      var data = JSON.parse(localStorage.getItem('pixStorage'));
      console.log("getdata",data);
      console.log(data);
      var matches = document.body.querySelectorAll('.pixCell');
      for(var i = 0; i < matches.length; i++){
        matches[i].style.backgroundColor = data[i];
      }

    };
    fetchButton.addEventListener('click',module.getData);
    fetchButton.innerHTML = 'fetch';
    controlsDiv.appendChild(fetchButton);

    // var dataBox = document.createElement('INPUT');
    // dataBox.innerHTML = dataBox;
    // ppDiv.appendChild(dataBox);

  module.changeColorContinuous = function(e) {
    if(mouseIsDown) {
      e.target.style.backgroundColor = currentColor;
    }
  };

  //now let's see if we can make a tool that continuously changes color
  //over different colors (i.e. rainbow lines)

  module.storeColor = function(e){
    currentColor = e.target.style.backgroundColor;
  };

  //do work here
  module.createCanvas = function() {
    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
        var pixCell = document.createElement('div');
        pixCell.className = 'pixCell';
        pixCell.style.width = pixelSize;
        pixCell.style.height = pixelSize;
        pixCell.style.border = '1px dotted black';
        pixCell.style.position = 'absolute';
        pixCell.style.left = (x * pixelSize) + 'px';
        pixCell.style.top = (y * pixelSize) + 'px';
        pixCell.style.backgroundColor = 'white';
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
      pixColor.style.border = '1px solid black';
      pixColor.style.backgroundColor = colors[col];
      pixColor.style.width = swatchSize + 'px';
      pixColor.style.height = swatchSize + 'px';
      pixColor.style.display = 'inline-block';

      colorDiv.appendChild(pixColor);
    }
  };

  //turn off continuous drawing when mouse is released
  document.addEventListener('mouseup', function() {mouseIsDown = false;});
  //disable drag
  document.addEventListener('drag', function(){mouseIsDown = false;});

  module.createCanvas();
  module.createColorSwatch();
  colorDiv.appendChild(controlsDiv);
  ppDiv.appendChild(colorDiv);
  ppDiv.appendChild(ppCanvas);

  return module;
}

var pp = pixelPainter(64, 64);