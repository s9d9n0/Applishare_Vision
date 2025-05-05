// style="width: 100px;"

function getTableHead() {
    const thead = document.querySelector('thead');
    tags  = `<tr>
                <th id="colVolume">
                    <a onclick="sortTable(0)">Volume&nbsp;</a>
                    <a><input type="text" id="volume" placeholder="recherche..." title="rech sur volume"
                            onfocusin="focusInColonne('volume')" onfocusout="focusOutColonne('volume')" 
                            onkeyup="filtreColonne('volume',0)">
                    </a>
                    <div class="fleche">
                        <a>&#x25b4;Up&nbsp;</a>
                        <a>&nbsp;Down&#x25be;</a>
                    </div>
                </th>
                <th onclick="sortTable(1)">Env.</th>
                <th onclick="sortTable(2)">Quartier</th>
                <th onclick="sortTable(3)">DC</th>
                <th onclick="sortTable(4)">Zone</th>
                <th onclick="sortTable(5)">Type</th>
                <th id="colApplication">
                    <a onclick="sortESSAI_Table(6)">Application&nbsp;</a>
                    <a><input type="text" id="application" placeholder="recherche..." title="rech sur application"
                            onfocusin="focusInColonne('application')" onfocusout="focusOutColonne('application')" 
                            onkeyup="filtreColonne('application',6)">
                    </a>
                    <div class="fleche">
                        <a>&#x25b4;Up&nbsp;</a>
                        <a>&nbsp;Down&#x25be;</a>
                    </div>
                </th>
                <th onclick="sortTable(7)">Quota VV </br> (en GB)</th>
                <th onclick="sortTable(8)">Niv. d'utilisation </br> (en GB)</th>
                <th onclick="sortTable(9)">Niv. d'utilisation </br> (en %)</th>
             </tr>`
    thead.innerHTML = tags;
}


// function getTableBody(DataRef){
//     const tbody = document.querySelector('tbody');
//     let tags = "";
//     for (let j=0; j<Object.keys(DataRef).length; j++){
//     tags += `<tr>
//                 <td style="text-align:center;">${DataRef[j].Volume}</td>
//                 <td style="text-align:center;">${DataRef[j].env}</td>
//                 <td style="text-align:center;">${DataRef[j].quartier}</td>
//                 <td style="text-align:center;">${DataRef[j].dc}</td>
//                 <td style="text-align:center;">${DataRef[j].zone}</td>
//                 <td style="text-align:center;">${DataRef[j].type}</td>
//                 <td>${DataRef[j].Application}</td>
//                 <td>${parseFloat(DataRef[j].Cap)}</td>
//                 <td>${parseFloat(DataRef[j].Use)}</td>
//                 <td>${parseFloat(DataRef[j]['Use%'])}</td>
//              </tr>`
//     }
//     tbody.innerHTML = tags;
// }

function getTableBody(DataRef){
    const tbody = document.querySelector('tbody');
    let tags = "";
    DataRef.map((d,index) =>{
        tags += `<tr>
            <td style="text-align:center;">${d.Volume}</td>
            <td style="text-align:center;">${d.env}</td>
            <td style="text-align:center;">${d.quartier}</td>
            <td style="text-align:center;">${d.dc}</td>
            <td style="text-align:center;">${d.zone}</td>
            <td style="text-align:center;">${d.type}</td>
            <td>${d.Application}</td>
            <td>${parseFloat(d.Cap)}</td>
            <td>${parseFloat(d.Use)}</td>`

            if (d['Use%']<30){
                tags += `<td style="background-image: linear-gradient(to right, #00FF00 ${d['Use%']}%, #FFFFFF ${d['Use%']}%);">${d['Use%']}</td>`}
            if (d['Use%']>=30 && d['Use%']<40){
                tags += `<td style="background-image: linear-gradient(to right, #20F900 ${d['Use%']}%, #FFFFFF ${d['Use%']}%);">${d['Use%']}</td>`}
            if (d['Use%']>=40 && d['Use%']<50){
                tags += `<td style="background-image: linear-gradient(to right, #40F300 ${d['Use%']}%, #FFFFFF ${d['Use%']}%);">${d['Use%']}</td>`}
            if (d['Use%']>=50 && d['Use%']<60){
                tags += `<td style="background-image: linear-gradient(to right, #80E600 ${d['Use%']}%, #FFFFFF ${d['Use%']}%);">${d['Use%']}</td>`}
            if (d['Use%']>=60 && d['Use%']<70){
                tags += `<td style="background-image: linear-gradient(to right, #C0D900 ${d['Use%']}%, #FFFFFF ${d['Use%']}%);">${d['Use%']}</td>`}
            if (d['Use%']>=70 && d['Use%']<80){
                tags += `<td style="background-image: linear-gradient(to right, #E0D300 ${d['Use%']}%, #FFFFFF ${d['Use%']}%);">${d['Use%']}</td>`}
            if (d['Use%']>=80 && d['Use%']<90){
                tags += `<td style="background-image: linear-gradient(to right, #F0D000 ${d['Use%']}%, #FFFFFF ${d['Use%']}%);">${d['Use%']}</td>`}
            if (d['Use%']>=90 && d['Use%']<92){
                tags += `<td style="background-image: linear-gradient(to right, #FFCC00 ${d['Use%']}%, #FFFFFF ${d['Use%']}%);">${d['Use%']}</td>`}
            if (d['Use%']>=92 && d['Use%']<94){
                tags += `<td style="background-image: linear-gradient(to right, #FF9F00 ${d['Use%']}%, #FFFFFF ${d['Use%']}%);">${d['Use%']}</td>`}
            if (d['Use%']>=94 && d['Use%']<96){
                tags += `<td style="background-image: linear-gradient(to right, #FF7100 ${d['Use%']}%, #FFFFFF ${d['Use%']}%);">${d['Use%']}</td>`}
            if (d['Use%']>=96 && d['Use%']<98){
                tags += `<td style="background-image: linear-gradient(to right, #FF4300 ${d['Use%']}%, #FFFFFF ${d['Use%']}%);">${d['Use%']}</td>`}
            if (d['Use%']>=98){
                tags += `<td style="background-image: linear-gradient(to right, #FF1500 ${d['Use%']}%, #FFFFFF ${d['Use%']}%);">${d['Use%']}</td>`}

        tags += `</tr>`
    })
    tbody.innerHTML = tags;
}
