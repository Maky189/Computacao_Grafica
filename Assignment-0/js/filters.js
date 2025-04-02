"use strict";

var Filters = Filters || {};

////////////////////////////////////////////////////////////////////////////////
// General utility functions
////////////////////////////////////////////////////////////////////////////////

// Constrain val to the range [min, max]
function clamp(val, min, max) {
  /* Shorthand for:
   * if (val < min) {
   *   return min;
   * } else if (val > max) {
   *   return max;
   * } else {
   *   return val;
   * }
   */
  return ((val < min) ? min : ((val > max) ? max : val));
}

// extract vertex coordinates from a URL string
function stringToCoords( vertsString ) {
  var centers = [];
  var coordStrings = vertsString.split("x");
  var coordsSoFar = 0;
  for (var i = 0; i < coordStrings.length; i++) {
    var coords = coordStrings[i].split("y");
    var x = parseInt(coords[0]);
    var y = parseInt(coords[1]);
    if (!isNaN(x) && !isNaN(y)) {
      centers.push({x: x, y: y})
    }
  }

  return centers;
}

////////////////////////////////////////////////////////////////////////////////
// Filters
////////////////////////////////////////////////////////////////////////////////

// Fill the entire image with color
Filters.fillFilter = function( image, color ) {
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      //uncomment this line to enable this function
      image.setPixel(x, y, color);
    }
  }
  return image;
};

// At each center, draw a solid circle with the specified radius and color
Filters.brushFilter = function( image, radius, color, vertsString ) {
  // centers is an array of (x, y) coordinates that each defines a circle center
  var centers = stringToCoords(vertsString);

  // draw a filled circle centered at every location in centers[].
  
  //Take each center
  for(var center of centers) {
    
    //Loop thoroug image
    for(var i = 0; i < image.width; i++){
      for(var j = 0; j < image.height; j++) {
        
        //Calculate distance from pixel provided to the center of circle
        var distance = (i - center.x) * (i - center.x) + (j - center.y) * (j - center.y);

        //Check if pixel is in radius
        if(distance <= radius * radius) {
          image.setPixel(i, j, color);
        }
      }
    }
  }
  // radius and color are specified in function arguments.
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 10 lines of code.
  // ----------- STUDENT CODE END ------------
  //Gui.alertOnce ('brushFilter is not implemented yet');

  return image;
};

/*
 * At each center, draw a soft circle with the specified radius and color.
 * Pixel opacity should linearly decrease with the radius from alpha_at_center to 0.
 */
Filters.softBrushFilter = function( image, radius, color, alpha_at_center, vertsString ) {
  var centers = stringToCoords(vertsString);

  for (var center of centers) {
    for (var i = 0; i < image.width; i++) {
      for (var j = 0; j < image.height; j++) {
        var distanceSquared = (i - center.x) * (i - center.x) + (j - center.y) * (j - center.y);

        if (distanceSquared <= radius * radius) {
          var distance = Math.sqrt(distanceSquared);
          var opacity = alpha_at_center * (1 - distance / radius);
          var pixelColor = new Pixel(
            color.data[0],
            color.data[1],
            color.data[2],
            opacity,
            "rgb"
          );

          var existingPixel = image.getPixel(i, j);
          var blendedPixel = new Pixel(
            existingPixel.data[0] * (1 - opacity) + pixelColor.data[0] * opacity,
            existingPixel.data[1] * (1 - opacity) + pixelColor.data[1] * opacity,
            existingPixel.data[2] * (1 - opacity) + pixelColor.data[2] * opacity,
            1,
            "rgb"
          );

          image.setPixel(i, j, blendedPixel);
        }
      }
    }
  }

  return image;
};


Filters.customFilter = function(image, value) {
  const gx = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
  ];
  const gy = [
    [-1, -2, -1],
    [ 0,  0,  0],
    [ 1,  2,  1]
  ];

  const copy = image.copyImg();

  for (let i = 0; i < image.height; i++) {
    for (let j = 0; j < image.width; j++) {
      let redX = 0, greenX = 0, blueX = 0;
      let redY = 0, greenY = 0, blueY = 0;

      for (let li = -1; li <= 1; li++) {
        for (let lj = -1; lj <= 1; lj++) {
          const ni = i + li;
          const nj = j + lj;

          if (ni >= 0 && ni < image.height && nj >= 0 && nj < image.width) {
            const pixel = copy.getPixel(nj, ni);

            redX += pixel.data[0] * gx[li + 1][lj + 1];
            greenX += pixel.data[1] * gx[li + 1][lj + 1];
            blueX += pixel.data[2] * gx[li + 1][lj + 1];

            redY += pixel.data[0] * gy[li + 1][lj + 1];
            greenY += pixel.data[1] * gy[li + 1][lj + 1];
            blueY += pixel.data[2] * gy[li + 1][lj + 1];
          }
        }
      }

      const red = Math.min(1, Math.sqrt(redX * redX + redY * redY));
      const green = Math.min(1, Math.sqrt(greenX * greenX + greenY * greenY));
      const blue = Math.min(1, Math.sqrt(blueX * blueX + blueY * blueY));

      image.setPixel(j, i, new Pixel(red, green, blue, 1, "rgb"));
    }
  }

  return image;
};
