// style="width: 100px;"

function getColnameJson(DataRef){
    let list = new Array();
    for (i = 20; i <= 50; i++) {
        list.push(Object.keys(DataRef[1])[i]);
    }
    console.log(list);
    return list;
}
listColName = getColnameJson(DataRef);
console.log("nom de la colonne 1 : "+listColName[1]);




function getTableVVHead_Histo(listColName) {

    // console.log("echo de la liste : "+listColName[1]);
    let listEntete = new Array();
    for (i = 1; i<=15; i++) { 
        console.log("echo de la liste à l'emplacement "+i+" : "+listColName[i]);
        let numMois = listColName[i].substring(3,5);
        switch (numMois) {
            case "01": strMois = "janv."; break; case "02": strMois = "févr."; break;
            case "03": strMois = "mars"; break;  case "04": strMois = "avr."; break;
            case "05": strMois = "mai"; break;   case "06": strMois = "juin"; break;
            case "07": strMois = "juil."; break; case "08": strMois = "août"; break;
            case "09": strMois = "sept."; break; case "10": strMois = "oct."; break;
            case "11": strMois = "nov."; break;  case "12": strMois = "déc."; break;
        }
        listEntete.push(listColName[i].substring(5,7)+" <br/> "+strMois);
    }
    console.log("echo de listEntete : "+listEntete);

    const thead = document.querySelector('thead');
    tags  = `<tr>
                <th onclick="sortTable('MaTableVV_Histo',0)">Env.</th>
                <th onclick="sortTable('MaTableVV_Histo',1)">Quartier</th>
                <th onclick="sortTable('MaTableVV_Histo',2)">DC</th>
                <th onclick="sortTable('MaTableVV_Histo',3)">Zone</th>
                <th onclick="sortTable('MaTableVV_Histo',4)">Type</th>

                <th id="colApplication">
                    <div class="placementApplication">
                        <div>Application</div>
                        <div><input type="text" id="application"
                                placeholder="recherche..." title="rech sur application"
                                onfocusin="focusInColonne('application')"
                                onfocusout="focusOutColonne('application')" 
                                onkeyup="filtreColonne('MaTableVV_Histo','application',5)">
                        </div>
                    </div>
                    <div class="fleche">
                        <a class="asc5" onclick="sortESSAI_Table('MaTableVV_Histo','asc',5)">&#x25b4;</a>
                        <a class="desc5" onclick="sortESSAI_Table('MaTableVV_Histo','desc',5)">&#x25be;</a>
                    </div>
                </th>

                <th onclick="sortTable('MaTableVV_Histo',6)">Quota VV <br/> (en GB)</th>

                <th>`+listEntete[0]+`</th>  <th>`+listEntete[1]+`</th>  <th>`+listEntete[2]+`</th>
                <th>`+listEntete[3]+`</th>  <th>`+listEntete[4]+`</th>  <th>`+listEntete[5]+`</th>
                <th>`+listEntete[6]+`</th>  <th>`+listEntete[7]+`</th>  <th>`+listEntete[8]+`</th>
                <th>`+listEntete[9]+`</th>  <th>`+listEntete[10]+`</th> <th>`+listEntete[11]+`</th>
                <th>`+listEntete[12]+`</th> <th>`+listEntete[13]+`</th> <th>`+listEntete[14]+`</th>

            </tr>`
    thead.innerHTML = tags;
}




