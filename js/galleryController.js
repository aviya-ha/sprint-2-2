'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['trump', 'funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['dogs', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['dog','baby', 'cute'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat', 'cute'] },
]



function onInit(){
    renderGallery()
}

function renderGallery(){
const elImageContainer = document.querySelector('.main-image-content')

var strHtmls = gImgs.map(image => `
<img id="${image.id}" src="${image.url}" alt="${image.keywords}" title="${image.keywords}" onclick="onImgSelect(this)"> 
    `)

    elImageContainer.innerHTML = strHtmls.join('')
}


function onImgSelect({id}){
setImg(id)
const elImageContainer = document.querySelector('.main-image-content')
elImageContainer.style.display = 'none'
renderMeme()
}

