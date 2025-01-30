const admin = require('firebase-admin')
const serviceAccount = require('../firebase.json')
  


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
  } else {
    admin.app()
  }

const db = admin.firestore();

async function setUrl(url, shorturl) {
    const docRef = db.collection('shorturl').doc(shorturl)

    const doc = await docRef.get()
    if (doc.exists) {
        return new Response(
            "Short URL Already Exist", { status: 302 }
        );
    } else {
        try{
            const collection = await docRef.set({
                url: url
            })
            return new Response(
                "URL Assigned", { status: 200 }
            );
        }catch(err){
            console.log(`error : ${err}`)
            return new Response(
                "Something Went Wrong", { status: 405 }
            );
        }
    }
}

async function getUrl(shorturl) {
    const docRef = db.collection('shorturl').doc(shorturl)

    const doc = await docRef.get()
    if (doc.exists) {
        return new Response(
            doc.data().url, { status: 200 }
        )
    } else {
        return new Response(
            "No Short URL Assigned", { status: 405 }
        )
    }
}


/*async function get() {
    const doc = await docRef.get()

    if (doc.exists) {
        console.log('Document data:', doc.data())
    } else {
        console.log('No such document!')
    }
}

async function erase() {
    await db.collection('shorturl').doc('url1').delete()
    console.log("Deleted")
}*/

export { setUrl, getUrl }