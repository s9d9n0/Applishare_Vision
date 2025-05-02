function getTableHead() {
    const thead = document.querySelector('thead');
    tags  = `<tr>
                <th onclick="sortTable(0)">Volume</td>
                <th onclick="sortTable(1)">Env.</th>
                <th onclick="sortTable(2)">Quartier</th>
                <th onclick="sortTable(3)">DC</th>
                <th onclick="sortTable(4)">Zone</th>
                <th onclick="sortTable(5)">Type</th>
                <th onclick="sortTable(6)">Application</th>
                <th onclick="sortTable(7)">Quota VV (en GB)</th>
                <th onclick="sortTable(8)">Niv. d'utilisation (en GB)</th>
                <th onclick="sortTable(9)">Niv. d'utilisation (en %)</th>
            </tr>`
    thead.innerHTML = tags;
}

function getTableBody(DataRef){
    const tbody = document.querySelector('tbody');
    let tags = "";
    for (let j=0; j<Object.keys(DataRef).length; j++){
    tags += `<tr>
                <td style="text-align:center;">${DataRef[j].Volume}</td>
                <td style="text-align:center;">${DataRef[j].env}</td>
                <td style="text-align:center;">${DataRef[j].quartier}</td>
                <td style="text-align:center;">${DataRef[j].dc}</td>
                <td style="text-align:center;">${DataRef[j].zone}</td>
                <td style="text-align:center;">${DataRef[j].type}</td>
                <td>${DataRef[j].Application}</td>
                <td>${parseFloat(DataRef[j].Cap)}</td>
                <td>${parseFloat(DataRef[j].Use)}</td>
                <td>${parseFloat(DataRef[j]['Use%'])}</td>
             </tr>`
    }
    tbody.innerHTML = tags;
}
