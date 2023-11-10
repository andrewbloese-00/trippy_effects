const DEFAULT_TITLE_OPTIONS = {
    delay: 100, //milliseconds
    container_style: {
        padding: "100px",
    },
    font_size: "5rem",
    theme: "rainbow",
} 


/**
 * 
 * @param {HTMLElement} element 
 */
function centerElementAbsolutely(element){
    element.style.position = "absolute";
    element.style.left = "50%"
    element.style.top = "50%"
    element.style.transform = "translate(-50%, -50%)";
}



/**
 * @param {HTMLElement} container 
 * @param {string} text 
 * @returns {HTMLDivElement} the container of the warped title
 */
function WarpedTitle(text,options=DEFAULT_TITLE_OPTIONS){
    const container = document.createElement("div")
    options.should_center && centerElementAbsolutely(container);
    if(options.container_style){
        for(let styleOpt in options.container_style){
            container.style[styleOpt] = options.container_style[styleOpt]
        }
    }

    container.innerHTML = "";
    for(let i = 0; i < text.length; i++){
        const charSpan = document.createElement("span")
        charSpan.className = (`xx-warped-${options.theme}-theme xx-warped-title-char`) 
        console.log(charSpan.classList)
        charSpan.textContent = text.charAt(i);
        charSpan.style.animationDelay = `${options.delay*i}ms`
        charSpan.style.fontSize = options.font_size;
        if(text.charAt(i) == " "){
            charSpan.style.width = "1ch";
        }
        container.appendChild(charSpan)
    }
    return container;


}

document.addEventListener("DOMContentLoaded",function(){
    document.body.appendChild(WarpedTitle("Test Warp Rainbow",{
        delay: 50,
        container_style: { 
            position: "absolute",
            left: "10%",
            top: "10%"
        },
        theme: "rainbow",
        font_size: "5rem"
    
    }));
    document.body.appendChild(WarpedTitle("Test Rainbow Reverse ",{
        delay: 50,
        container_style: { 
            position: "absolute",
            right: "10%",
            bottom: "10%"
        },
        theme: "rainbow-reverse",
        font_size: "5rem"
    }));
})
