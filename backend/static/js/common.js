$(document).ready(function() {

	var $html = $('html'),
			$container = $('#container'),
			$prompt = $('#prompt'),
			$toggle = $('#toggle'),
			$about = $('#about'),
			$scene = $('#scene');

			$('.sound').click(function() {
	  		$(this).toggleClass('sound-mute');
			});




		//TIME
		// function rainbow() {
		//   $('.navigation li').each(function() {
		//     $(this).addClass('selected');
		//     setTimeout (function() {
		//       $(this).removeClass('selected');
		//     }, 9000);
		//   });
		// }

	// //scrollTo 0
	// (function() {
	// 	setTimeout(function(){window.scrollTo(0,0);},0);
	// })();

	//FastClick
	FastClick.attach(document.body);

	//Underscore
	window.onresize = _.debounce(resize, 200);
	window.onscroll = _.debounce(resize, 200);

	var scene = $('#scene').get(0);
	var parallaxInstance = new Parallax(scene);

	$(document).ready(function(){
	  $(".owl-carousel").owlCarousel({
			items: 1,
			nav: false,
			navText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'],
			loop: true
		});
	});

	// CANVAS
		'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PI2 = 2 * Math.PI;
	// amount is relative to screen size, this is the divider
	// for the result (hight * width)
	var AMOUNT_DIVIDER = 5000;
	// the connect star field
	var DIST_MAX = 100;
	var CONNECT_RADIUS = 100;
	// speed of rotating
	var ROTATION = 0.0001;

	var canvas = document.getElementById('stars');
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;

	var ctx = canvas.getContext('2d');
	ctx.lineWidth = 0.4;

	var bounds = {
	  top: -10,
	  left: -10,
	  right: canvas.width + 10,
	  bottom: canvas.height + 10
	};

	var center = {
	  x: Math.floor(canvas.width / 2),
	  y: Math.floor(canvas.height / 2)
	};

	var connectArea = {
	  destX: 0,
	  destY: 0,
	  x: center.x,
	  y: center.y
	};

	/*
	the dots
	*/
	var dots = [];

	var Dot = function () {
	  function Dot() {
	    _classCallCheck(this, Dot);

	    this.x = Math.random() * canvas.width;
	    this.y = Math.random() * canvas.height;
	    this.radius = Math.random() * 1.2;
	  }

	  Dot.prototype.update = function update() {
	    if (this.y > bounds.bottom) this.y = bounds.top;else if (this.y < bounds.top) this.y = bounds.bottom;
	    this.x = Math.cos(ROTATION) * (this.x - center.x) - Math.sin(ROTATION) * (this.y - center.y) + center.x;
	    this.y = Math.sin(ROTATION) * (this.x - center.x) + Math.cos(ROTATION) * (this.y - center.y) + center.y;
	  };

	  Dot.prototype.draw = function draw() {
	    ctx.beginPath();
	    ctx.fillStyle = '#fff';
	    if (Math.random() < 0.99) ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
	    ctx.fill();
	  };

	  return Dot;
	}();
	/*
	  and lets start
	*/

	function resize() {
	  canvas.width = canvas.offsetWidth;
	  canvas.height = canvas.offsetHeight;

		$scene[0].style.width = window.innerWidth + 'px';
		$scene[0].style.height = window.innerHeight + 'px';

	  bounds.right = canvas.width - 1;
	  bounds.bottom = canvas.height - 1;

	  ctx.lineWidth = 0.4;

	  center = {
	    x: Math.floor(canvas.width / 2),
	    y: Math.floor(canvas.height / 2)
	  };

	  connectArea.destX = center.x;
	  connectArea.destY = center.y * 0.1;

	  dots.length = 0;

	  var amount = Math.floor(canvas.width * canvas.height / AMOUNT_DIVIDER);
	  for (var i = 0; i < amount; i++) {
	    dots.push(new Dot());
	  }
	}

	resize();
	animateDots();

	/*
	  funtctions
	*/

	function updateConnectArea() {
	  var distX = connectArea.destX - connectArea.x;
	  if (distX > 5 || distX < 5) connectArea.x += Math.floor(distX / 20);
	  var distY = connectArea.destY - connectArea.y;
	  if (distX > 5 || distX < 5) connectArea.y += Math.floor(distY / 20);
	}

	function connectDots() {
	  for (var i = 0, dot1; dot1 = dots[i]; i++) {
	    for (var j = i + 1, dot2; dot2 = dots[j]; j++) {

	      var xDiff = dot1.x - dot2.x,
	          yDiff = dot1.y - dot2.y;
	      var xCoreDiff = dot1.x - connectArea.x,
	          yCoreDiff = dot1.y - connectArea.y;

	      if (xDiff < DIST_MAX && xDiff > -DIST_MAX && yDiff < DIST_MAX && yDiff > -DIST_MAX && xCoreDiff < CONNECT_RADIUS && xCoreDiff > -CONNECT_RADIUS && yCoreDiff < CONNECT_RADIUS && yCoreDiff > -CONNECT_RADIUS) {

	        ctx.beginPath();
	        ctx.strokeStyle = 'hsla(0,100%,100%,0.2)';
	        ctx.moveTo(dot1.x + 0.0, dot1.y + 0.0);
	        ctx.lineTo(dot2.x + 0.0, dot2.y + 0.0);
	        ctx.stroke();
	        ctx.closePath();
	      }
	    }
	  }
	}

	function animateDots() {
	  requestAnimationFrame(animateDots);

	  ctx.clearRect(0, 0, canvas.width, canvas.height);

	  updateConnectArea();

	  for (var i = 0, dot; dot = dots[i]; i++) {
	    dot.update();
	  }connectDots();
	  for (var i = 0, dot; dot = dots[i]; i++) {
	    dot.draw();
	  }
	}

	document.body.addEventListener('mousemove', function (e) {
	  connectArea.destX = e.clientX || e.touches && e.touches[0].pageX;
	  connectArea.destY = e.clientY || e.touches && e.touches[0].pageY;
	});

	document.body.addEventListener('mouseleave', function (e) {
	  connectArea.destX = center.x;
	  connectArea.destY = center.y;
	});

	window.addEventListener('resize', resize);

	var mixitup = require('mixitup');
  var mixer = mixitup('#portfolio_grid');


		$(".portfolio li").click(function() {
			$(".portfolio li").removeClass("active");
			$(this).addClass("active");
		});

		$(".popup").magnificPopup({type:"image"});
		$(".popup_content").magnificPopup({
			type:"inline",
			midClick: true
		});

	  $(".portfolio_item").each(function(i) {
			$(this).find("button").attr("href", "#work_" + i);
			$(this).find(".podrt_descr").attr("id", "work_" + i);
		});

	        // Creating the Canvas
	        var canvas = document.getElementById('spart'),
	            c = canvas.getContext("2d"),
	            particles = {},
	            particleIndex = 0,
	            particleNum = 0.1;

	        canvas.width = window.innerWidth;
	        canvas.height = window.innerHeight;
	        canvas.id = "motion";
	        document.body.appendChild(canvas);
	        // Finished Creating Canvas

	        // Setting color which is just one big square
	        c.fillStyle = "black";
	        c.fillRect(0,0,canvas.width,canvas.height);
	        // Finished Color
	        var y_fourth = Math.floor(canvas.height / 4);
	        var y_second_fourth = Math.floor(y_fourth * 2);

	        function Particle(){
	            var random_x = Math.floor(Math.random() * (0)) + 1;
	            var random_y = Math.floor(Math.random() * y_second_fourth + y_fourth) + 1;
	            this.x = random_x;
	            this.y = random_y;
	            this.vx = Math.random() * 5 - 2;
	            this.vy = Math.random() * 2 - 1;
	            this.gravity = 0;
	            particleIndex++;
	            particles[particleIndex] = this;
	            this.id = particleIndex;
	            this.size = Math.random() * 6 - 2;
	            this.color = "hsla(0,0%,"+parseInt(Math.random()*100, 0)+"%,1)";
	            this.color2 = "hsla(360,100%,"+parseInt(Math.random()*100, 0)+"%,1)";
	            this.color3 = "hsla(210,100%,"+parseInt(Math.random()*100, 0)+"%,1)";
	            this.color_selector = Math.random() * 150 - 1;

	        }

	        Particle.prototype.draw = function(){
				this.x += this.vx;
				this.y += this.vy;
				this.vy += this.gravity;
				if(this.x > canvas.width || this.y > canvas.height){
					delete particles[this.id];
				}

				if(this.color_selector < 30 && this.color_selector > 10){
					c.fillStyle = this.color2;
				} else if(this.color_selector < 10) {
					c.fillStyle = this.color3;
				} else {
					c.fillStyle = this.color;
				}
				c.fillRect(this.x, this.y, this.size, this.size);
			};

	        setInterval(function(){
	            c.fillStyle = "black";
	            c.fillRect(0,0,canvas.width,canvas.height);
	            for (var i = 0; i < particleNum; i++){
	                new Particle();
	            }
	            for(var i in particles){
	                particles[i].draw();
	            }
	        }, 30);

 });
