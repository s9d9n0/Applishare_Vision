
function getDateRef(ObjDate) {
    const dateAnStr = ObjDate[0]["dateJour"].substring(0,4)
    const dateMoisStr = ObjDate[0]["dateJour"].substring(5,7)
    const dateJourStr = ObjDate[0]["dateJour"].substring(8,10)
    const dateHeurStr = ObjDate[0]["dateJour"].substring(11,13)
    switch (dateMoisStr) {
        case "01": MoisRef = "janvier"; break;   case "02": MoisRef = "février"; break;
        case "03": MoisRef = "mars"; break;      case "04": MoisRef = "avril"; break;
        case "05": MoisRef = "mai"; break;       case "06": MoisRef = "juin"; break;
        case "07": MoisRef = "juillet"; break;   case "08": MoisRef = "août"; break;
        case "09": MoisRef = "septembre"; break; case "10": MoisRef = "octobre"; break;
        case "11": MoisRef = "novembre"; break;  case "12": MoisRef = "décembre"; break;
    }
    let champDate = document.getElementById("dateRef");
    champDate.innerHTML = "date de référence : le "+dateJourStr+" "+MoisRef+" "+dateAnStr+" - "+dateHeurStr+`<i><sup>h</sup></i>`;
}



function getDateRef_Histo(ObjDate) {
    const dateAnStr = ObjDate[0]["dateJour"].substring(0,4)
    const dateMoisStr = ObjDate[0]["dateJour"].substring(5,7)
    const dateJourStr = ObjDate[0]["dateJour"].substring(8,10)
    const dateHeurStr = ObjDate[0]["dateJour"].substring(11,13)
    switch (dateMoisStr) {
        case "01": MoisRef = "janv."; break; case "02": MoisRef = "févr."; break;
        case "03": MoisRef = "mars"; break;  case "04": MoisRef = "avr."; break;
        case "05": MoisRef = "mai"; break;   case "06": MoisRef = "juin"; break;
        case "07": MoisRef = "juil."; break; case "08": MoisRef = "août"; break;
        case "09": MoisRef = "sept."; break; case "10": MoisRef = "oct."; break;
        case "11": MoisRef = "nov."; break;  case "12": MoisRef = "déc."; break;
    }

    const todayDate = new Date(dateAnStr+'-'+dateMoisStr+'-'+dateJourStr);
    const fourteenDaysAgo = new Date(todayDate - (14 * 24 * 60 * 60 * 1000));
    console.log("aujourd'hui : "+todayDate);
    console.log("il y a 14 jours : "+fourteenDaysAgo);

    const dateAn14dbeforeStr = fourteenDaysAgo.getFullYear()
    // const dateMois14dbeforeStr = fourteenDaysAgo.getMonth();
    const dateMois14dbeforeStr = ('0' + (fourteenDaysAgo.getMonth() + 1)).slice(-2);
    // const dateJour14dbeforeStr = fourteenDaysAgo.getDate();
    const dateJour14dbeforeStr = ('0' + fourteenDaysAgo.getDate()).slice(-2);

    console.log("il y a 14 jours (bis) : "+dateAn14dbeforeStr+"-"+dateMois14dbeforeStr+"-"+dateJour14dbeforeStr);
    
    switch (dateMois14dbeforeStr) {
        case "01": Mois14dbeforeRef = "janv."; break; case "02": Mois14dbeforeRef = "févr."; break;
        case "03": Mois14dbeforeRef = "mars"; break;  case "04": Mois14dbeforeRef = "avr."; break;
        case "05": Mois14dbeforeRef = "mai"; break;   case "06": Mois14dbeforeRef = "juin"; break;
        case "07": Mois14dbeforeRef = "juil."; break; case "08": Mois14dbeforeRef = "août"; break;
        case "09": Mois14dbeforeRef = "sept."; break; case "10": Mois14dbeforeRef = "oct."; break;
        case "11": Mois14dbeforeRef = "nov."; break;  case "12": Mois14dbeforeRef = "déc."; break;
    }

    let champDate = document.getElementById("dateRef");
    champDate.innerHTML = "période de référence : du "+ 
                            dateJour14dbeforeStr+" "+Mois14dbeforeRef+" au "+
                            dateJourStr+" "+MoisRef+
                            " (mesures prises à 8"+`<i><sup>h</sup></i>`+")";
}