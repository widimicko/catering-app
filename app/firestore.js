import { showCaterings, showCateringDetail, showCateringMenus, removeCatering, updateCatering } from './view.js'

require('dotenv').config()

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
}

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig)
// eslint-disable-next-line no-undef
const db = firebase.firestore()

db.enablePersistence().catch(err => {
  if (err.code === 'failed-precondition') {
    console.log('multiple tabs opened')
  } else if (err.code === 'unimplemented') {
    console.log('browser not support')
  }
})

const getCaterings = () => {
  db.collection('caterings').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
          showCaterings(change.doc.data(), change.doc.id)
        }
      }
      if (change.type === 'removed') {
        removeCatering(change.doc.id)
      }
      if (change.type === 'modified') {
        updateCatering(change.doc.data(), change.doc.id)
      }
    })
  })
}

const getCateringDetail = id => {
  db.collection('caterings').doc(id)
    .get()
    .then((doc) => showCateringDetail(doc.id, doc.data()))
    .catch((error) => {
      console.log('Error getting documents: ', error)
    })
}

const getCateringMenus = id => {
  db.collection('caterings').doc(id).collection('menus')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => showCateringMenus(doc.id, doc.data()))
    }).catch((error) => {
      console.log('Error getting documents: ', error)
    })
}

export { getCaterings, getCateringDetail, getCateringMenus }
