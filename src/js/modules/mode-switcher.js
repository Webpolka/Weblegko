    // darkModeSvg = '<svg class="icon icon--dark"><use href="./icons/symbol/sprite.svg#dark"></use></svg>',
    // darkModeSpan = '<span>Тёмная</span>',
    // lightModeSvg = '<svg class="icon icon--light"><use href="./icons/symbol/sprite.svg#light"></use></svg>',
    // lightModeSpan = '<span>Светлая</span>'

function modeSwitcher(darkModeSvg, darkModeSpan, lightModeSvg, lightModeSpan){
const bodyMode = document.body
if (document.querySelector('#mode-switcher')) {
    const btnSwitch = document.querySelector('#mode-switcher')
    const btnContainer = btnSwitch.appendChild(document.createElement('div'))
    btnContainer.classList.add('inline')

    if(bodyMode&&bodyMode.classList.contains('light-mode')){ 
    btnContainer.innerHTML = darkModeSvg + darkModeSpan
    btnContainer.firstElementChild.classList.add('dark-color--mode')
    btnContainer.lastElementChild.classList.add('dark-color--mode')
     } else {
    btnContainer.innerHTML = lightModeSvg + lightModeSpan   
    btnContainer.firstElementChild.classList.add('light-color--mode')
    btnContainer.lastElementChild.classList.add('light-color--mode')  
     }      
  
    btnSwitch.addEventListener('click', (event) => {
        if(bodyMode&&bodyMode.classList.contains('light-mode')) {             
        bodyMode.classList.replace('light-mode' , 'dark-mode')
        btnContainer.innerHTML = lightModeSvg + lightModeSpan 
        btnContainer.firstElementChild.classList.add('light-color--mode')
        btnContainer.lastElementChild.classList.add('light-color--mode')           
        } else { 
        bodyMode.classList.replace('dark-mode' , 'light-mode')
        btnContainer.innerHTML = darkModeSvg + darkModeSpan  
        btnContainer.firstElementChild.classList.add('dark-color--mode')
        btnContainer.lastElementChild.classList.add('dark-color--mode')                     
        }  
        event.stopPropagation();  
    })
    } else {
        console.log('Кнопка <button id="mode-switcher"></button> для переключения темы в DOM не обнаружена !')       
    }
}
 export default modeSwitcher;