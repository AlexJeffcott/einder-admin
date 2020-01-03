export default themeName => {
    document.documentElement.classList.add('theme-in-transition')
    document.documentElement.setAttribute('data-theme', themeName)
    window.setTimeout(() => {
        document.documentElement.classList.remove('theme-in-transition')
    }, 1000)
}