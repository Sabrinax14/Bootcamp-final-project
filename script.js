// Styling elements for timer circle 
const green = '#2ee22e';
const orange = '#ffae1b';

// creating a function for sound

let soundOnOff = true;
const audioPlayer = function () {
    if (soundOnOff === true) {
        let bell = new Audio (
            'https://cdn.pixabay.com/download/audio/2022/03/15/audio_2b08b6e711.mp3?filename=ship-bell-single-ring-81833.mp3'
        );
        bell.play();
        setTimeout(() => {
            bell.src = null;
        }, 3000);
    }
};

// declaring the all dom els for timer
const startBtn = document.querySelector('#submit');
const resetBtn = document.querySelector('#reset');
const pauseBtn = document.querySelector('#pause');

const timerEl = document.querySelector('#timer');
const cmdEl = document.querySelector('#command');
const roundEl = document.querySelector('#round');

const circleTimer = document.querySelector('.timer-container');
const setAlwaysOn = document.querySelector('#screen-on');
const soundBox = document.querySelector('#soundSwitch');

const formInputs = document.querySelectorAll('.form_input');
const setTime = document.querySelector('#setTime');
const setRest = document.querySelector('#setRest');
const setRounds = document.querySelector('#setRound');

let resumeBtn = document.getElementById('Resume');

// creating a msg el inside to circle timer 
const messenger = function (msg, parentElement, time = 3){
    if (parentElement.querySelector('msgElement')) {
      return ;
    } else {
        let msgElement = document.createElement('p');
        msgElement.innerHTML = msg;
        msgElement.classList.add('msgElement');
        msgElement.classList.add('active');
        parentElement.appendChild(msgElement);
        parentElement.style.position = 'relative';
        setTimeout(() => {
            msgElement.classList.remove('active');
            msgElement.remove();
            parentElement.style.position = "";
        }, time * 1000);
    }
};


// creating setting for the reset using function

const restValues = function () {
    // console.log('restValues');
    setTime.value = 45;
    setRest.value = 15;
    setRounds.value = 5;
};
restValues();

// declaring variables for formating the time 
let interval;
let pauseInterval;
let time = setTime.value;
let rounds = setRounds.value;
let restTime = setRest.value
let isRunning = false;
let isRest = false;
let screenAlwaysOn = false;

// make a function to formating the time in timer
function sechuman(seconds) {
    // console.log('sechuman');
    // console.log(pauseBtn.textContent)
    
        //this is when paused

     if (pauseBtn.textContent === 'Pause') {
        //this is not paused
        sec = seconds % 60;
        min = parseInt(seconds / 60);
        // console.log('pain');
   if (sec.toString().length == 1) 
        sec = '0' + sec ;
    
    return min + ':' + sec;
  

}else if (pauseBtn.textContent === 'Paused'){

}
}
//  adding evenetlistener and setting timer 
const timerSettings = function () {
    // console.log('timerSettings');
    time = setTime.value;
    rounds = setRounds.value;
    restTime = setRest.value;
    timerEl.innerHTML = sechuman(time);
    roundEl.innerHTML = rounds;
};

// set timmers
  
function update(){
    // console.log('update', formInputs, setTime.timerEl);
    formInputs.forEach((inputs) =>{
        
        // allows inout values to be updated.
        console.log(inputs);
        if (time !== formInputs[0].value ) {
           time = formInputs[0].value; 
            timerEl.innerHTML = sechuman(formInputs[0].value );
          if(restTime !== formInputs[1].value){
            restTime = formInputs[1].value ;
            timerEl.innerHTML = sechuman(formInputs[1].value );
           if (rounds !== formInputs[2].value){
            rounds = formInputs[2].value ;
            roundEl.innerHTML = formInputs[2].value ;
           } 
          }
          timer();
        } else if( timerSettings()){

        };

        
    //    timerSettings();
 });  

};

const stopTraining = function () {
    // console.log('stopTraining');
    clearInterval(pauseInterval);
    clearInterval(interval);
    isRunning = false;
    time = setTime.value;
    rounds = setRounds.value;
    restTime = setRest.value;
    startBtn.innerHTML = 'Start';
    timerEl.innerHTML = sechuman(time); //might not be needed
    roundEl.innerHTML = rounds;
    circleTimer.style.background ='white';
    circleTimer.style.color ='black';
    cmdEl.innerHTML = 'Get Ready!';
    // changes the cmdel to 'Get Ready'
};

