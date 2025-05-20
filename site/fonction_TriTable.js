
function sortTable(n) {

    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById('MaTable');
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
                if (n==7 || n==8 || n==9) {
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
                if (n==7 || n==8 || n==9) {
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


function sortESSAI_Table(n) {
    table = document.getElementById('MaTable');
    console.log('DEBUT DE TRI DE LA TABLE');
    console.log(table);
    console.log(table.rows);
    console.log("ligne :"+table.rows[0]);

    console.log("Avant le tri...");
    dataTable.forEach(item => {
        console.log(item["Application"]+ " - "+item["Use%"]);
    })
    // console.log(dataTable);

    for (let i = 0; i < dataTable.length - 1; i++) {
        for (let j = 0; j < dataTable.length - i - 1; j++) {
          if (dataTable[j]["Use%"] < dataTable[j + 1]["Use%"]) {
            let temp = dataTable[j];
            dataTable[j] = dataTable[j + 1];
            dataTable[j + 1] = temp;
          }
        }
    }

    console.log("Après le tri...*******************************************");
    dataTable.forEach(item => {
        console.log(item["Application"]+ " - "+item["Use%"]);
    })
    // console.log(dataTable);

    //getTableBody(dataTable);


    let headers = ['Volume','env','quartier','dc','zone','type','Application','Cap','Use','Use%'];
    let jsonObject = {};
    headers.forEach((header,index) => {
        if (table.rows[0].cells.id) {
            jsonObject[header] = table.rows[0][index].textContent.trim();
        }
    })

    console.log("obtention du json : "+JSON.stringify(jsonObject));

    
    rows = table.rows;
    console.log("nb ligne :"+rows.length);
    for (i = 1; i < rows.length; i++) {
        x = rows[i].getElementsByTagName("td")[n];
        console.log("x : "+x.innerHTML);
    }
}




// Algorithme QuickSort
function sort2Table(n) {
    let table, rows;
    table = document.getElementById('MaTable');
    rows = table.rows;

    // Base case: If the array has one or no elements, it is already sorted.
    if (rows.length <= 1) return rows;
  
    // Choosing the first element in the array as the pivot.
    const pivot = rows[0].getElementsByTagName("td")[n].innerHTML;
    console.log("pivot : "+pivot);
    // Creating two empty arrays to store elements less than (left) and greater than (right) the pivot.
    const left = [];
    const right = [];
  
    // Looping through the array, starting from the second element because the first is the pivot.
    for (let i = 1; i < rows.length; i++) {
      // If the current element is smaller than the pivot, push it to the 'left' array.
      if (rows[i].getElementsByTagName("td")[n].innerHTML < pivot) left.push(rows[i].getElementsByTagName("td")[n].innerHTML);
      // If the current element is greater than or equal to the pivot, push it to the 'right' array.
      else right.push(rows[i].getElementsByTagName("td")[n].innerHTML);
    }
  
    // Concatenate the result of recursively sorting the 'left' array, the pivot, and then the 'right' array.
    // Spread syntax '...' is used to concatenate arrays.
    return [...sort2Table(left), pivot, ...sort2Table(right)];
  }