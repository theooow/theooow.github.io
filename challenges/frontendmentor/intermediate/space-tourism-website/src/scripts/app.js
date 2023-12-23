import  data from '../data.json'

// Attendre le chargement du DOM
window.addEventListener('DOMContentLoaded', () => {

    /*Tab Highlighter*/
    const tabs = document.querySelectorAll('.nav-link')
    tabs.forEach( (tab, index) => {
        tab.addEventListener('click', () => {
            const hash = tabs[index].getAttribute('name')
            const body = document.querySelector('body')
            // Change background
            body.classList.forEach( className => {
                if( className.startsWith('bg-') )
                    body.classList.remove(className)
            })
            body.classList.add(`bg-${hash}`)
            // Change page content
            const pages = document.querySelectorAll('.container')
            pages.forEach( page => {
                page.classList.add('hidden')
            })
            const container = document.querySelector(`.${hash}`)
            container.classList.remove('hidden')

            tabs.forEach( tab => {
                tab.classList.remove('active')
            })
            tab.classList.add('active')
            let tabsHighlighter = document.querySelector('.tabs-highlighter')
            tabsHighlighter.style.width = `${tab.offsetWidth}px`
            tabsHighlighter.style.left = `${tab.offsetLeft}px`

        })
    })

    /*Mini tab highlighter*/
    const miniTabs = document.querySelectorAll('.mini-nav-link')
    miniTabs.forEach( (tab, index) => {
        tab.addEventListener('click', () => {

            miniTabs.forEach( tab => {
                tab.classList.remove('active')
            })
            tab.classList.add('active')
            let tabsHighlighter = document.querySelector('.mini-tabs-highlighter')
            tabsHighlighter.style.width = `${tab.offsetWidth}px`
            tabsHighlighter.style.left = `${tab.offsetLeft}px`

            const hash = miniTabs[index].getAttribute('name')
            const title = hash.charAt(0).toUpperCase() + hash.slice(1)
            const newData = data.destinations.filter( planet => planet.name === title )
        
            // Change page content
            const image = document.querySelector('.image__planet')
            image.classList.forEach( className => {
                if( className !== 'image__planet' )
                    image.classList.remove(className)
            })
            image.classList.add(newData[0].name)

            const planetName = document.querySelector('#planet_title')
            planetName.textContent = newData[0].name

            const planetDescription = document.querySelector('#planet_description')
            planetDescription.textContent = newData[0].description

            const planetDistance = document.querySelector('#planet_distance')
            planetDistance.textContent = newData[0].distance

            const planetTravel = document.querySelector('#planet_traveltime')
            planetTravel.textContent = newData[0].travel
        })
    })
})