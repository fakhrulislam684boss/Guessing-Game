// Selector  Ui Element

let game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    message = document.querySelector('.message'),
    guessInput = document.querySelector('#guess-input'),
    guessBtn = document.querySelector('#guess-btn'),
    loading = document.querySelector('.loading')
    progress = document.querySelector('.progress-bar'),
    form = document.querySelector('.form-group');

// game Vaue


let min = 1,
    max = 10,
    winningNumber = getRndInteger(min,max),
    guessLeft = 3;

//  Assign ui max and min

minNum.textContent = min
max.textContent = 10

// showalert

function showalert(msg,color){

    message.textContent = msg
    
    message.style.color = color

    setTimeout(()=>{
        message.innerHTML=''
    },3000)

}


function progressVar(width,text,classname){
            progress.style.width = width
            progress.innerText = text 
            progress.classList.add(classname);
            progress.parentElement.style.height = '25px'
        
}

function gameover(win,msg){
    let color
    win === true ? color = 'green' : color = 'red'
    guessInput.disabled = true 
    guessInput.style.borderColor = color
    showalert(msg,color)

    // try again 
    guessBtn.innerHTML = 'play again'
    guessBtn.className += ' play-again'
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

form.addEventListener('submit',(e) =>{
    let inputVal = guessInput.value
    if(guessInput.value === '' || isNaN(inputVal) || inputVal < min || max < inputVal){
        showalert(`Please Enter The value between ${min} and ${max}`,'red')
    }
    else{
        loading.style.display = 'block'
        setTimeout(()=>{
            loading.style.display = 'none'
            
        if(inputVal == winningNumber){
            // game oveerr
            gameover(true,'you won the game')
            
            //progress bar
            progressVar('100%','you win','bg-success')
        }else{

            guessLeft--
            if(guessLeft == 0){
                gameover(false,`Game Over ! You lost The Correct number Was ${winningNumber}`)
                 //progress bar
                progressVar('100%','you failed','bg-danger')
        
    
            }else{
                showalert(`${inputVal} is Not Macth . You can try more ${guessLeft} time`,
                'red')

                switch(guessLeft){
                    case 2:
                         //progress bar
                        progressVar('33%','2 left','bg-info')
                        break;
                    case 1:
                         //progress bar
                        progressVar('66%','1 left','bg-warning')
                        break;
                }
            }

        }
        },1500)

        guessInput.value = ''
    }
    e.preventDefault()
})

game.addEventListener('mousedown',(e)=>{
   if(e.target.classList.contains('play-again')){
    window.location.reload()
   }
})