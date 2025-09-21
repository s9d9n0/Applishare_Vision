
function sortTable(refIdTab,n) {

    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    // table = document.getElementById('MaTable');
    table = document.getElementById(refIdTab);
    // console.log("ligne :"+table.rows[0]);

    switching = true;
    dir = "asc";

/* Make a loop that will continue until no switching has been done: */
    while (switching) {

        switching = false;
        rows = table.rows;

    /* Loop through all table rows (except the first and second, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            
            shouldSwitch = false;
            
        /* Get the two elements you want to compare, one from current row and one from the next: */
            x = rows[i].getElementsByTagName("td")[n];
            y = rows[i + 1].getElementsByTagName("td")[n];
            console.log("x = "+x.innerHTML);
            console.log("y = "+y.innerHTML);

        /* Check if the 2 rows should switch place, based on the direction, asc or desc: */
            console.log("num colonne = "+n);
            if (dir == "asc") {
                if ((n==6 && refIdTab=='MaTableFS') || (n==6 && refIdTab=='MaTableVV_Histo') || n==7 || n==8 || n==9) {
                    if (x.innerHTML=="<i>??</i>"){
                        rows[i].parentNode.insertBefore(rows[i], rows[rows.length]);
                    }
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        shouldSwitch = true; break;
                    }
                } 
                else {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true; break;
                    }
                }
            } else if (dir == "desc") {
                if ((n==6 && refIdTab=='MaTableFS') || (n==6 && refIdTab=='MaTableVV_Histo') || n==7 || n==8 || n==9) {
                    if (x.innerHTML=="<i>??</i>"){
                        rows[i].parentNode.insertBefore(rows[i], rows[rows.length]);
                    }
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
                        shouldSwitch = true; break;
                    } 
                }
                else {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true; break;
                    }
                }
            }
        }

        if (shouldSwitch) {
        /* If a switch has been marked, make the switch and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        // Each time a switch is done, increase this count by 1:
            switchcount ++;
            console.log("comptage inversion : "+switchcount)
        } else {
        /* If no switching has been done & dir is "asc", set dir to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                switching = true;
                dir = "desc";
            }
        }
    }
}


function sortESSAI_Table(refIdTab,sortingMethod,n) {
    // table = document.getElementById('MaTable');
    table = document.getElementById(refIdTab);
    console.log('DEBUT DE TRI DE LA TABLE');
    console.log(table);
    console.log(table.rows);
    console.log("ligne :"+table.rows[0]);
    console.log(table.rows[1]);

    // const sens = document.querySelector('#colApplication > .fleche > .desc');
    const sens = document.querySelector('.'+sortingMethod+n);
    console.log(sens)

    const meth = sens.getAttribute('class').substring(0,3);
    console.log(meth);
    const nomCol = sens.parentElement.parentElement.getAttribute('id').replace('col','');
    console.log(nomCol);

    console.log(dataTable);

    console.log("Avant le tri...");
    dataTable.forEach(item => {
        console.log(item["Application"]+ " - "+item["Use%"]);
    })
    // console.log(dataTable);


    if (meth==="des"){
        for (let i = 0; i < dataTable.length - 1; i++) {
            for (let j = 0; j < dataTable.length - i - 1; j++) {
            //   if (dataTable[j]["Use%"] < dataTable[j + 1]["Use%"]) {
            if (dataTable[j][nomCol] > dataTable[j + 1][nomCol]) {
                
                // console.log("AFFICHAGE")
                // console.log(typeof(dataTable[j][nomCol]))

                let temp = dataTable[j];
                dataTable[j] = dataTable[j + 1];
                dataTable[j + 1] = temp;
            }
            }
        }
    }
    if (meth==="asc"){
        for (let i = 0; i < dataTable.length - 1; i++) {
            for (let j = 0; j < dataTable.length - i - 1; j++) {
            //   if (dataTable[j]["Use%"] < dataTable[j + 1]["Use%"]) {
            if (dataTable[j][nomCol] < dataTable[j + 1][nomCol]) {
                let temp = dataTable[j];
                dataTable[j] = dataTable[j + 1];
                dataTable[j + 1] = temp;
            }
            }
        }
    }

    console.log("Après le tri...*******************************************");
    dataTable.forEach(item => {
        console.log(item["Application"]+ " - "+item["Use%"]);
    })
    console.log(dataTable);

    if (refIdTab==='MaTableVV') {
        getTableVVBody(dataTable);
    }
    if (refIdTab==='MaTableVV_Histo') {
        getTableVVBody_Histo(dataTable);
    }
    if (refIdTab==='MaTableFS') {
        getTableFSBody(dataTable);
    }



    // let headers = ['Volume','env','quartier','dc','zone','type','Application','Cap','Use','Use%'];
    // let jsonObject = {};
    // headers.forEach((header,index) => {
    //     if (table.rows[0].cells.id) {
    //         jsonObject[header] = table.rows[0][index].textContent.trim();
    //     }
    // })

    // console.log("obtention du json : "+JSON.stringify(jsonObject));

    
    // rows = table.rows;
    // console.log("nb ligne :"+rows.length);
    // for (i = 1; i < rows.length; i++) {
    //     x = rows[i].getElementsByTagName("td")[n];
    //     console.log("x : "+x.innerHTML);
    // }
}
