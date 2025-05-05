
function filtreColonne(id,numcol) {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(id);
    filter = input.value.toUpperCase();
    table = document.getElementById("MaTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[numcol];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}


function focusInColonne(id) {
    let lien;
    if (id=="volume"){lien='colVolume';}
    if (id=="application"){lien='colApplication';}
    // if (id=="hote"){lien='Hote';}
    // if (id=="service"){lien='Service';}
    let entete = document.getElementById(lien);
    // entete.style.transitionDuration = "0.1s";
    entete.style.background = '#055550';
    // entete.style.borderRadius = "10px";
    // entete.style.scale = 1.1;
    entete.style.zIndex = 3;
}


function focusOutColonne(id) {
    let lien;
    if (id=="volume"){lien='colVolume';}
    if (id=="application"){lien='colApplication';}
    // if (id=="hote"){lien='Hote';}
    // if (id=="service"){lien='Service';}
    let entete = document.getElementById(lien);
    // entete.style.transitionDuration = "0.1s";
    entete.style.background = '#088880';
    // entete.style.borderRadius = "0px";
    // entete.style.scale = 1;
    entete.style.zIndex = 2;
}