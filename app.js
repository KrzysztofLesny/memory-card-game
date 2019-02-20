const resetCards = (card1, card2) => {
    $(card1).css({"transform": "rotateY(90deg)", "transition-delay": "0s"});
    $(card1.previousElementSibling).css({"transform": "rotateY(0deg)", "transition-delay": "0.2s"});
    $(card2).css({"transform": "rotateY(90deg)", "transition-delay": "0s"});
    $(card2.previousElementSibling).css({"transform": "rotateY(0deg)", "transition-delay": "0.2s"});
}

const gameOver = () => {
    $('#endGameScreen').css({"display": "block"});
    $('#btnNewGameHolder').css({"display": "block"});
}

const isSame = () => {
    let cards = document.getElementsByClassName('selected');
    if (cards.length === 2) {
        if (!(cards[0].classList[1] === cards[1].classList[1])) {
            setTimeout(resetCards, 1000, cards[0], cards[1]);
        } else {
            for (let i = cards.length - 1; i >= 0; i--){
                $(cards[i]).addClass('done');
            }
        }
        for (let i = cards.length - 1; i >= 0; i--){
            $(cards[i]).removeClass('selected');
        }
    }
    let done = document.getElementsByClassName('done');
    if (done.length === 8){
        gameOver();
    }
}

const resetGameBoard = () => {
    $('#endGameScreen').css({"display": "none"});
    if($('#cardsList').children().length > 0) {
        $('#cardsList').children().remove();
    }
        
    for (let j = 0; j < 8; j++) {
        $('#cardsList').append('<li class="card"><div class="back"></div><div class="front"></div></li>');
    }
}

const randomBackground = () => {
    const bgList = ["a", "a", "j", "j", "q", "q", "k", "k"];
    const backgrounds = [];
    const visited = [];

    for (let l = 0; l < bgList.length; l++) {
        let m = -1
        while ( m == -1) {
            let n = Math.floor(Math.random() * bgList.length);
            if (visited.indexOf(n) == -1) {
                visited[l] = n;
                m = 0;
            }
        }   
    }
    
    for (let k = 0; k < bgList.length; k++) {
        backgrounds[k] = bgList[visited[k]]; 
    }
    
    return backgrounds;
}

const flipCard = (backSide, frontSide) => {
    backSide.css({"transform": "rotateY(90deg)", "transition-delay": "0s"});
    frontSide.css({"transform": "rotateY(0deg)", "transition-delay": "0.2s"});
}

$(document).ready(function(){
    
    $('#btnNewGame').on('click', function(){
        
        resetGameBoard();
        
        const cardsFront = document.getElementsByClassName("front");
        const cardsBack = document.getElementsByClassName("back");
        const ranBG = randomBackground();
        
        [].forEach.call(cardsFront, function(card, index){
            card.classList.add(ranBG[index]);
        }),
    
        [].forEach.call(cardsBack, function(card){
            card.addEventListener('click', function(e){
                
                flipCard($(e.target), $(e.target.nextElementSibling));

                let sibling = $(e.target.nextElementSibling)[0];
                sibling.classList.add('selected');
                isSame();
            });
        });
        
        $('#btnNewGameHolder').css({"display": "none"});
    }); 
    
    $('#btnNewGame').trigger('click');
});