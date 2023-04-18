const { doc, setDoc } = require("@firebase/firestore");
const { db } = require("../../firebase-config")

const start = async (user) => {
    const docRef = doc(db, 'users', 'test2');

    const date = new Date();
    await setDoc(docRef, {
        created: date.toLocaleDateString(),
        id: user.id,
        username: user.username
    })
}

module.exports = { start };