function getTableVVBody_Histo(DataRef,listColName){
    const tbody = document.querySelector('tbody');

    listColName = getColnameJson(DataRef);
    // console.log("nom de la colonne 1 : "+listColName[1]);
    // nomcolcap = Object.keys(DataRef[1])[20];

    // nomcoluse15 = Object.keys(DataRef[1])[21];
    // nomcoluse14 = Object.keys(DataRef[1])[22];

    // nomcolprct15 = Object.keys(DataRef[1])[36];
    // console.log(nomcolprct15);
    // nomcolprct14 = Object.keys(DataRef[1])[37];
    // console.log(nomcolprct14);

    let tags = "";
    DataRef.map((d,index) =>{
        tags += `<tr>
            <td style="text-align:center;">${d.env}</td>
            <td style="text-align:center;">${d.quartier}</td>
            <td style="text-align:center;">${d.dc}</td>
            <td style="text-align:center;">${d.zone}</td>
            <td style="text-align:center;">${d.type}</td>
            <td>${d.Application}</td>`

            // tags += `<td>${parseFloat(d[nomcolcap])}</td>`
            tags += `<td>${parseFloat(d[listColName[0]])}</td>`

            // if (d['UsePrct0903_08h']<30){
            //     tags += `<td style="background-image: linear-gradient(to top, #00FF00 ${d['UsePrct0903_08h']}%, #FFFFFF ${d['UsePrct0903_08h']}%);">${d['Use0903_08h']}</td>`}

            // if (d[nomcolprct15]<30){
            //     tags += `<td style="background-image: linear-gradient(to top, #00FF00 ${d[nomcolprct15]}%, #FFFFFF ${d[nomcolprct15]}%);">${d[nomcoluse15]}</td>`}

            // if (d[nomcolprct14]<30){
            //     tags += `<td style="background-image: linear-gradient(to top, #00FF00 ${d[nomcolprct14]}%, #FFFFFF ${d[nomcolprct14]}%);">${d[nomcoluse14]}</td>`}

            // if (d[listColName[16]]<30){
            //     tags += `<td style="background-image: linear-gradient(to top, #00FF00 ${d[listColName[16]]}%, #FFFFFF ${d[listColName[16]]}%);">${d[listColName[1]]}</td>`}

            console.log("longueur de la liste de colonne : "+listColName.length);

            for (i = 16; i<=listColName.length-1; i++) {
                if (d[listColName[i]]<30){
                    tags += `<td style="background-image: linear-gradient(to top, #00FF00 ${d[listColName[i]]}%, #FFFFFF ${d[listColName[i]]}%);">${d[listColName[i-15]]}</td>`}
                if (d[listColName[i]]>=30 && d[listColName[i]]<40){
                    tags += `<td style="background-image: linear-gradient(to top, #20F900 ${d[listColName[i]]}%, #FFFFFF ${d[listColName[i]]}%);">${d[listColName[i-15]]}</td>`}
                if (d[listColName[i]]>=40 && d[listColName[i]]<50){
                    tags += `<td style="background-image: linear-gradient(to top, #40F300 ${d[listColName[i]]}%, #FFFFFF ${d[listColName[i]]}%);">${d[listColName[i-15]]}</td>`}
                if (d[listColName[i]]>=50 && d[listColName[i]]<60){
                    tags += `<td style="background-image: linear-gradient(to top, #80E600 ${d[listColName[i]]}%, #FFFFFF ${d[listColName[i]]}%);">${d[listColName[i-15]]}</td>`}
                if (d[listColName[i]]>=60 && d[listColName[i]]<70){
                    tags += `<td style="background-image: linear-gradient(to top, #C0D900 ${d[listColName[i]]}%, #FFFFFF ${d[listColName[i]]}%);">${d[listColName[i-15]]}</td>`}
                if (d[listColName[i]]>=70 && d[listColName[i]]<80){
                    tags += `<td style="background-image: linear-gradient(to top, #E0D300 ${d[listColName[i]]}%, #FFFFFF ${d[listColName[i]]}%);">${d[listColName[i-15]]}</td>`}
                if (d[listColName[i]]>=80 && d[listColName[i]]<90){
                    tags += `<td style="background-image: linear-gradient(to top, #F0D000 ${d[listColName[i]]}%, #FFFFFF ${d[listColName[i]]}%);">${d[listColName[i-15]]}</td>`}
                if (d[listColName[i]]>=90 && d[listColName[i]]<92){
                    tags += `<td style="background-image: linear-gradient(to top, #FFCC00 ${d[listColName[i]]}%, #FFFFFF ${d[listColName[i]]}%);">${d[listColName[i-15]]}</td>`}
                if (d[listColName[i]]>=92 && d[listColName[i]]<94){
                    tags += `<td style="background-image: linear-gradient(to top, #FF9F00 ${d[listColName[i]]}%, #FFFFFF ${d[listColName[i]]}%);">${d[listColName[i-15]]}</td>`}
                if (d[listColName[i]]>=94 && d[listColName[i]]<96){
                    tags += `<td style="background-image: linear-gradient(to top, #FF7100 ${d[listColName[i]]}%, #FFFFFF ${d[listColName[i]]}%);">${d[listColName[i-15]]}</td>`}
                if (d[listColName[i]]>=96 && d[listColName[i]]<98){
                    tags += `<td style="background-image: linear-gradient(to top, #FF4300 ${d[listColName[i]]}%, #FFFFFF ${d[listColName[i]]}%);">${d[listColName[i-15]]}</td>`}
                if (d[listColName[i]]>=98){
                    tags += `<td style="background-image: linear-gradient(to top, #FF1500 ${d[listColName[i]]}%, #FFFFFF ${d[listColName[i]]}%);">${d[listColName[i-15]]}</td>`}
            }

        tags += `</tr>`
    })
    tbody.innerHTML = tags;
}
