
// BROUILLON...
// const today = new Date();
// const month = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin',
//                 'juillet', 'août','septembre', 'octobre', 'novembre', 'decembre'];
// let todayFormat =
//     today.getDate() + ' ' + month[today.getMonth()] + ' ' + today.getFullYear();
// console.log(todayFormat);
// let champDate = document.getElementById("dateRef");
// champDate.innerText = todayFormat;


// lecture de la date du jour
const fetchPeriodeRef = () => {
    return new Promise((resolve, reject) => (
        fetch("./json/dateJour.json")
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    ))
}

// lecture liste des VV
const fetchDataVV = () => {
    return new Promise((resolve, reject) => (
        fetch("./json/df_listVV.json")
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    ))
}

//lecture Top20 des VV les plus utlisés
const fetchDataVVTop20 = () => {
    return new Promise((resolve, reject) => (
        fetch("./json/df_listVV_top20.json")
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    ))
}

//lecture Historique des VV sur les derniers jours
const fetchDataVV_Histo = () => {
    return new Promise((resolve, reject) => (
        fetch("./json/df_listVV_histo.json")
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    ))
}


// lecture liste des FS
const fetchDataFS = () => {
    return new Promise((resolve, reject) => (
        fetch("./json/df_listFS.json")
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    ))
}

//lecture Top20 des FS les plus utlisés
const fetchDataFSTop20 = () => {
    return new Promise((resolve, reject) => (
        fetch("./json/df_listFS_top20.json")
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    ))
}

// #################################################################
// #################################################################
// #################################################################

async function getAllDataVV() {
    periodeRef = await fetchPeriodeRef()
    console.log("\n")
    console.log("# Obtention de la date de référence : ####");
    console.log("date de réf : "+periodeRef[0]["dateJour"]);
    console.log("type de periodeRef : " + typeof periodeRef);
    console.log("type de periodeRef[0]['dateJour'] : " + typeof periodeRef[0]["dateJour"]);
    // mobilisation de la fonction getDateRef définie dans le script Js_01_AffichDate.js
    // qui introduit la date dans la page HTML
    getDateRef(periodeRef);
    console.log("##########################################")

    data = await fetchDataVV()
    console.log("\n")
    console.log("# Obtention des datas du tableau : #######");
    console.log(data);
    console.log("type de data : " + typeof(data));
    console.log("affichage de data[0] : ")
    console.log(data[0]);
    console.log("##########################################")

    dataTop20 = await fetchDataVVTop20()
    console.log("\n")
    console.log("# Obtention des datas du tableauTOP20 : ##");
    console.log(dataTop20);
    console.log("type de dataTop20 : " + typeof(dataTop20));
    console.log("affichage de dataTop20[0] : ");
    console.log(dataTop20[0]);
    console.log("##########################################")

    return [periodeRef, data, dataTop20];
}




async function getAllDataVV_Histo() {
    periodeRef = await fetchPeriodeRef()
    console.log("\n")
    console.log("# Obtention de la date de référence : ####");
    console.log("date de réf : "+periodeRef[0]["dateJour"]);
    console.log("type de periodeRef : " + typeof periodeRef);
    console.log("type de periodeRef[0]['dateJour'] : " + typeof periodeRef[0]["dateJour"]);
    // mobilisation de la fonction getDateRef définie dans le script Js_01_AffichDate.js
    // qui introduit la date dans la page HTML
    getDateRef_Histo(periodeRef);
    console.log("##########################################")

    dataHisto = await fetchDataVV_Histo()
    console.log("\n")
    console.log("# Obtention des datas du tableau : #######");
    console.log(dataHisto);
    console.log("type de data : " + typeof(dataHisto));
    console.log("affichage de data[0] : ")
    console.log(dataHisto[0]);
    console.log("##########################################")

    return [periodeRef, dataHisto];
}




async function getAllDataFS() {
    periodeRef = await fetchPeriodeRef()
    console.log("\n")
    console.log("# Obtention de la date de référence : ####");
    console.log("date de réf : "+periodeRef[0]["dateJour"]);
    console.log("type de periodeRef : " + typeof periodeRef);
    console.log("type de periodeRef[0]['dateJour'] : " + typeof periodeRef[0]["dateJour"]);
    // mobilisation de la fonction getDateRef définie dans le script Js_01_AffichDate.js
    // qui introduit la date dans la page HTML
    getDateRef(periodeRef);
    console.log("##########################################")

    data = await fetchDataFS()
    console.log("\n")
    console.log("# Obtention des datas du tableau : #######");
    console.log(data);
    console.log("type de data : " + typeof(data));
    console.log("affichage de data[0] : ")
    console.log(data[0]);
    console.log("##########################################")

    dataTop20 = await fetchDataFSTop20()
    console.log("\n")
    console.log("# Obtention des datas du tableauTOP20 : ##");
    console.log(dataTop20);
    console.log("type de dataTop20 : " + typeof(dataTop20));
    console.log("affichage de dataTop20[0] : ");
    console.log(dataTop20[0]);
    console.log("##########################################")

    return [periodeRef, data, dataTop20];
}