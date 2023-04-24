const { doc, getDoc } = require("firebase/firestore")
const { db } = require("../../firebase-config")

const getBackpack = async (user) => {
    const userRef = doc(db, 'users', user.id);
    const userSnap = await getDoc(userRef);

    const backpack = userSnap.data().backpack;

    return backpack;
}

module.exports = { getBackpack };