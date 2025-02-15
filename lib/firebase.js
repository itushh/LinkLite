const admin = require('firebase-admin')
const serviceAccount = {
    "type": "service_account",
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL,
    "universe_domain": "googleapis.com"
  }

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