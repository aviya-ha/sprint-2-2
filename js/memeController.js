'use strict'

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
        meme.lines.map(line => {
            if(line.isAdded && !line.isChosen) drawText(line, 100, 50) 
            if(line.isAdded && line.isChosen) editText(line, 250, 50)} ) 
    }
}

function drawText(line, x, y) {
    const txt = line.txt
    const color = line.color
    const size = line.size
    
    gCtx.lineWidth = 2
    
	gCtx.strokeStyle = color
	gCtx.fillStyle = color
    
	gCtx.font = `${size}px Arial`
    
	gCtx.textAlign = 'center'
	gCtx.textBaseline = 'middle'
    
    gCtx.fillText(txt, x, y)
	gCtx.strokeText(txt, x, y)
}

function editText(line, x, y){
    const txt = line.txt
    const color = line.color
    const size = line.size

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

function onAddLine(){
    addLine()
    onSwitchLine()
    renderMeme()
}

function onSwitchLine(){
    switchLine()
    const meme = getMeme()
    const lestText = meme.lines[meme.selectedLineIdx].txt
    const elTextValue = document.getElementById('txt').value = lestText
    renderMeme()
}

