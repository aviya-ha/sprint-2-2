'us strict'

var STORAGE_KEY = 'saved memes'

const gMemes = []

var gMeme = {
    selectedImgId: 8,
    selectedLineIdx: 0,
    lines: [
        {
            id: 0,
            txt: 'hey',
            size: 40,
            font: 'impact',
            colorTxt: '#ffffff',
            colorStroke: '#000000',
            textAlign: 'center',
            isAdded: true,
            isChosen: true,
            isDrag: false,
            startDragPos: {x: 0, y:0},
            textStartPoint: { x: 220, y: 120 },
            x: 220,
            y: 120,
            width: 0

        },
        {
            id: 1,
            txt: 'hello world',
            size: 40,
            font: 'impact',
            colorTxt: '#ffffff',
            colorStroke: '#000000',
            textAlign: 'center',
            isAdded: false,
            isChosen: false,
            isDrag: false,
            startDragPos: {x: 0, y:0},
            textStartPoint: { x: 220, y: 400 },
            x: 220,
            y: 400,
            width: 0
        }
    ]
}

function getMeme() {
    return gMeme
}

function changeTxt(input) {
    gMeme.lines[gMeme.selectedLineIdx].txt = input
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    gMeme.selectedLineIdx = 0
    _resetLine(0)
    _resetLine(1)
    gMeme.lines[0].isAdded = true
    gMeme.lines[0].isChosen = true
}

function changeColor(input) {
    gMeme.lines[gMeme.selectedLineIdx].colorTxt = input
}

function changeColorStroke(input){
    gMeme.lines[gMeme.selectedLineIdx].colorStroke = input
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size++
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size--
}

function addLine() {
    console.log('gMeme:', gMeme)
    if (gMeme.lines[0].isAdded && gMeme.lines[1].isAdded) return
    var lineIndex = gMeme.lines.findIndex(line => !line.isAdded)
    gMeme.lines[lineIndex].isAdded = true
    switchLine()
}

function moveUp() {
    var lineIndex = gMeme.lines.findIndex(line => line.isChosen)
    gMeme.lines[lineIndex].y--
}

function moveDown() {
    var lineIndex = gMeme.lines.findIndex(line => line.isChosen)
    gMeme.lines[lineIndex].y++
}

function deleteLine() {
    var lineIndex = gMeme.lines.findIndex(line => line.isChosen)
    _resetLine(lineIndex)
    switchLine()
}

function switchLineOnClick(line) {
    if (line.id === 0) {
        gMeme.selectedLineIdx = 0
        gMeme.lines[0].isChosen = true
        gMeme.lines[1].isChosen = false
    } else if (line.id === 1) {
        gMeme.selectedLineIdx = 1
        gMeme.lines[1].isChosen = true
        gMeme.lines[0].isChosen = false
    }

}

function switchLine() {
    if (gMeme.lines[0].isAdded === true && gMeme.lines[1].isAdded === true) {
        if (gMeme.selectedLineIdx === 0) {
            gMeme.selectedLineIdx = 1
            gMeme.lines[0].isChosen = false
            gMeme.lines[1].isChosen = true
        } else {
            gMeme.selectedLineIdx = 0
            gMeme.lines[0].isChosen = true
            gMeme.lines[1].isChosen = false
        }
    } else if (gMeme.lines[0].isAdded === true && gMeme.lines[1].isAdded === false){
        gMeme.selectedLineIdx = 0
            gMeme.lines[0].isChosen = true
            gMeme.lines[1].isChosen = false
    }else if (gMeme.lines[0].isAdded === false && gMeme.lines[1].isAdded === true){
        gMeme.selectedLineIdx = 1
        gMeme.lines[0].isChosen = false
        gMeme.lines[1].isChosen = true
    }
}

function selectFont(elValue) {
    gMeme.lines.map(line => {
        if (line.isChosen) line.font = elValue
    })
}

function selectAlignment(elValue) {
    gMeme.lines.map(line => {
        if (line.isChosen) line.textAlign = elValue
    })

}

function saveMeme() {
    gMemes.push(gMeme)
    _save()
}

function setLineDrag(isDragging){
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDragging
}

function moveLine(dx, dy) {
     gMeme.lines[gMeme.selectedLineIdx].x += dx
     gMeme.lines[gMeme.selectedLineIdx].y += dy
}

function _resetLine(index){
    gMeme.lines[index].txt = (index === 0)? 'hey' : 'hello world'
    gMeme.lines[index].size = 40
    gMeme.lines[index].font = 'impact'
    gMeme.lines[index].colorTxt = '#ffffff'
    gMeme.lines[index].colorStroke = '#000000'
    gMeme.lines[index].textAlign = 'center'
    gMeme.lines[index].isAdded = false
    gMeme.lines[index].isChosen = false
    gMeme.lines[index].isDrag = false
    gMeme.lines[index].startDragPos =  {x: 0, y:0}
    gMeme.lines[index].textStartPoint = { x: 220, y: (index === 0)? 120 : 400 }
    gMeme.lines[index].x =  220
    gMeme.lines[index].y =  (index === 0)? 120 : 400
    gMeme.lines[index].width = 0
}

function _save() {
    saveToStorage(STORAGE_KEY, gMemes)
}




