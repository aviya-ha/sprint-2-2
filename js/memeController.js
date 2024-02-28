'use strict'

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]


const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }



function renderMeme() {
    var meme = getMeme()
    const elImg = new Image()
    elImg.src = `img/${meme.selectedImgId}.jpg`
    elImg.onload = () =>{
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(meme.lines[meme.selectedLineIdx].txt, 250, 250)
    }
}


function drawText(text, x, y) {
    
    gCtx.lineWidth = 2
	gCtx.strokeStyle = 'orange'

	gCtx.font = '45px Arial'
	gCtx.fillStyle = 'lightsteelblue'

	gCtx.textAlign = 'center'
	gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
	gCtx.strokeText(text, x, y)
}

function onChangeTxt(input){
    changeTxt(input)
    renderMeme()
}

