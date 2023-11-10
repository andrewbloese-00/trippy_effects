const FPS = 1/1000
const DEFAULT_TITLE_OPTIONS = {
    delay: 270, //milliseconds
    container_style: {
        padding: "100px",
    },
    font_size: "5rem",
    theme: "rainbow",
} 

const DEFAULT_ORB_OPTIONS = { 
    style: {
        opacity:0,
        width: "300px",
        height: "300px",
    } ,
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
    if(options.container_style)
        for(let styleOpt in options.container_style)
            container.style[styleOpt] = options.container_style[styleOpt]
    container.innerHTML = "";
    for(let i = 0; i < text.length; i++){
        const charSpan = document.createElement("span")
        charSpan.className = (`xx-warped-${options.theme}-theme xx-warped-title-char`) 
        charSpan.textContent = text.charAt(i);
        charSpan.style.animationDelay = `${options.delay*i}ms`
        charSpan.style.fontSize = options.font_size;
        if(text.charAt(i) == " ")
            charSpan.style.width = "1ch";
        container.appendChild(charSpan)
    }
    return container;
}

function WarpedBlob(options = DEFAULT_ORB_OPTIONS){

    const node = document.createElement("div")
    for(let styleOpt in options.style)
        node.style[styleOpt] = options.style[styleOpt]

    node.className = `xx-warped-orb`
    return node
}

document.addEventListener("DOMContentLoaded",function(){
    document.body.appendChild(WarpedTitle("Hello World",{
        delay: 260,
        container_style: { 
            width: "fit-content"
        },
        should_center: true,
        theme: "rainbow",
        font_size: "5rem"
    }));

    const orbs = [
        {x: 100, y: 100 , vx: 1, vy: -1},
        {x: 500, y: 600, vx: -2, vy: 4 },
        {x: window.innerWidth - 400, y: 300, vx: -1.3, vy: 2.1},
        {x: window.innerWidth -500, y: 0, vx: -0.06, vy: 0.6}

    ] 

    for(let i = 0; i < orbs.length; i++){
        const blob = WarpedBlob()
        blob.style.animationDelay = i * 400 + "ms"
        orbs[i]['node'] = blob
        document.body.appendChild(blob)

    }

    function animate(){
      for(let orb of orbs){
            //hits top or hits bottom  
            if(orb.y <= 0 && orb.vy < 0 || orb.y >= window.innerHeight && orb.vy > 0){
                console.log('orb hit boundary');
                orb.vy *= -1; //flip the orbs y velocity
            }
            //hits left or right
            if(orb.x <= 0 && orb.vx < 0 || orb.x >= window.innerWidth && orb.vx > 0){
                console.log('orb hit boundary');
                orb.vx *= -1; //flip the orbs x velocity
            }
            //moves the orbs according to velocity
            orb.x += orb.vx;
            orb.y += orb.vy;

            orb.node.style.transform = `translate(${orb.x}px, ${orb.y}px)`; 
      }
    }  
    setInterval(animate,30);

    
})