// creating the timer function using seinterval
function timer(){
    
    if (currentTime === 0){
      
    } else if ( currentTime > 0){
        time = currentTime
    }
//    console.log(formInputs[0].value)
    // console.log('timer');
    // console.log(pauseBtn.textContent,'timerel')
    if (pauseBtn.textContent === 'Paused'){
        // console.log('Paused');
        clearInterval(interval)
        // console.log(interval)
    } else if (pauseBtn.textContent === 'Pause')  {
     
//    console.log('running');
    audioPlayer(); // plays audio
    // starts training
    isRunning = true;
    circleTimer.style.background = green;
    circleTimer.style.color = 'white';
    roundEl.innerHTML = rounds;
    cmdEl.innerHTML ='Work!';
    /**this is problem */
    interval = setInterval(() => {
        // console.log('interval')
       timerEl.innerHTML = sechuman(time);
        time--;
        time < 0 ? audioPlayer() :"";

        // if the rounds  finish
        if (time < 0){
            // console.log('time');
            clearInterval(interval);
            rounds--;

            // rounds finish but exercie time is not finished
            if (rounds > 0) {
                // console.log('round');
                circleTimer.style.background = orange;
                circleTimer.style.color = 'white';
                cmdEl.innerHTML = 'Rest!';
                roundEl.innerHTML = rounds;
                pauseInterval = setInterval(() => {
                 timerEl.innerHTML = sechuman(restTime);
                    restTime--;
                    // rest times up
                    if (restTime < 0 ) {
                        // console.log('restTime');
                        clearInterval(pauseInterval);
                        restTime = setRest.value;
                        time = setTime.value;
                        return timer();
                    }
                }, 1000 );
            } // training finishes
            if (rounds === 0){
                // console.log('stopS')
                stopTraining();
                cmdEl.innerHTML = 'Great Job!';
            }
        }
    },1000);
} }


// // add event listenr to start, rest and pause buttn
startBtn.addEventListener('click', () => {
    // console.log('start', isRunning)
    !isRunning ? update() : stopTraining();
    !isRunning ? (startBtn.innerHTML = 'Start') : (startBtn.innerHTML = 'Finish');
},true);

resetBtn.addEventListener('click', () => {
    if(isRunning){
        restValues();
        timerSettings();
    }
});

// create event listenr for the pause button - when pressed will pasuse the timer and transform to resume button.
// resume button will start up the timer again and transform back to pause button.
let currentTime = 0
function pauseTimer (){
    
        pause = true;
        currentTime = timerEl.innerHTML;
        // console.log(currentTime, timerEl.innerHTML);
        timerEl.innerHTML = 'Paused';
     
        isRunning = false;
       //  let initaltimes = setTimeout(timer(), 1000);
        pauseBtn.innerHTML = "Paused";
       //  pauseBtn.classList.remove('Resume')
       timer();
       }  

function Resume() {
        timerEl.textContent = currentTime;
        console.log(currentTime);
        isRunning = true;
        console.log(timerEl);
      
        let number = sechuman(currentTime);
        console.log("get", number);
      
        pauseBtn.innerHTML = "Pause";
      
        paused = false;
      
        timer();
}

pauseBtn.addEventListener('click', () =>{
//   console.log('Pause', pauseBtn.innerHTML);
   resumeBtn.style.transform = "scale(1)";
    pauseTimer();
  
 
    
},true);
    

resumeBtn.addEventListener('click', () =>{
    // console.log('Resume', resumeBtn.innerHTML);
    resumeBtn.style.transform = "scale(0)";
    Resume();

   
      
},true);

circleTimer.addEventListener('click', () => {
    !isRunning ? timer(stopTraining) : stopTraining();
    !isRunning ? (startBtn.innerHTML = 'Start') : (startBtn.innerHTML = 'Finish');
});

// sound checkbox
soundBox.addEventListener('change', () => {
    // console.log(soundBox.checked);
    soundBox.checked ? (soundOnOff = true) : (soundOnOff = false);
});