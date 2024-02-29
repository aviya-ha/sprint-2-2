'us strict'

var gMeme = {
    selectedImgId: 8,
    selectedLineIdx: 0,
    lines: [
        {
            id: 1,
            txt: 'hey',
            size: 40,
            font: 'impact',
            colorTxt: '#ffffff',
            colorStroke: '#000000',
            textAlign:'center',
            isAdded: true,
            isChosen: true,
            textStartPoint: {x: 220 , y: 120},
            x: 220,
            y: 120,
            width: 0
    
        },
        {
            id: 2,
            txt: 'hello world',
            size: 40,
            font: 'impact',
            colorTxt: '#ffffff',
            colorStroke: '#000000',
            textAlign:'center',
            isAdded: false,
            isChosen: false,
            textStartPoint: {x: 220 , y: 400},
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
    gMeme.lines[0].isAdded = true
    gMeme.lines[0].isChosen = true
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
    if (gMeme.lines[0].isAdded && gMeme.lines[1].isAdded) return
    gMeme.lines[1].isAdded = true
}

function switchLineOnClick(line) {
    console.log('line:', line)
    if (line.id === 1 ){
        console.log('line1:', line)
        gMeme.selectedLineIdx = 0
        gMeme.lines[0].isChosen = true
        gMeme.lines[1].isChosen = false
        console.log('line11:', line)
    }else if (line.id === 2){
        console.log('line2:', line)
        gMeme.selectedLineIdx = 1
        gMeme.lines[1].isChosen = true
        gMeme.lines[0].isChosen = false
    }
    console.log('line:', line)
    
}

// function switchLineOnClick(line) {
//     console.log('line:', line)
//     if (line.id === 1 ){
//         console.log('line1:', line)
//         gMeme.selectedLineIdx = 1
//         gMeme.lines[1].isChosen = true
//         gMeme.lines[0].isChosen = false
//         console.log('line11:', line)
//     }else if (line.id === 0){
//         console.log('line2:', line)
//         gMeme.selectedLineIdx = 0
//         gMeme.lines[0].isChosen = true
//         gMeme.lines[1].isChosen = false
//     }
//     console.log('line:', line)
    
// }

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