'use strict'

const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function renderMeme() {
    const elSavedMemeContainer = document.querySelector('.main-saved-container')
    elSavedMemeContainer.style.display = 'none'
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
                if (line.textAlign === 'left'){
                    line.textStartPoint.x = line.x
                }
                if (line.textAlign === 'right'){
                    line.textStartPoint.x = line.x - line.width                   
                }
                if (line.textAlign === 'center'){
                    line.textStartPoint.x = line.x - line.width / 2                   
                }

            }
            if (line.isAdded && line.isChosen) {
                const x = line.x
                const y = line.y
                editText(line, x, y)
                line.width = gCtx.measureText(line.txt).width
                if (line.textAlign === 'left') {
                    gCtx.beginPath()
                    gCtx.strokeStyle = 'black'
                    gCtx.strokeRect(line.x -10, line.y - line.size, line.width +20, line.size + 10)
                    line.textStartPoint.x = line.x
                    
                }

                if (line.textAlign === 'right') {
                    gCtx.beginPath()
                    gCtx.strokeStyle = 'black'
                    gCtx.strokeRect(line.x - line.width -10, line.y - line.size, line.width +20, line.size + 10)
                    line.textStartPoint.x = line.x - line.width
                    
                }

                if (line.textAlign === 'center') {
                    gCtx.beginPath()
                    gCtx.strokeStyle = 'black'
                    gCtx.strokeRect(line.x - line.width / 2 -10, line.y - line.size, line.width +20, line.size + 10)
                    line.textStartPoint.x = line.x - line.width / 2
                    
                }

            }
        })
    }
}

function drawText(line, x, y) {
    gCtx.beginPath()
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
    gCtx.closePath()

}

function editText(line, x, y) {
    gCtx.beginPath()
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
    gCtx.closePath()
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

function onChangeColorStroke(color){
    changeColorStroke(color)
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
    document.getElementById('txt').value = ''
    document.getElementById('color').value = "#ffffff"
    document.getElementById('color-stroke').value = "#000000"
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    const meme = getMeme()
    const lestText = meme.lines[meme.selectedLineIdx].txt
    const lestColor = meme.lines[meme.selectedLineIdx].colorTxt
    const lestColorStroke = meme.lines[meme.selectedLineIdx].colorStroke
    document.getElementById('txt').value = lestText
    document.getElementById('color').value = lestColor
    document.getElementById('color-stroke').value = lestColorStroke
    renderMeme()
}

function onClick(ev) {
    const { offsetX, offsetY } = ev
    var meme = getMeme()
    
    var hoveredLine = meme.lines.find(line => {
        const {size, width } = line
        const { x, y } = line.textStartPoint
        if (line.isAdded) {
            return offsetX >= x && offsetX <= x + width &&
                offsetY <= y && offsetY >= y - size
        }
    })
    console.log('hoveredLine:', hoveredLine)
    if (hoveredLine) {
        var lestText = hoveredLine.txt
        var lestColor = hoveredLine.colorTxt
        var lestColorStroke = hoveredLine.colorStroke
        document.getElementById('txt').value = lestText
        document.getElementById('color').value = lestColor
        document.getElementById('color-stroke').value = lestColorStroke
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

function onMoveUp() {
    moveUp()
    renderMeme()
}

function onMoveDown() {
    moveDown()
    renderMeme()
}

function onDelete() {
    deleteLine()
    renderMeme()

}

function onSave() {
    saveMeme()
}

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData()
    formData.append('img', imgDataUrl)


    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {

        if (XHR.readyState !== XMLHttpRequest.DONE) return

        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR

        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}


