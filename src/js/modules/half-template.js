function halfTemplate() {
    const menuButtonsEl = document.querySelector('#menu-buttons')
    const menuTargets = document.querySelector('#menu-tabs')
    const searchCloseBtn = document.querySelector('#search-tab-close')

    let menuButtonsNodes = menuButtonsEl.querySelectorAll('button[data-id]')
    let menuTargetsNodes = menuTargets.querySelectorAll('div[data-id]')


    menuButtonsNodes.forEach(buton => {
        buton.addEventListener('click', (event) => {
            let eventButton = event.currentTarget
            let boolButton = eventButton.classList.contains('active')
            let idButton = eventButton.getAttribute('data-id')          

            resetBtnClasses()
            if (eventButton && !boolButton) { eventButton.classList.add('active') }
            if (eventButton && boolButton) { eventButton.classList.remove('active') }

            menuTargetsNodes.forEach(menuTarget => {
                if (menuTarget.getAttribute('data-id') === idButton && !boolButton){
                    menuTarget.classList.add('active')
                } else {
                    menuTarget.classList.remove('active')
                }
             })
            event.preventDefault()
        });
        searchCloseBtn.addEventListener('click', function (event) {
            let parent = this.parentElement.parentElement;
            parent.classList.remove('active')
            resetBtnClasses()
        })
    })

    function resetBtnClasses() {
        menuButtonsNodes.forEach(btn => {
            btn.classList.remove('active')
        })
    }
}
export default halfTemplate