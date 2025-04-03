# COS426 Assignment 0: Warm-up — Image Processing

This project was assigned in the Computer Graphics 2024/2025 class at the University of Mindelo. The assignment is based on the COS426 course material, which is publicly available. The goal of this project is to implement various image processing filters and understand the underlying algorithms.

## Overview

The assignment involves implementing several filters in the `filters.js` file. These filters are designed to manipulate images in different ways, such as filling the image with a solid color, applying brush effects, and detecting edges. Each filter requires an understanding of basic image processing concepts and mathematical operations.

This README provides a detailed explanation of each filter, including the equations and concepts used, to help future students understand and implement the filters.


## Filters

### 1. Fill Filter

**Description**:  
The Fill filter replaces every pixel in the image with a specified color. This creates a uniform image of the given color.

**Algorithm**:  
- Treat the image as a 2D matrix of pixels.
- Iterate over every pixel in the image.
- Set the color of each pixel to the specified color.

**Hints**:  
- Use nested loops to traverse the image.
- The color is typically represented as an array `[R, G, B, A]`, where each component is in the range `[0, 1]`.



### 2. Brush Filter

**Description**:  
The Brush filter draws solid circles of a specified radius and color at given center points. This creates a "paintbrush" effect.

**Algorithm**:  
- Parse the input string to extract the coordinates of the circle centers.
- For each center, iterate over the image pixels.
- Calculate the squared Euclidean distance between the current pixel and the center:

  \[
  \text{distance}^2 = (x - x_{\text{center}})^2 + (y - y_{\text{center}})^2
  \]

- If the distance is less than or equal to the square of the radius, update the pixel color.

**Hints**:  
- Use the equation for a circle:

  \[
  (x - h)^2 + (y - k)^2 \leq r^2
  \]

  where \((h, k)\) is the center and \(r\) is the radius.
- Avoid calculating the square root for efficiency; compare squared distances instead.



### 3. Soft Brush Filter

**Description**:  
The Soft Brush filter is similar to the Brush filter but includes opacity blending. The opacity decreases linearly from the center of the circle to its edge, creating a gradient effect.

**Algorithm**:  
- Parse the input string to extract the coordinates of the circle centers.
- For each center, iterate over the image pixels.
- Calculate the distance between the current pixel and the center.
- Compute the opacity as a linear function of the distance:

  \[
  \text{opacity} = \alpha_{\text{center}} \times \left(1 - \frac{\text{distance}}{\text{radius}}\right)
  \]

- Blend the new color with the existing pixel color using the formula:

  \[
  \text{blendedColor} = (1 - \text{opacity}) \times \text{existingColor} + \text{opacity} \times \text{newColor}
  \]

**Hints**:  
- Ensure the opacity is clamped to the range `[0, 1]`.
- Use the blending formula to combine the colors.



### 4. Custom Filter (Edge Detection)

**Description**:  
The custom filter implements edge detection using the Sobel operator. This highlights areas of high intensity change in the image, such as edges.

**Algorithm**:  
- Define two convolution matrices (\(g_x\) and \(g_y\)) for detecting horizontal and vertical gradients:

  \[
  g_x = \begin{bmatrix} -1 & 0 & 1 \\ -2 & 0 & 2 \\ -1 & 0 & 1 \end{bmatrix}, \quad
  g_y = \begin{bmatrix} -1 & -2 & -1 \\ 0 & 0 & 0 \\ 1 & 2 & 1 \end{bmatrix}
  \]

- For each pixel, apply the convolution matrices to compute the gradients in the x and y directions:

  \[
  G_x = \sum_{i=-1}^{1} \sum_{j=-1}^{1} g_x[i+1][j+1] \cdot \text{pixel}(x+i, y+j)
  \]

  \[
  G_y = \sum_{i=-1}^{1} \sum_{j=-1}^{1} g_y[i+1][j+1] \cdot \text{pixel}(x+i, y+j)
  \]

- Compute the gradient magnitude:

  \[
  G = \sqrt{G_x^2 + G_y^2}
  \]

- Normalize the gradient magnitude to the range `[0, 1]`.

**Hints**:  
- Use nested loops to apply the convolution matrices to each pixel.
- Handle edge cases where the convolution window extends beyond the image boundaries.
- Normalize the gradient magnitude to avoid values exceeding the valid range.


### Disclaimer

This project is for educational purposes only. Please take your time understanding the assignment and working on it.
