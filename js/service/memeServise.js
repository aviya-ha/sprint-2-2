'us strict'

var gMeme = {
    selectedImgId: 8,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: '#ffffff'
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
}

function changeColor(input){
    gMeme.lines[gMeme.selectedLineIdx].color = input
}