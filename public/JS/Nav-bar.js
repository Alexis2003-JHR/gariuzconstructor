document.querySelector(".menu-btn").addEventListener("click", () =>{
    document.querySelector(".nav-menu").classList.toggle("show");
})

/*Contact nav*/
$(document).ready(function(){
    $(".nav-contact").click(function(){
        $("body, html").animate({
            scrollTop: "2250px"
        },800);
    });
});

/*Home buttom*/

$(document).ready(function(){
    $(".btn-home").click(function(){
        $("body, html").animate({
            scrollTop: "0px"
        },300);
    });

    $(window).scroll(function(){
        if($(this).scrollTop() > 0){
            $(".btn-home").slideDown(300);
        }else{
            $(".btn-home").slideUp(300);
        }
    });
});
