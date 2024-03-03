'use strict'

const gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['men', 'angry'] },
    { id: 2, url: 'img/2.jpg', keywords: ['dog', 'funny'] },
    { id: 3, url: 'img/3.jpg', keywords: ['dog', 'baby',] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat', 'funny'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'angry'] },
    { id: 6, url: 'img/6.jpg', keywords: ['men', 'funny'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'funny'] },
    { id: 8, url: 'img/8.jpg', keywords: ['men', 'funny'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'funny'] },
    { id: 10, url: 'img/10.jpg', keywords: ['men', 'funny'] },
    { id: 11, url: 'img/11.jpg', keywords: ['men', 'funny'] },
    { id: 12, url: 'img/12.jpg', keywords: ['men', 'angry'] },
    { id: 13, url: 'img/13.jpg', keywords: ['men', 'funny'] },
    { id: 14, url: 'img/14.jpg', keywords: ['men', 'angry'] },
    { id: 15, url: 'img/15.jpg', keywords: ['men', 'angry'] },
    { id: 16, url: 'img/16.jpg', keywords: ['men', 'funny'] },
    { id: 17, url: 'img/17.jpg', keywords: ['men', 'angry'] },
    { id: 18, url: 'img/18.jpg', keywords: ['toy', 'funny'] },
]
const gAllKeywords = [
    {
        id: 'men',
        count: 5
    },
    {
        id: 'angry',
        count: 5
    },
    {
        id: 'dog',
        count: 5
    },
    {
        id: 'baby',
        count: 10
    },
    {
        id: 'funny',
        count: 5
    }
]




function onInit() {
    renderGallery()
    renderFilters()
}

function renderGallery() {
    const elImageContainer = document.querySelector('.main-image-content')

    var strHtmls = gImgs.map(image => `
<img  id="${image.id}" src="${image.url}" alt="${image.keywords}" title="${image.keywords}" onclick="onImgSelect(this)"> 
    `)

    elImageContainer.innerHTML = strHtmls.join('')
}

function renderFilters() {
    const elFilterPop = document.querySelector('.filter-pop')

    var strHtmls = gAllKeywords.map(word => `
    <span class="key-word ${word.id}" style=" font-size: ${word.count}px;" onclick="onKeyWordClick(this)">${word.id} </span> 
    `)

    elFilterPop.innerHTML = strHtmls.join('')
}

function onKeyWordClick(elSpan) {
    var word = gAllKeywords.find(word => word.id === elSpan.innerText)
    word.count += 2
    const elImageContainer = document.querySelector('.main-image-content')
    var filteredImg = filterImgs(elSpan.innerText)
  
    
    
    
    console.log('filteredImg:', filteredImg)
    var strHtmls = filteredImg.map(image =>
        `
        <img id="${image.id}" src="${image.url}" alt="${image.keywords}" title="${image.keywords}" onclick="onImgSelect(this)"> 
        `)
        
        elImageContainer.innerHTML = strHtmls.join('')
        renderFilters()
}

function onImgSelect({ id }) {
    setImg(id)
    const elImageContainer = document.querySelector('.main-image-container')
    elImageContainer.style.display = 'none'
    onInitEdit()
}

function onImgSelectRandom() {
    const randomId = getRandomInt(1, 18)
    setImg(randomId)
    const elImageContainer = document.querySelector('.main-image-container')
    elImageContainer.style.display = 'none'
    onInitEdit()
}


function onGallery() {
    const elImageContainer = document.querySelector('.main-image-container')
    elImageContainer.style.display = 'block'
    const elMemeContainer = document.querySelector('.main-meme-content')
    elMemeContainer.style.display = 'none'
    const elSavedMemeContainer = document.querySelector('.main-saved-container')
    elSavedMemeContainer.style.display = 'none'

}

function onInputFilter(elValue) {

    var word = gAllKeywords.find(word => word.id === elValue)

    word.count += 2
    renderFilters()

    const elImageContainer = document.querySelector('.main-image-content')

    const filteredImg = gImgs.filter(img =>
        img.keywords[0].includes(elValue) || img.keywords[1].includes(elValue))


    console.log('filteredImg:', filteredImg)
    var strHtmls = filteredImg.map(image =>
        `
<img id="${image.id}" src="${image.url}" alt="${image.keywords}" title="${image.keywords}" onclick="onImgSelect(this)"> 
    `)

    elImageContainer.innerHTML = strHtmls.join('')
}

function onClearBtn() {
    document.getElementById('filter-input').value = ""
    renderGallery()
}

function filterImgs(text){
    return gImgs.filter(img => img.keywords[0].includes(text) || img.keywords[1].includes(text))
}
