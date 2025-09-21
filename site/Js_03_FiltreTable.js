
function filtreColonne(refIdTab,id,numcol) {
    // pour vider le champ de recherche de l'autre colonne lorsque l'on commence à taper dans une autre
    if (refIdTab=="MaTableVV" && id=="volume"){
      let inputOtherCol = document.getElementById("application");
      console.log(inputOtherCol.value);
      inputOtherCol.value = "";
    }
    if (refIdTab=="MaTableVV" && id=="application"){
      let inputOtherCol = document.getElementById("volume");
      console.log(inputOtherCol.value);
      inputOtherCol.value = "";
    }

    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(id);
    filter = input.value.toUpperCase();
    // table = document.getElementById("MaTable");
    table = document.getElementById(refIdTab);
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
    entete.style.transitionDuration = "0.1s";
    entete.style.background = '#055550';
    entete.style.borderRadius = "10px";
    entete.style.scale = 1.05;
    // entete.style.zIndex = 3;
}


function focusOutColonne(id) {
    let lien;
    if (id=="volume"){lien='colVolume';}
    if (id=="application"){lien='colApplication';}
    // if (id=="hote"){lien='Hote';}
    // if (id=="service"){lien='Service';}
    let entete = document.getElementById(lien);
    entete.style.transitionDuration = "0.1s";
    entete.style.background = '#088880';
    entete.style.borderRadius = "0px";
    // entete.style.borderRadius = "0px";
    entete.style.scale = 1;
    // entete.style.zIndex = 2;
}