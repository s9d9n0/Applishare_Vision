
function sortTable(n) {

    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById('MaTable');
    // console.log(table.rows[0]);

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
        } else {
        /* If no switching has been done & dir is "asc", set dir to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
