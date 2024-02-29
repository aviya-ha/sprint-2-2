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
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.map(line => {
            if (line.isAdded && !line.isChosen) {
                drawText(line, line.x, line.y)
                line.width = gCtx.measureText(line.txt).width
            }
            if (line.isAdded && line.isChosen) {
                const x = line.x
                const y = line.y
                editText(line, x, y)
                line.width = gCtx.measureText(line.txt).width
                if (line.textAlign === 'left') {
                    gCtx.strokeRect(line.x, (line.y - line.size), line.width, (line.size + 10))
                    line.textStartPoint.x = line.x
                    line.textStartPoint.y = line.y - line.size
                }

                if (line.textAlign === 'right'){
                    gCtx.strokeRect(line.x - line.width, (line.y - line.size), line.width, (line.size +10))
                    line.textStartPoint.x = line.x - line.width
                    line.textStartPoint.y = line.y - line.size
                }

                if (line.textAlign === 'center') {
                    gCtx.strokeRect(line.x - line.width / 2, (line.y - line.size), line.width, (line.size + 10))
                    line.textStartPoint.x = line.x - line.width / 2
                    line.textStartPoint.y = line.y - line.size
                }

            }
        })
    }
}

function drawText(line, x, y) {
    const txt = line.txt
    const colorTxt = line.colorTxt
    const colorStroke = line.colorStroke
    const size = line.size
    const fontFamily = line.font
    const textAlign = line.textAlign

    gCtx.textAlign = textAlign
    gCtx.lineWidth = 2

    gCtx.strokeStyle = colorStroke
    gCtx.fillStyle = colorTxt

    gCtx.font = `${size}px ${fontFamily}`

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)

}

function editText(line, x, y) {
    const txt = line.txt
    const colorTxt = line.colorTxt
    const colorStroke = line.colorStroke
    const size = line.size
    const fontFamily = line.font
    const textAlign = line.textAlign


    gCtx.textAlign = textAlign

    gCtx.lineWidth = 2

    gCtx.strokeStyle = colorStroke
    gCtx.fillStyle = colorTxt

    gCtx.font = `${size}px ${fontFamily}`

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function onChangeTxt(input) {
    changeTxt(input)
    renderMeme()
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onChangeColor(color) {
    changeColor(color)
    renderMeme()
}

function onIncreaseFont() {
    increaseFont()
    renderMeme()
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    const meme = getMeme()
    const lestText = meme.lines[meme.selectedLineIdx].txt
    document.getElementById('txt').value = lestText
    renderMeme()
}

function onClick(ev) {
    const { offsetX, offsetY, clientX, clientY } = ev
    var meme = getMeme()

    const hoveredLine = meme.lines.find(line => {
        const {size, width } = line
        const { x, y } = line.textStartPoint
        if (line.isAdded) {
            return offsetX >= x && offsetX <= x + width &&
            offsetY >= y && offsetY <= y + size
        }
    })
    console.log('hoveredLine:', hoveredLine)
if (hoveredLine){
    // onSwitchLine()
    switchLineOnClick(hoveredLine)
    renderMeme()

}
}

function onSelectFont(elValue) {
    selectFont(elValue)
    renderMeme()
}

function onSelectAlignment(elValue) {
    selectAlignment(elValue)
    renderMeme()

}

function onMoveUp(){
    moveUp()
    renderMeme()
}

function onMoveDown(){
    moveDown()
    renderMeme()
}

function onDelete(){
    deleteLine()
    renderMeme()

}




