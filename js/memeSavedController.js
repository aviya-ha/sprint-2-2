'use strict'


function onSavedMemes() {
    const elImageContainer = document.querySelector('.main-image-container')
    elImageContainer.style.display = 'none'
    const elMemeContainer = document.querySelector('.main-meme-content')
    elMemeContainer.style.display = 'none'
    const elSavedMemeContainer = document.querySelector('.main-saved-container')
    elSavedMemeContainer.style.display = 'block'
    renderSavedMemes()
}

function renderSavedMemes() {
    const allMemes = loadFromStorage(STORAGE_KEY)
    console.log('allMemes:', allMemes)

    const elSavedMemeContainer = document.querySelector('.main-saved-container')

    var strHtmls = allMemes.map(image =>
        `
<img id="${image.selectedImgId}" src="img/${image.selectedImgId}.jpg" onclick="onImgSelect(this)"> 
    `
    )
    elSavedMemeContainer.innerHTML = strHtmls.join('')
}