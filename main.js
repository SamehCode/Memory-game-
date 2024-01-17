
let blocksContainer = document.querySelector('.memory-game-blocks')

let allBlocks = Array.from(blocksContainer.children);

let arrKeys = [...allBlocks.keys()];

let enterBtn = document.getElementById('enter')

let duration = 1000;

let triesElement = document.querySelector('.tries span')

let nameSpan = document.querySelector('.name span');

let successSound = document.getElementById('success');

let failSound = document.getElementById('fail');

let timer = document.querySelector('.timer'),
    minutes = document.querySelector('.timer .minutes span'),
    seconds = document.querySelector('.timer .seconds span');

let finishMsg = document.getElementById('finish');

enterBtn.onclick = function(e) {
    e.target.parentElement.remove()
    
    let name = prompt('your name ?')
    if(name == null) {
        nameSpan.innerHTML = 'Unknown'
    }else {
        nameSpan.innerHTML = name
    }

    document.getElementById('gamePlay').play()
    


    let timeInterval =  setInterval(() => {
        if(seconds.innerHTML < 1) {
            minutes.innerHTML = minutes.innerHTML - 1;
            seconds.innerHTML = '60'
        }
   
        (seconds.innerHTML)--

        if(minutes.innerHTML == 0 && seconds.innerHTML == 1) {
            clearInterval(timeInterval)
            minutes.innerHTML = 'Time'
            seconds.innerHTML = 'up'
            document.getElementById('gamePlay').pause()
            finishMsg.classList.add('show')
            allBlocks.forEach(block => block.classList.add('is-flipped'))
            blocksContainer.classList.add('no-clicking')
        }
        if(seconds.innerHTML < 10) {
            seconds.innerHTML = `0${parseInt(seconds.innerHTML)}`
        }
    
        if(minutes.innerHTML < 10) {
            minutes.innerHTML = `0${parseInt(minutes.innerHTML)}`
        }
        if(minutes.innerHTML < 1) {
            minutes.innerHTML = '00'
        }
    }, 1000);

}







// console.log(arrKeys)
shuffle(arrKeys)
// console.log(arrKeys)



function shuffle(array) {
    let current = array.length,
    random,
    stash;
    while (current > 0) {
        random = Math.floor(Math.random() * array.length),
        current--
        stash = array[current];
        array[current] = array[random];
        array[random] = stash;
    }
    return array
}

allBlocks.forEach((block, idx) => {
    block.style.order = arrKeys[idx]
    block.onclick = function() {
        
    
        isFlipped(block)
    }
})


function isFlipped(selectedBlock) {
    
    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = allBlocks.filter(block => block.classList.contains('is-flipped'));
    if(allFlippedBlocks.length == 2) {
       stopClicking()
       hasMatched(allFlippedBlocks[0], allFlippedBlocks[1])
    }
    
}

function stopClicking() {
    blocksContainer.classList.add('no-clicking');
    
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');

    }, duration)

}


function hasMatched(firstBlock, secondBlock) {
    if(firstBlock.dataset.tech == secondBlock.dataset.tech) {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
            firstBlock.classList.add('has-matched');
            secondBlock.classList.add('has-matched');

            successSound.play()

    } else {
        failSound.play()
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration)
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1
    }
}


// music on play

// set timer 

// save score local storage & show it

// generate blocks by js object/array