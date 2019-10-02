/**
 * Name: Lebohang Mokoena
 * Email: lebohang0824@gmail.com
 * Github: badb33
 *
 * Simple snake game with vanilla javascript.
 */

 // Global variables
let _steps = 10;
let _speed = 400;
let direction = 'right';


// **********************************************************************
// Start 
// **********************************************************************

foodPosition();

setInterval(function () {
	move(_speed, _steps);
}, _speed);



// **********************************************************************
// Handle movement
// **********************************************************************

function move(speed, steps) {

	let elements = document.getElementsByClassName('snake');

	wallPenetration(elements, speed, steps);

	// Capture food.
	capture(document.getElementById('food'), elements[0]);
	
	for (let i = 0; i < elements.length; i++) {

		let timeout = i * speed;
		
		// Each element follow direction on its given time
		moveToDirection(elements[i], direction, steps, timeout);

	}
}

function moveToDirection(el, direction, steps, timeout) {
	setTimeout(function () {
		switch (direction) {
			case 'left':
				moveLeft(el, steps);
				break;
			case 'up':
				moveUp(el, steps);
				break;
			case 'right':
				moveRight(el, steps);
				break;
			case 'down':
				moveDown(el, steps);
				break;
			default:
				moveRight(el, steps);
				break;
		}
	}, timeout);
}

function moveLeft(el, steps) {
	let propValue = getCssPropValue(el, 'left') - steps;
	el.style['left'] = propValue+ 'px';
}

function moveUp(el, steps) {
	let propValue = getCssPropValue(el, 'top') - steps;
	el.style['top'] = propValue+ 'px';
}

function moveRight(el, steps) {
	let propValue = getCssPropValue(el, 'left') + steps;
	el.style['left'] = propValue+ 'px';
}

function moveDown(el, steps) {
	let propValue = getCssPropValue(el, 'top') + steps;
	el.style['top'] = propValue+ 'px';
}


// **********************************************************************
// Handle event
// **********************************************************************

document.addEventListener('keydown', function (e) {
	switch (e.keyCode) {
		case 37:
			direction = 'left';
			break;
		case 38:
			direction = 'up';
			break;
		case 39:
			direction = 'right';
			break;
		case 40:
			direction = 'down';
			break;
		default:
			direction = 'right';
			break;
	}
});

// **********************************************************************
// Food
// **********************************************************************

function foodPosition() {
			
	let xPosition = randomizePosition();
	let yPosition = randomizePosition();

	let food = document.getElementById('food');

	food.style.top  = yPosition +'px';
	food.style.left = xPosition +'px';
}

function capture(food, snake) {
	let snakeXPosition = getCssPropValue(snake, 'left');
	let snakeYPosition = getCssPropValue(snake, 'top');

	let foodXPosition  = getCssPropValue(food, 'left');
	let foodYPosition  = getCssPropValue(food, 'top');

	// Capture when the snake reach the exact position of the food (X and Y axis).
	if (snakeXPosition == foodXPosition && snakeYPosition == foodYPosition) {
		if (food.hasAttribute('id')) {
			food.setAttribute('class', 'snake');
			food.removeAttribute('id');
			createFood();			
		}
	}	
}

function createFood() {
	let container = document.getElementsByClassName('container')[0];
	container.insertAdjacentHTML("beforeEnd", '<span id="food"></span');
	foodPosition();
}

// **********************************************************************
// Misc
// **********************************************************************

function getCssPropValue(el, prop) {
	let style = getComputedStyle(el);
	return parseInt(style.getPropertyValue(prop))
}

function randomizePosition() {
	let number = Math.floor(Math.random() * 380);
	return Math.round(number / 10) * 10;
}


// **********************************************************************
// Validations
// **********************************************************************

function wallPenetration(elements, speed, steps) {

	let firstElement = elements[0];
	let maxWidth = containerWidth() - steps;
	let maxHeight = containerHeight() - steps;

	if (getCssPropValue(firstElement, 'left') < 0) {

		// Reset 
		for (let i = 0; i < elements.length; i++) {

			let el = elements[i];
			let timeout = i * speed;

			showOnOtherSide(el, 'left', timeout);
		}
	}

	if (getCssPropValue(firstElement, 'left') >= maxWidth) {

		// Reset 
		for (let i = 0; i < elements.length; i++) {

			let el = elements[i];
			let timeout = i * speed;
			
			if (direction == 'right') {
				showOnOtherSide(el, 'right', timeout);
			}
			
		}
	}

	if (getCssPropValue(firstElement, 'top') < 0) {

		// Reset 
		for (let i = 0; i < elements.length; i++) {

			let el = elements[i];
			let timeout = i * speed;

			showOnOtherSide(el, 'top', timeout);
		}
	}

	if (getCssPropValue(firstElement, 'top') >= maxHeight) {

		// Reset 
		for (let i = 0; i < elements.length; i++) {

			let el = elements[i];
			let timeout = i * speed;
			
			if (direction == 'down') {
				showOnOtherSide(el, 'down', timeout);
			}
			
		}
	}

}

function showOnOtherSide(el, side, timeout) {

	setTimeout(function () {

		switch (side) {
			case 'left':
				el.style[side] = containerWidth() +'px';
				break;
			case 'top':
				el.style[side] = containerWidth() +'px';
				break;
			case 'right':
				el.style['left'] = '-10px';
				break;
			case 'down':
				el.style['top'] = '-10px';
				break;
		}
		
	}, timeout);
}

function containerWidth() {
	return getCssPropValue(document.getElementsByClassName('container')[0], 'width');
}

function containerHeight() {
	return getCssPropValue(document.getElementsByClassName('container')[0], 'height');
}



