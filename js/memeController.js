'use strict'

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]


const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }



function renderMeme() {
    const elMemeContainer = document.querySelector('.main-meme-content')
    elMemeContainer.style.display = 'flex'
    var meme = getMeme()
    const elImg = new Image()
    elImg.src = `img/${meme.selectedImgId}.jpg`
    elImg.onload = () =>{
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(meme, 250, 250 )
    }
}


function drawText(meme, x, y) {
    
    const txt = meme.lines[meme.selectedLineIdx].txt
    const color = meme.lines[meme.selectedLineIdx].color
    const size = meme.lines[meme.selectedLineIdx].size

    gCtx.lineWidth = 2

	gCtx.strokeStyle = color
	gCtx.fillStyle = color

	gCtx.font = `${size}px Arial`

	gCtx.textAlign = 'center'
	gCtx.textBaseline = 'middle'

    gCtx.fillText(txt, x, y)
	gCtx.strokeText(txt, x, y)
}

function onChangeTxt(input){
    changeTxt(input)
    renderMeme()
}


function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function onChangeColor(color){
    changeColor(color)
    renderMeme()
}

function onIncreaseFont(){
    increaseFont()
    renderMeme()
}

function onDecreaseFont(){
    decreaseFont()
    renderMeme()
}
