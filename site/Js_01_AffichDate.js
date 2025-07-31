
function getDateRef(ObjDate) {
    const dateAnStr = ObjDate[0]["dateJour"].substring(0,4)
    const dateMoisStr = ObjDate[0]["dateJour"].substring(5,7)
    const dateJourStr = ObjDate[0]["dateJour"].substring(8,10)
    const dateHeurStr = ObjDate[0]["dateJour"].substring(11,13)
    switch (dateMoisStr) {
        case "01": MoisRef = "janvier"; break;
        case "02": MoisRef = "février"; break;
        case "03": MoisRef = "mars"; break;
        case "04": MoisRef = "avril"; break;
        case "05": MoisRef = "mai"; break;
        case "06": MoisRef = "juin"; break;
        case "07": MoisRef = "juillet"; break;
        case "08": MoisRef = "août"; break;
        case "09": MoisRef = "septembre"; break;
        case "10": MoisRef = "octobre"; break;
        case "11": MoisRef = "novembre"; break;
        case "12": MoisRef = "décembre"; break;
    }
    let champDate = document.getElementById("dateRef");
    champDate.innerHTML = "date de référence : le "+dateJourStr+" "+MoisRef+" "+dateAnStr+" - "+dateHeurStr+`<i><sup>h</sup></i>`;
}