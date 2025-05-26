// style="width: 100px;"

function getTableHead() {
    const thead = document.querySelector('thead');
    tags  = `<tr>
                <th id="colVolume">
                    <div onclick="sortTable(0)">Volume &nbsp; </br> &nbsp;</div>
                    <div><input type="text" id="volume" 
                            placeholder="recherche..." title="rech sur volume"
                            onfocusin="focusInColonne('volume')"
                            onfocusout="focusOutColonne('volume')" 
                            onkeyup="filtreColonne('volume',0)">
                    </div>
                    <div class="fleche">
                        <a class="asc0" onclick="sortESSAI_Table('asc',0)">&#x25b4;Up&nbsp;/</a>
                        <a class="desc0" onclick="sortESSAI_Table('desc',0)">&nbsp;Down&#x25be;</a>
                    </div>
                </th>

                <th onclick="sortTable(1)">Env.</th>
                <th onclick="sortTable(2)">Quartier</th>
                <th onclick="sortTable(3)">DC</th>
                <th onclick="sortTable(4)">Zone</th>
                <th onclick="sortTable(5)">Type</th>

                <th id="colApplication">
                    <div>Application &nbsp; </br> &nbsp;</div>
                    <div><input type="text" id="application"
                            placeholder="recherche..." title="rech sur application"
                            onfocusin="focusInColonne('application')"
                            onfocusout="focusOutColonne('application')" 
                            onkeyup="filtreColonne('application',6)">
                    </div>
                    <div class="fleche">
                        <a class="asc6" onclick="sortESSAI_Table('asc',6)">&#x25b4;</a>
                        <a class="desc6" onclick="sortESSAI_Table('desc',6)">&#x25be;</a>
                    </div>
                </th>

                <th onclick="sortTable(7)">Quota VV </br> (en GB)</th>
                <th onclick="sortTable(8)">Niv. d'utilisation </br> (en GB)</th>

                <th id="colUsePrct" onclick="sortTable(9)">
                    <div>Niv. d'utilisation </br> (en %)</div>
                    <div class="fleche">
                        <a class="asc9" onclick="sortESSAI_Table('asc',9)">&#x25b4;</a>
                        <a class="desc9" onclick="sortESSAI_Table('desc',9)">&#x25be;</a>
                    </div>
                </th>

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

            if (d['UsePrct']<30){
                tags += `<td style="background-image: linear-gradient(to right, #00FF00 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=30 && d['UsePrct']<40){
                tags += `<td style="background-image: linear-gradient(to right, #20F900 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=40 && d['UsePrct']<50){
                tags += `<td style="background-image: linear-gradient(to right, #40F300 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=50 && d['UsePrct']<60){
                tags += `<td style="background-image: linear-gradient(to right, #80E600 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=60 && d['UsePrct']<70){
                tags += `<td style="background-image: linear-gradient(to right, #C0D900 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=70 && d['UsePrct']<80){
                tags += `<td style="background-image: linear-gradient(to right, #E0D300 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=80 && d['UsePrct']<90){
                tags += `<td style="background-image: linear-gradient(to right, #F0D000 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=90 && d['UsePrct']<92){
                tags += `<td style="background-image: linear-gradient(to right, #FFCC00 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=92 && d['UsePrct']<94){
                tags += `<td style="background-image: linear-gradient(to right, #FF9F00 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=94 && d['UsePrct']<96){
                tags += `<td style="background-image: linear-gradient(to right, #FF7100 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=96 && d['UsePrct']<98){
                tags += `<td style="background-image: linear-gradient(to right, #FF4300 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}
            if (d['UsePrct']>=98){
                tags += `<td style="background-image: linear-gradient(to right, #FF1500 ${d['UsePrct']}%, #FFFFFF ${d['UsePrct']}%);">${d['UsePrct']}</td>`}

        tags += `</tr>`
    })
    tbody.innerHTML = tags;
}
