'use strict'

const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function onInitEdit() {
    addListeners()
    document.getElementById('txt').value = ''
    document.getElementById('color').value = "#ffffff"
    document.getElementById('color-stroke').value = "#000000"
    document.querySelector('.font-family').value = 'impact'
    document.querySelector('.font-Alignment').value = 'center'
    renderMeme()
}

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
                if (line.textAlign === 'left') {
                    line.textStartPoint.x = line.x
                    line.textStartPoint.y = line.y
                }
                if (line.textAlign === 'right') {
                    line.textStartPoint.x = line.x - line.width
                    line.textStartPoint.y = line.y
                }
                if (line.textAlign === 'center') {
                    line.textStartPoint.x = line.x - line.width / 2
                    line.textStartPoint.y = line.y
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
                    gCtx.strokeRect(line.x - 10, line.y - line.size, line.width + 20, line.size + 10)
                    line.textStartPoint.x = line.x
                    line.textStartPoint.y = line.y

                }

                if (line.textAlign === 'right') {
                    gCtx.beginPath()
                    gCtx.strokeStyle = 'black'
                    gCtx.strokeRect(line.x - line.width - 10, line.y - line.size, line.width + 20, line.size + 10)
                    line.textStartPoint.x = line.x - line.width
                    line.textStartPoint.y = line.y

                }

                if (line.textAlign === 'center') {
                    gCtx.beginPath()
                    gCtx.strokeStyle = 'black'
                    gCtx.strokeRect(line.x - line.width / 2 - 10, line.y - line.size, line.width + 20, line.size + 10)
                    line.textStartPoint.x = line.x - line.width / 2
                    line.textStartPoint.y = line.y

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

function onChangeColorStroke(color) {
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
    document.querySelector('.font-family').value = 'impact'
    document.querySelector('.font-Alignment').value = 'center'
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    const meme = getMeme()
    const lestText = meme.lines[meme.selectedLineIdx].txt
    const lestColor = meme.lines[meme.selectedLineIdx].colorTxt
    const lestColorStroke = meme.lines[meme.selectedLineIdx].colorStroke
    const lestFont = meme.lines[meme.selectedLineIdx].font
    const lestTextAlign = meme.lines[meme.selectedLineIdx].textAlign
    document.getElementById('txt').value = lestText
    document.getElementById('color').value = lestColor
    document.getElementById('color-stroke').value = lestColorStroke
    document.querySelector('.font-family').value = lestFont
    document.querySelector('.font-Alignment').value = lestTextAlign
    renderMeme()
}

function isLine(ev) {
    const { offsetX, offsetY } = ev
    var meme = getMeme()

    var hoveredLine = meme.lines.find(line => {
        const { size, width } = line
        const { x, y } = line.textStartPoint
        if (line.isAdded) {
            return offsetX >= x && offsetX <= x + width &&
                offsetY <= y && offsetY >= y - size
        }
    })


    if (hoveredLine) return { hoveredLine, offsetX, offsetY }
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
    const meme = getMeme()
    const lestText = meme.lines[meme.selectedLineIdx].txt
    const lestColor = meme.lines[meme.selectedLineIdx].colorTxt
    const lestColorStroke = meme.lines[meme.selectedLineIdx].colorStroke
    const lestFont = meme.lines[meme.selectedLineIdx].font
    const lestTextAlign = meme.lines[meme.selectedLineIdx].textAlign
    document.getElementById('txt').value = lestText
    document.getElementById('color').value = lestColor
    document.getElementById('color-stroke').value = lestColorStroke
    document.querySelector('.font-family').value = lestFont
    document.querySelector('.font-Alignment').value = lestTextAlign
    renderMeme()

}

function onSave() {
    saveMeme()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {

    if (!isLine(ev)) return
    var { hoveredLine } = isLine(ev)
    var lestText = hoveredLine.txt
    var lestColor = hoveredLine.colorTxt
    var lestColorStroke = hoveredLine.colorStroke
    var lestFont = hoveredLine.font
    var lestTextAlign = hoveredLine.textAlign
    document.getElementById('txt').value = lestText
    document.getElementById('color').value = lestColor
    document.getElementById('color-stroke').value = lestColorStroke
    document.querySelector('.font-family').value = lestFont
    document.querySelector('.font-Alignment').value = lestTextAlign
    switchLineOnClick(hoveredLine)
    const meme = getMeme()
    var { offsetX, offsetY } = ev
    meme.lines[meme.selectedLineIdx].startDragPos.x = offsetX
    meme.lines[meme.selectedLineIdx].startDragPos.y = offsetY

    setLineDrag(true)
    console.log('1:', 1)

}

function onMove(ev) {

    const meme = getMeme()
    console.log('meme.lines[meme.selectedLineIdx].isDrag:', meme.lines[meme.selectedLineIdx].isDrag)
    if (!meme.lines[meme.selectedLineIdx].isDrag) return
    var newX = meme.lines[meme.selectedLineIdx].startDragPos.x
    var newY = meme.lines[meme.selectedLineIdx].startDragPos.y
    var { x, y } = meme.lines[meme.selectedLineIdx]


    var dx = newX - x
    var dy = newY - y
    moveLine(dx, dy)
    var { offsetX, offsetY } = ev
    meme.lines[meme.selectedLineIdx].startDragPos.x = offsetX
    meme.lines[meme.selectedLineIdx].startDragPos.y = offsetY
    meme.lines[meme.selectedLineIdx].startDragPos.x = offsetX
    meme.lines[meme.selectedLineIdx].startDragPos.y = offsetY

    renderMeme()
}

function onUp() {
    setLineDrag(false)
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].startDragPos.x = 0
    meme.lines[meme.selectedLineIdx].startDragPos.y = 0
    document.body.style.cursor = 'grab'
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

function setIsDragging(isDrag) {
    gIsDrag = isDrag
}

function isDragging() {
    return gIsDrag
}

