'us strict'

var gMeme = {
    selectedImgId: 8,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: '#ffffff',
            isAdded: true,
            isChosen: true
        },
        {
            txt: 'hello world',
            size: 20,
            color: '#ffffff',
            isAdded: false,
            isChosen: false
        }
    ]
}

function getMeme(){
return gMeme
}

function changeTxt(input){
    gMeme.lines[gMeme.selectedLineIdx].txt = input
}

function setImg(imgId){
    gMeme.selectedImgId = imgId
    gMeme.selectedLineIdx = 0 
    gMeme.lines[gMeme.selectedLineIdx].size = 40  
    gMeme.lines[1].isAdded = false  
    gMeme.lines[1].isChosen = false  
}

function changeColor(input){
    gMeme.lines[gMeme.selectedLineIdx].color = input
}

function increaseFont(){
    gMeme.lines[gMeme.selectedLineIdx].size ++ 
}

function decreaseFont(){
    gMeme.lines[gMeme.selectedLineIdx].size -- 
}

function addLine(){
    gMeme.lines[gMeme.selectedLineIdx+1].isAdded = true
}

function switchLine(){
    if (gMeme.selectedLineIdx === 0){
        gMeme.selectedLineIdx = 1
        gMeme.lines[0].isChosen = false
        gMeme.lines[1].isChosen = true
    } else {
        gMeme.selectedLineIdx = 0
        gMeme.lines[0].isChosen = true
        gMeme.lines[1].isChosen = false
    }
}