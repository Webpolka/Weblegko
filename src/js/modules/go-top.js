function goTop(svgIcon) {
    const goTopBtn = document.querySelector(".go-top")
    let svg = goTopBtn.innerHTML = svgIcon    
    
    window.addEventListener("scroll", trackScroll)
    goTopBtn.addEventListener("click", goTop)
    function trackScroll() {
        const scrolled = window.pageYOffset
        const coords = document.documentElement.clientHeight
       
        
        if (scrolled > coords) {
            goTopBtn.classList.add("go-top--show")
        } else {
            goTopBtn.classList.remove("go-top--show")
        }
    }

    function goTop() {
        let wh = window.innerWidth
        if (window.pageYOffset > 0) {
            window.scrollBy(0, -wh)
        }
    }
}
export default goTop