'us strict'

var gMeme = {
    selectedImgId: 8,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}


function getMeme(){
return gMeme
}

function changeTxt(input){
    gMeme.lines[0].txt = input
}

function setImg(imgId){
    gMeme.selectedImgId = imgId
    gMeme.selectedLineIdx = 0   
}