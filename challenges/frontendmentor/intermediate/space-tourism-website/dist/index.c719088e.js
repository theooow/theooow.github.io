// Attendre le chargement du DOM
window.addEventListener("DOMContentLoaded", ()=>{
    /*Tab Highlighter*/ const tabs = document.querySelectorAll(".nav-link");
    tabs.forEach((tab, index)=>{
        tab.addEventListener("click", ()=>{
            const hash = tabs[index].getAttribute("name");
            const body = document.querySelector("body");
            // Change background
            body.classList.forEach((className)=>{
                if (className.startsWith("bg-")) body.classList.remove(className);
            });
            body.classList.add(`bg-${hash}`);
            // Change page content
            const pages = document.querySelectorAll(".container");
            pages.forEach((page)=>{
                page.classList.add("hidden");
            });
            const container = document.querySelector(`.${hash}`);
            container.classList.remove("hidden");
            tabs.forEach((tab)=>{
                tab.classList.remove("active");
            });
            tab.classList.add("active");
            let tabsHighlighter = document.querySelector(".tabs-highlighter");
            tabsHighlighter.style.width = `${tab.offsetWidth}px`;
            tabsHighlighter.style.left = `${tab.offsetLeft}px`;
        });
    });
    /*Mini tab highlighter*/ const miniTabs = document.querySelectorAll(".mini-nav-link");
    miniTabs.forEach((tab, index)=>{
        tab.addEventListener("click", ()=>{
            miniTabs.forEach((tab)=>{
                tab.classList.remove("active");
            });
            tab.classList.add("active");
            let tabsHighlighter = document.querySelector(".mini-tabs-highlighter");
            tabsHighlighter.style.width = `${tab.offsetWidth}px`;
            tabsHighlighter.style.left = `${tab.offsetLeft}px`;
            const hash = miniTabs[index].getAttribute("name");
            // import data.json
            getData();
        });
    });
});

//# sourceMappingURL=index.c719088e.js.map
