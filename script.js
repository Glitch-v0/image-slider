// create an array of tuples with 3 parts: image source, visible text, and alt text
var sources = [
    ['./pictures/bath.svg', 'Fun soaking', 'sunny bubble bath illustration'],
    ['./pictures/camera.svg', 'Memorable moments', 'polaroid camera illustration'],
    ['./pictures/coconut.svg', 'Special sights', 'palm trees illustration'],
    ['./pictures/drink.svg', 'Delicious treats', 'coffee and donut illustration'],
    ['./pictures/hotel.svg', 'Restful stays', 'hotels illustration']
];
  
var pictures = [];
const picFrame = document.getElementById('slide-background');


for (var i = 0; i < sources.length; i++) {
    const newImage = new Image(100, 100);
    newImage.src = sources[i][0]; // access the first element of the tuple
    newImage.alt = sources[i][2]; // access the third element of the tuple
    newImage.id = 'img-'+ sources[i][1]; // access the second element of the tuple
    pictures.push(newImage);
}


let numOfPictures = pictures.length;
let currentIndex = 0;

const slideSelector = document.getElementById('slide-selector');
let buttonSelectors = [];

//Select Picture Buttons
for (var i = 0; i < sources.length; i++) {
    const buttonIndex = i;
    const newSelectionButton = document.createElement('button');
    newSelectionButton.className = 'image-selection-button';
    newSelectionButton.alt = 'image-selection-button';
    newSelectionButton.id = 'image-selection-button-'+ sources[i][1]; // access the second element of the tuple
    slideSelector.appendChild(newSelectionButton);
    buttonSelectors.push(newSelectionButton);
    newSelectionButton.addEventListener("click", function () {
        console.log(`Clicked ${newSelectionButton.id}!`)
        currentIndex = buttonIndex;
        console.log({currentIndex})
        pictureSwap(0);
    })
}

//Initial Picture
picFrame.appendChild(pictures[0]);
buttonSelectors[0].classList.add('current-selection-button');
const intialPicText = document.createElement('p');
intialPicText.textContent = pictures[0].id.slice(4);
picFrame.appendChild(intialPicText);

const forwardButton = document.getElementById('forward-button');
const backButton = document.getElementById('back-button');




function pictureSwap(indexChange, msg='Changing picture') {
    // console.log(msg)
    currentIndex = currentIndex + indexChange;
    // Resets back to 0 if at end of pictures    
    if (currentIndex === numOfPictures) {
        currentIndex = 0;
    } else if (currentIndex === -1) {
        // Resets back to last picture if at beginning of pictures
        currentIndex = numOfPictures-1;
    }
    const currentPic = picFrame.firstElementChild;
    const currentText = picFrame.lastElementChild;
    let currentButton = buttonSelectors[currentIndex];
    buttonSelectors.forEach(button => {
        button.classList.remove('current-selection-button');
    });
    currentButton.classList.add('current-selection-button');
    // console.log(currentButton.id)

    const newPic = pictures[currentIndex];
    const newText = document.createElement('p');
    newText.textContent = pictures[currentIndex].id.slice(4);
    
    currentPic.className = 'fade-out';
    currentText.className = 'fade-out';
    newPic.className = 'fade-in';
    newText.className = 'fade-in';
    setTimeout(function() { // wait for 1 second
        picFrame.replaceChild(newPic, currentPic); 
        picFrame.replaceChild(newText, currentText)
        setTimeout(function() { // wait for another 1 second
          newPic.className = ''; // remove fade-in class from new image
          newText.className = '';// remove fade-in class from new text
        }, 200);
      }, 1000);
  }

let currentTimer;
const waitDuration = 5000;

function replacePicture() {
    pictureSwap(1);
    currentTimer = setTimeout(replacePicture, waitDuration);
}

currentTimer = setTimeout(replacePicture, waitDuration);

forwardButton.addEventListener('click', function () {
    clearTimeout(currentTimer);
    pictureSwap(1);
    currentTimer = setTimeout(replacePicture, waitDuration);
})
backButton.addEventListener('click', function () {
    clearTimeout(currentTimer);
    pictureSwap(-1);
    currentTimer = setTimeout(replacePicture, waitDuration);
})