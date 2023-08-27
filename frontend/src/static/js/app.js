import '../sass/app.sass';

/* Your JS Code goes here */
$(document).ready(function () {

    var scene = $('#scene');
    new Parallax(scene.get(0));

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
            if (this.y > bounds.bottom) this.y = bounds.top; else if (this.y < bounds.top) this.y = bounds.bottom;
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

        scene[0].style.width = window.innerWidth + 'px';
        scene[0].style.height = window.innerHeight + 'px';

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
        } connectDots();
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

	resize();
	animateDots();

});
