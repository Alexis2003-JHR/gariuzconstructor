let indice = 1;
muestraSlides(indice);

function nextSlide(n){
    muestraSlides(indice+=n);
}
function positionSlide(n){
    muestraSlides(indice=n);
}

//Automatiza el movimiento de la galeria a 8s(8000).
setInterval(function time(){ 
    muestraSlides(indice+=1);
},8000);

//Función que controla el movimiento de las imagenes por medio de los slides y points. 
function muestraSlides(n){
    let i;
    let slides = document.getElementsByClassName("mySlide");
    let points = document.getElementsByClassName("point");
    
    if(n > slides.length){ //Cuando "n" es mayor que el número de imagenes el indice vuelve a la primera imagen.
        indice = 1;
    }
    if(n < 1){
        indice = slides.length; //Cuando "n" es menor que 1, se dirige a la ultima imagen.
    }

    for(i = 0; i < slides.length; i++){  //Desaparece todos los elementos.
        slides[i].style.display = "none";
    }

    //Cuando cambia de imagen permite que el point correspondiente este activo. 
    for(i = 0; i < points.length; i++){
        points[i].className = points[i].className.replace(" active", "");
    }

    //Permite que los points cambien de color cuando estan activos. 
    slides[indice-1].style.display = "block";
    points[indice-1].className += " active";
}