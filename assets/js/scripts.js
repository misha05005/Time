'use strict'

/*
* Buttons
* */
let startBtn = document.getElementById('counter__start-pause');
let resetBtn = document.getElementById('counter__reset');

/*
* Base Init
* */
let startHours   = 0;
let startMinutes = 0;
let startSeconds = 0;
let startText    = 'Start Timer';
let stopText     = 'Stop Timer';
let startInterval;
let flag = true;

/*
* Timer zones
* */
let hours   = document.getElementById('counter__hour');
let minutes = document.getElementById('counter__minutes');
let seconds = document.getElementById('counter__seconds');

/*
* Functions
* */
// Units Of Time
let initUnits = (amountUnits, selectorUnits) => {
	if (amountUnits < 10)
		selectorUnits.innerHTML = '0' + amountUnits;
	else if (amountUnits > 9 && amountUnits <= 59)
		selectorUnits.innerHTML = amountUnits;
	else if (amountUnits >= 59)
		selectorUnits.innerHTML = "0" + 0;
};

// Start Timer
let startCount = (callbackFunc, amountUnits, selectorUnits) => {
	callbackFunc(amountUnits, selectorUnits);
	return amountUnits;
};

/*
 * On Start Button
 * */
startBtn.onclick = () => {
	if (flag) {
		startBtn.innerText = stopText;
		startInterval = setInterval(() => {
			/*Seconds*/
				startSeconds++;
				if (startSeconds >= 60) {
					startSeconds = 0;
					
					/*Minutes*/
						startMinutes++;
						if (startMinutes >= 60) {
							startMinutes = 0;
							
							/*Hours*/
								startHours++;
								if (startHours >= 60) startHours = 0;
								startCount(initUnits, startHours, hours);
							/*Hours/ */
						}
					startCount(initUnits, startMinutes, minutes);
					/*Minutes/ */
				}
				startCount(initUnits, startSeconds, seconds);
			/*Seconds/ */
		}, 1000);
	} else {
		startBtn.innerText = startText;
		clearInterval(startInterval);
	}
	flag = !flag; // Change flag status
};

/*
* On Reset Button
* */
resetBtn.addEventListener('click', () => {
	clearInterval(startInterval); // Reset setInterval()
	
	/*
	* Reset counters
	* */
	startHours   = 0;
	startMinutes = 0;
	startSeconds = 0;
	
	/*
	* Reset layout
	* */
	hours.innerHTML   = '00';
	minutes.innerHTML = '00';
	seconds.innerHTML = '00';
	
	flag = true; // Change flag status
});