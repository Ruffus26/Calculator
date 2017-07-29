window.onload = function() {
   Particles.init({
     selector: '.background',
     maxParticles: 400,
     connectParticles: false,
     color: '#F0D879'
   });
 };

var numbers = document.querySelectorAll('.number'),
	display = document.getElementById('display'),
	on = document.getElementById('on'),
	off = document.getElementById('off'),
	clearBtn = document.getElementById('clear'),
	operations = document.querySelectorAll('.operation'),
	equal = document.getElementById('Equal'),
	dot = document.getElementById('dot'),
	MemoryCurrentNumber = 0,
	MemoryNewNumber = false,
	MemoryPendingOperation = '',
	hoWork = document.getElementById('hoWork'),
	SeeTheWork = document.getElementById('refresh');


	hoWork.addEventListener('click', function() {
		SeeTheWork.innerHTML = 'It Work Very Nice!';
	});

	on.addEventListener('click', StartCalc);

function StartCalc() {
	display.value ="START";

	off.addEventListener('click', StopCalc);

		clearBtn.addEventListener('click', ClearDisplay);

		dot.addEventListener('click', FloatNumber);

	for(var i = 0; i < numbers.length; i++) {
		var numberBtn = numbers[i];
		numberBtn.addEventListener('click', numberPress); 
	};

	for(var i = 0; i < operations.length; i++) {
		var operation = operations[i];
		operation.addEventListener('click', Resolve); 
	};
};

function numberPress(e) {
	if (MemoryNewNumber) {
		display.value = e.srcElement.innerText;
		MemoryNewNumber = false;
	} else {
		if (display.value != 'START' && display.value !== 0) {
			display.value += e.srcElement.innerText;
	} 	else {
			display.value = e.srcElement.innerText;
	}
	}
};

function Resolve(e) {
	localCurrentNumber = display.value;

	if (MemoryNewNumber && MemoryPendingOperation !== '=') {
		display.value = MemoryCurrentNumber;
	} else {
		MemoryNewNumber = true;
		if (MemoryPendingOperation === '+') {
			MemoryCurrentNumber += Number(localCurrentNumber);
		} else if (MemoryPendingOperation === '-') {
			MemoryCurrentNumber -= Number(localCurrentNumber);
		} else if (MemoryPendingOperation === '*') {
			MemoryCurrentNumber *= Number(localCurrentNumber);
		} else if (MemoryPendingOperation === '/'){
			MemoryCurrentNumber /= Number(localCurrentNumber);
		}
		else {
			MemoryCurrentNumber = Number(localCurrentNumber);
		}
	};
	display.value = MemoryCurrentNumber;
	MemoryPendingOperation = e.target.textContent;
};

function FloatNumber() {
	var localMemoryDecimal = display.value;

	if (MemoryNewNumber || display.value == "START") {
		localMemoryDecimal = '0.';
		MemoryNewNumber = false;
	} else {
		if(localMemoryDecimal.indexOf('.') === -1){
			localMemoryDecimal += '.';
		};
	};
	display.value = localMemoryDecimal;
};

function ClearDisplay() {
	display.value = null;
	MemoryCurrentNumber = 0;
	MemoryNewNumber = false;
	MemoryPendingOperation = '';
};

function StopCalc() {
	display.value = 'STOP';

	off.removeEventListener('click', StopCalc);

	clearBtn.removeEventListener('click', ClearDisplay);

	equal.removeEventListener('click', Equalize);

	dot.removeEventListener('click', FloatNumber);

	for(var i = 0; i < numbers.length; i++) {
		var numberBtn = numbers[i];
		numberBtn.removeEventListener('click', numberPress); 
	};

	for(var i = 0; i < operations.length; i++) {
		var operation = operations[i];
		operation.removeEventListener('click', Resolve); 
	};
};
