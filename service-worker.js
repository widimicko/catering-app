importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js')

if (workbox) {
  workbox.precaching.precacheAndRoute(
    [
      { url: '/', revision: '1' },
      { url: '/index.html', revision: '1' },
      { url: '/index.js', revision: '1' },
      { url: '/manifest.json', revision: '1' },
      { url: '/app/firestore.js', revision: '1' },
      { url: '/app/view.js', revision: '2' },
      { url: '/css/style.css', revision: '1' },
      { url: '/pages/nav.html', revision: '1' },
      { url: '/pages/beranda.html', revision: '1' },
      { url: '/pages/detail.html', revision: '1' },
      { url: '/pages/katering.html', revision: '1' },
      { url: '/src/img/globe.png', revision: '1' },
      { url: '/src/img/wa.png', revision: '1' },
      { url: '/src/img/easy.png', revision: '1' },
      { url: '/src/img/error.png', revision: '1' },
      { url: '/src/img/fast.png', revision: '1' },
      { url: '/src/img/secure.png', revision: '1' },
      { url: '/src/img/vector.png', revision: '1' },
      { url: '/src/img/verified.png', revision: '1' },
      { url: '/src/materialize/materialize.min.css', revision: '1' },
      { url: '/src/materialize/materialize.min.js', revision: '1' },
      { url: 'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
      { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
      { url: 'https://unpkg.com/snarkdown@2.0.0/dist/snarkdown.umd.js', revision: '1' }
    ],
    {
      ignoreUrlParametersMatching: [/.*/]
    }
  )

  workbox.routing.registerRoute(
    new RegExp('firestore.googleapis.com'),
    workbox.strategies.networkFirst({
      cacheName: 'Caterings'
    })
  )

  workbox.routing.registerRoute(
    new RegExp('https://restaurant-api.dicoding.dev/images/'),
    workbox.strategies.networkFirst({
      cacheName: 'CateringImage'
    })
  )

  workbox.routing.registerRoute(
    new RegExp('https://www.themealdb.com/images/media/meals/'),
    workbox.strategies.networkFirst({
      cacheName: 'menuImage'
    })
  )
} else console.error('Workbox fail to load')
