import { loadNav, loadPage } from './app/view.js'
import './css/style.css'
import './src/materialize/materialize.min.css'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(reg => console.log('Service Worker registered', reg))
    .catch(err => console.error('Service Worker register error: ', err))
}

document.addEventListener('DOMContentLoaded', () => {
  let page = window.location.hash.substr(1)
  if (page === '' || page === '/index.html') page = 'beranda'

  const elems = document.querySelectorAll('.sidenav')
  // eslint-disable-next-line no-undef
  M.Sidenav.init(elems)

  loadNav()
  loadPage(page)
})
