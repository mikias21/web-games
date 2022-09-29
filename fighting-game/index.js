const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Resize canvas 
canvas.width = 1024;
canvas.height = 576;

// Use canvas context for drawing shapes 
context.fillRect(0, 0, canvas.width, canvas.height);
