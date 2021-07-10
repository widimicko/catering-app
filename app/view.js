import { getCaterings, getCateringDetail, getCateringMenus } from './firestore.js'

let idCatering = ''

const loadNav = () => {
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status !== 200) return

      document.querySelectorAll('.topnav, .sidenav').forEach((elm) => {
        elm.innerHTML = xhttp.responseText
      })

      document.querySelectorAll('.sidenav a, .topnav a').forEach((elm) => {
        elm.addEventListener('click', (event) => {
          const sidenav = document.querySelector('.sidenav')
          // eslint-disable-next-line no-undef
          M.Sidenav.getInstance(sidenav).close()

          const page = event.target.getAttribute('href').substr(1)
          loadPage(page)
        })
      })
    }
  }
  xhttp.open('GET', '/pages/nav.html', true)
  xhttp.send()
}

const showCaterings = (data, id) => {
  let cateringsData = ''
  const cateringElement = document.getElementById('caterings')
  document.getElementById('preloader').style.display = 'none'

  function shorten (str, maxLen, separator = ' ') {
    if (str.length <= maxLen) return str
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + ' ...'
  }

  cateringsData += `
      <div class="col s6 m4 l3" id="catering" data-id="${id}">
        <div class="card caterings-card medium">
            <div class="card-image">
                <img class="responsive-img" src="${data.image}" alt="Catering Image">
            </div>
            <div class="card-content">
                <span class="caterings-name" style="font-weight: bold">${data.catering_name}</span>
                <hr>
                <p class="caterings-desc">${shorten(data.description, 50)}</p>
            </div>
            <div class="card-action">
              <a href="#detail?id=${id}" id="cateringId"><i class="material-icons left">read_more</i>Detail</a>
            </div>
        </div>
      </div>
    `
  cateringElement.innerHTML += cateringsData

  document.querySelectorAll('#cateringId').forEach((link) => {
    link.addEventListener('click', (event) => {
      idCatering = event.target.getAttribute('href').substr(11)
      loadPage('detail')
    })
  })
}

const showCateringDetail = (id, data) => {
  const cateringElement = document.getElementById('catering')
  document.getElementById('preloader').style.display = 'none'

  const cateringDetail = `
        <div class="card" id="catering-detail" data-id="${id}">
          <div class="catering-information"">
              <center><h4>${data.catering_name}</h4></center>
          </div>
          <div class="card-image" style="margin-top: 1em;">
            <img class="image-catering responsive-img" src="${data.image}" alt="Catering Image" />
          </div>
          <div class="card-content">
            <h5>Informasi Katering</h5>
            <tr>
              <td>Pemilik</td>
              <td>:</td>
              <td>${data.owner}</td>
            </tr><br>
            <tr>
              <td>Alamat</td>
              <td>:</td>
              <td>${data.address}</td>
            </tr><br>
            <tr>
              <td>Telepon</td>
              <td>:</td>
              <td>${data.phone}</td>
            </tr><br>
            <tr>
              <td><a href="https://api.whatsapp.com/send/?phone=${data.phone}" target="blank">Hubungi Whatsapp</a></td>
              <td>atau</td>
              <td><a href="${data.socialmedia_link}" target="blank">Kunjungi Situs</a></td>
            </tr>
            <br><br><br>
            <p><strong>Deskripsi</strong></p>
            <hr>
            <p>${data.description}</p>
            <hr>
            <br>
            <p><b>Paket Tersedia</b><p><br>
            <div class="row" id="menus"></div>
          </div>
        </div>
    `

  cateringElement.innerHTML = cateringDetail
}

const showCateringMenus = (id, data) => {
  const menusElement = document.getElementById('menus')

  function idrFormat (num) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(num)
  }

  const menu = `
  <div class="col s12 m6 l3">
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator responsive-img" src="${data.image}" alt="menu image">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4"><strong>${id}</strong><i class="material-icons right">more_vert</i></span>
        <p><b>${idrFormat(data.price)}</b></p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4"><strong>${id}</strong><i class="material-icons right">close</i></span>
        <p>${data.desc}</p>
      </div>
    </div>
  </div>
  `
  menusElement.innerHTML += menu
}

const removeCatering = (id) => {
  const catering = document.querySelector(`#catering[data-id=${id}`)
  catering.remove()
}

const updateCatering = (data, id) => {
  const catering = document.querySelector(`#catering[data-id="${id}"`)
  catering.querySelector('.caterings-image').setAttribute('src', data.image)
  catering.querySelector('.caterings-name').innerHTML = data.catering_name
  catering.querySelector('.caterings-desc').innerHTML = data.description
}

const showFallback = () => {
  return `
    <div class="row">
      <div class="col s12 m6 l6">
        <h2>Upss.. Sepertinya ada yang salah, </h2>
        <p>Mohon maaf atas ketidaknyamanannya</p>
      </div>
      <div class="col s12 m6 l6">
        <img class="responsive-img" src="/src/img/error.png">
      </div>
    </div>
  `
}

const loadPage = page => {
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      const content = document.querySelector('#body-content')

      if (page === 'katering') getCaterings()
      else if (page === 'detail') {
        getCateringDetail(idCatering)
        getCateringMenus(idCatering)
      }
      if (this.status === 200) content.innerHTML = xhttp.responseText
      else if (this.status === 404) {
        content.innerHTML = showFallback()
        window.setTimeout(function () { window.location = '/' }, 3000)
      } else content.innerHTML = showFallback()
    }
  }

  xhttp.open('GET', `/pages/${page}.html`)
  xhttp.send()
}

export { loadNav, showCaterings, showCateringDetail, showCateringMenus, removeCatering, updateCatering, loadPage }
