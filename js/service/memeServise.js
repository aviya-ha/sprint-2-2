'us strict'

var gMeme = {
    selectedImgId: 8,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'hey',
            size: 20,
            font: 'impact',
            colorTxt: '#ffffff',
            colorStroke: '#000000',
            textAlign:'left',
            isAdded: true,
            isChosen: true,
            x: 220,
            y: 120,
            width: 0
    
        },
        {
            txt: 'hello world',
            size: 40,
            font: 'impact',
            colorTxt: '#ffffff',
            colorStroke: '#000000',
            textAlign:'left',
            isAdded: false,
            isChosen: false,
            x: 220,
            y: 400,
            width: 0
        }
    ]
}
color
function getMeme() {
    return gMeme
}

function changeTxt(input) {
    gMeme.lines[gMeme.selectedLineIdx].txt = input
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    gMeme.selectedLineIdx = 0
    gMeme.lines[gMeme.selectedLineIdx].size = 40
    gMeme.lines[1].isAdded = false
    gMeme.lines[1].isChosen = false
}

function changeColor(input) {
    gMeme.lines[gMeme.selectedLineIdx].colorTxt = input
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size++
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size--
}

function addLine() {
    gMeme.lines[gMeme.selectedLineIdx + 1].isAdded = true
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
    } else return
}

function selectFont(elValue){
    gMeme.lines.map(line => {
        if (line.isChosen) line.font = elValue})
}

function selectAlignment(elValue){
    gMeme.lines.map(line => {
        if (line.isChosen) line.textAlign = elValue})
}