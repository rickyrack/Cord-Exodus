const { doc, collection, getDocs, getDoc, updateDoc, increment } = require("firebase/firestore");
const { db } = require("../../firebase-config");

const useResource = async (id, userID, adminBypass) => {
        // res is short for resources
        const resRef = collection(db, 'resources');
        const resSnap = await getDocs(resRef);
        let resFound = false;
        const resUse = {};
    
        resSnap.forEach((doc) => {
            const docRes = Object.keys(doc.data());
            docRes.forEach(res => {
                if(res === id) {
                    resFound = res;
                    switch (doc.id) {
                        case 'Drink':
                            resUse.type = 'thirst';
                            resUse.amt = doc.data()[res][resUse.type];
                            break;
                        case 'Food':
                            resUse.type = 'hunger';
                            resUse.amt = doc.data()[res][resUse.type];
                            break;
                        // add more as you go
                    }
                    //resData = doc.data()[resFound]; this was for addResource()
                }
            })
        })
    
        if(!resFound) return false;

        const userRef = doc(db, 'users', userID);
        const userSnap = await getDoc(userRef);
        let hasRes = false;
    
        if(Object.keys(userSnap.data().backpack).includes(resFound)) {
            hasRes = true;
        }

        console.log(userSnap.data().backpack[resFound].amt);
        console.log(resUse.amt);
        if(hasRes && userSnap.data().backpack[resFound].amt > 0) {
            await updateDoc(userRef, {
                [`stats.${resUse.type}`]: increment(resUse.amt)
            })
            if(!adminBypass) {
                await updateDoc(userRef, {
                    [`backpack.${resFound}.amt`]: increment(-1),
                })
            }
            if(userSnap.data().stats[resUse.type] > 100) {
                await updateDoc(userRef, {
                    [`stats.${resUse.type}`]:
                        increment(100 - userSnap.data().stats[resUse.type])
                })
                // needs to rerun somehow not catching change in time
            }
        }
        else {
            return false
        }
    
        return true; //uhh what should this be
}

module.exports = { useResource };