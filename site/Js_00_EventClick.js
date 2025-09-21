// function clickNav() {
//     var pageNav1 = document.getElementById("PageNav1");
//     pageNav1.classList.toggle("clickNav");
//     var pageNav2 = document.getElementById("PageNav2");
//     pageNav2.classList.toggle("clickNav");
//     var pageNav3 = document.getElementById("PageNav3");
//     pageNav3.classList.toggle("clickNav");
// } 

function clickNav(i) {
    var pageNav1 = document.getElementById("PageNav1");
    var pageNav2 = document.getElementById("PageNav2");
    var pageNav3 = document.getElementById("PageNav3");
    if (i==1){
        pageNav1.classList.add("clickNav");
        pageNav2.className = "";
        pageNav3.className = "";
    }
    if (i==2){
        pageNav1.className = "";
        pageNav2.classList.add("clickNav");
        pageNav3.className = "";
    }
    if (i==3){
        pageNav1.className = "";
        pageNav2.className = "";
        pageNav3.classList.add("clickNav");
    }
} 
