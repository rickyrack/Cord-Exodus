const { collection, query, getDocs } = require("firebase/firestore");
const { db } = require("../../firebase-config");

const explore = async () => {
    const resRef = collection(db, 'resources');
    const exploreSnap = await getDocs(resRef);

    const resources = [];
    exploreSnap.forEach((doc) => {
        if(doc.id === 'Food' || doc.id === 'Drink') { // add more as you go
            Object.keys(doc.data()).forEach((res) => {
                if(doc.data()[res]?.explore === true) {
                    resources.push(doc.data()[res]);
                }
            })
        }
    })

    return resources;
}

module.exports = { explore };