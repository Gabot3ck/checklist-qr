let prevScroll = window.pageYOffset;

window.onscroll = function () {
    let currentScroll = window.pageYOffset;

    if(prevScroll > currentScroll){
        document.getElementById("navForm").style.top = "0";
    } else {
        document.getElementById("navForm").style.top = "-80px";
    }

    prevScroll = currentScroll;
}