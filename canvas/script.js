   //-- Canvas settings
   const canvas = document.querySelector("#draw");
   const ctx = canvas.getContext('2d');
   
   //-- Variables
   let isDrawing = false;
   let isRandom = false;
   let lastX = 0;
   let lastY = 0;
   let legendHeight = 80;

   let hue = 0;
   let direction = true;

   //-- Set the canvas size
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight-legendHeight;
   
   window.onresize = function() {
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight - legendHeight;
   }

   ctx.lineWidth = document.querySelector('input').value * 2;
   ctx.strokeStyle = 'blue';
   ctx.lineJoin = 'round';
   ctx.lineCap = 'round';

   //-- Draw function
   function draw(event) {
       //-- Stop when mouse is not clicked
       if (!isDrawing) return;
       //console.log(event);

       //-- Start from
       ctx.moveTo(lastX, lastY);
       //-- Go to
       ctx.lineTo(event.offsetX, event.offsetY);
       ctx.stroke();

       //-- Change hue when random is selected
       if (isRandom) {
           ctx.beginPath();
           ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
           hue+=5;
           if (hue > 360) {
               hue = 0;
           }
           //-- incr/dec lineWidth
           if (ctx.lineWidth > 70 || ctx.lineWidth < 10) {
               direction = !direction;
           }
           if (direction) {
               ctx.lineWidth++;
           } else {
               ctx.lineWidth--
           }
       } 

       //-- Update last position
       [lastX, lastY] = [event.offsetX, event.offsetY];
   }

   //-- Event Listeners
   canvas.addEventListener('mousemove', draw);
   canvas.addEventListener('mousedown', (event) => { 
       [lastX, lastY] = [event.offsetX, event.offsetY];
       isDrawing = true;
   });
   canvas.addEventListener('mouseup',   () => isDrawing = false);
   canvas.addEventListener('mouseout',  () => isDrawing = false);


   //--- Update size of marker
   const currSettings = document.querySelector(".settings");
   currSettings.addEventListener('click', function(){
       let newWidth = document.querySelector('input').value;
       ctx.lineWidth = newWidth * 2;
       ctx.beginPath();
       ctx.stroke();
   });

   //--- Event Triggers - Red
   const redSelector = document.getElementById("red-selector");
   redSelector.addEventListener('click', () => {
       console.log("Red has been selected");
       ctx.lineWidth = document.querySelector('input').value * 2;
       isRandom = false;
       ctx.beginPath();
       ctx.strokeStyle = 'red';
   });
   //--- Event Triggers - Green
   const greenSelector = document.getElementById("green-selector");
   greenSelector.addEventListener('click', () => {
       console.log("Green has been selected");
       ctx.lineWidth = document.querySelector('input').value * 2;
       isRandom = false;
       ctx.beginPath();
       ctx.strokeStyle = 'green';
   });
   //--- Event Triggers - blue
   const blueSelector = document.getElementById("blue-selector");
   blueSelector.addEventListener('click', () => {
       console.log("blue has been selected");
       ctx.lineWidth = document.querySelector('input').value * 2;
       isRandom = false;
       ctx.beginPath();
       ctx.strokeStyle = 'blue';
   });
   //--- Event Triggers - black
   const blackSelector = document.getElementById("black-selector");
   blackSelector.addEventListener('click', () => {
       console.log("black has been selected");
       ctx.lineWidth = document.querySelector('input').value * 2;
       isRandom = false;
       ctx.beginPath();
       ctx.strokeStyle = 'black';
   });
   //--- Event Triggers - pink
   const pinkSelector = document.getElementById("pink-selector");
   pinkSelector.addEventListener('click', () => {
       console.log("pink has been selected");
       ctx.lineWidth = document.querySelector('input').value * 2;
       isRandom = false;
       ctx.beginPath();
       ctx.strokeStyle = 'pink';
   });
   //--- Event Triggers - random
   const randomSelector = document.getElementById("random-selector");
   randomSelector.addEventListener('click', () => {
       console.log("random has been selected");
       isRandom = true;
       ctx.beginPath();
       ctx.strokeStyle = '#BADA55';
   });

   //--- Eraser
   const eraser = document.getElementById("eraser");
   eraser.addEventListener('click', function(){
       console.log('Eraser has been selected');
       ctx.lineWidth = document.querySelector('input').value * 2;
       isRandom = false;
       ctx.beginPath();
       ctx.strokeStyle = 'white';
   });

   //--- Clear All
   const clearAll = document.getElementById("clear-all");
   clearAll.addEventListener('click', function(){
       console.log('Clear-all has been selected');
       ctx.clearRect(0,0,canvas.width,canvas.height);
       ctx.beginPath();
   });
