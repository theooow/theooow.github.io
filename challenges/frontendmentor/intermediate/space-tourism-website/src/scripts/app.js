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

    const verticalTabs = document.querySelectorAll('.nav-link')
    verticalTabs.forEach( (tab, index) => {
        tab.addEventListener('click', () => {
            let verticalHighlighter = document.querySelector('.vertical-highlighter')
            verticalHighlighter.style.height = `${tab.offsetHeight}px`
            verticalHighlighter.style.top = `${tab.offsetTop}px`
        })
    })

    // If resize window
    window.addEventListener('resize', () => {
        const activeTab = document.querySelector('.nav-link.active')
        let tabsHighlighter = document.querySelector('.tabs-highlighter')
        tabsHighlighter.style.width = `${activeTab.offsetWidth}px`
        tabsHighlighter.style.left = `${activeTab.offsetLeft}px`

        let verticalHighlighter = document.querySelector('.vertical-highlighter')
        verticalHighlighter.style.height = `${activeTab.offsetHeight}px`
        verticalHighlighter.style.top = `${activeTab.offsetTop}px`
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

    /* Circle tabs highlighter */
    const circleTabs = document.querySelectorAll('circle')
    circleTabs.forEach( (tab, index) => {
        tab.addEventListener('click', () => {
            let circleHighlighter = document.querySelector('.circle-selector')
            circleHighlighter.setAttribute('cx', `${tab.getAttribute('cx')}`)
            circleHighlighter.setAttribute('cy', `${tab.getAttribute('cy')}`)
            circleHighlighter.setAttribute('r', `${tab.getAttribute('r')}`)

            const hash = tab.getAttribute('name').replace('-', ' ')
            const newData = data.crew.filter( crew => crew.name === hash )
            
            // Change page content
            const crewName = document.querySelector('#crew-name')
            crewName.textContent = newData[0].name

            const crewRole = document.querySelector('#crew-role')
            crewRole.textContent = newData[0].role

            const crewBio = document.querySelector('#crew-bio')
            crewBio.textContent = newData[0].bio

            const crewImage = document.querySelector('.image__teammate')
            crewImage.classList.forEach( className => {
                if( className !== 'image__teammate' )
                    crewImage.classList.remove(className)
            })
            crewImage.classList.add(hash.replace(' ', '-'))
        })
    })

    /* Tab highlighter technology */
    const techTabs = document.querySelectorAll('.circle')
    techTabs.forEach( (tab, index) => {
        tab.addEventListener('click', () => {
            techTabs.forEach( tab => {
                tab.classList.remove('active')
            })
            tab.classList.add('active')

            const hash = tab.getAttribute('name').replace('-', ' ')
            const newData = data.technology.filter( tech => tech.name === hash )

            // Change page content
            const techTitle = document.querySelector('#tech-title')
            techTitle.textContent = newData[0].name

            const techDescription = document.querySelector('#tech-description')
            techDescription.textContent = newData[0].description

            const techImage = document.querySelector('.tech-image')
            techImage.classList.forEach( className => {
                if( className !== 'tech-image' )
                    techImage.classList.remove(className)
            })
            techImage.classList.add(hash.replace(' ', '-'))
        })
    })

    const burger = document.querySelector('.burger')
    const nav = document.querySelector('nav.header__nav')
    burger.addEventListener('click', () => {
        nav.classList.add('show')
    })
    const close = document.querySelector('.cross')
    close.addEventListener('click', () => {
        nav.classList.remove('show')
    })
})