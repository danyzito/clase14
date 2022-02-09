//------------OCULTO LOS DIVS AL CARGAR LA PAGINA

$(document).ready(function(){

    $("#divCotiz").hide();
    $("#divRegistro").hide();
    $("#volver").hide();

//------------LEO EL JSON QUE CONTIENE LOS PRODUCTOS Y LLENO LA TABLA DE PRECIOS
    $.ajax({
        type: "get",
        url: "seguro.json",
        dataType: "json",
    }).done((data) =>{
        $.each(data, function (indice, seguro) { 
            $("#rellenar").append(`<tr><th> 
        ${seguro.tipo}</th>
        <td>${seguro.cristales}</td>
        <td>${seguro.robo}</td>
        <td>${seguro.rastreador}</td>
        <td>${seguro.precio}</td></tr>`);
             
        });
    }
)
})


//------------JQUERY GET DOLAR
const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"

$("#dolar").click(() => { 
    $.get(URLGET, function (respuesta, estado) {
          if(estado === "success"){
            flotanteDolar(1);
            $('#dolarCompra').html(respuesta[0].casa.compra);
            $('#dolarVenta').html(respuesta[0].casa.venta);
                                
          }
    });
});





//------------CLASE PARA CALCULAR LOS SEGUROS

class cobertura {
    constructor (tipo, cristales, robo, rastreador, precio){
        this.typpe = tipo;
        this.vidrio = cristales;
        this.afano = robo;
        this.gps = rastreador;
        this.valor = parseFloat(precio); 
    }
 
    salida() {
        
        let basemensual = $("#valor").val()*0.05/12;
        let totalmensual = basemensual + (this.valor)*1.21;

        // Escribe la respuesta

    $("#respuesta").append(`<p> 
    Elegiste el plan <b>${this.typpe}</b> para tu `+$("#marca").val()+`<br> 
    Cobertura elegida: <br>
            Cristales     : ${this.vidrio}<br>
            Robo          : ${this.afano}<br>
            Rastreador    : ${this.rastreador}</p>
         <p>
           Seguro Obligatorio :$`+ basemensual.toFixed(2)+`<br>
           Adicional plan     : $${this.valor}<br>
           <u>Total Mensual      :$`+totalmensual.toFixed(2)+`
           </u></p>`);
   
    //--- LIMPIA LOS IMPUTS Y OCULTA EL FORMULARIO

    $('#marca').val('');
    $('#valor').val('');
    $("#divCotiz").fadeOut(100);
    $("#volver").fadeIn(1000);

    }

}


//------------CARGA DE LOS SEGUROS EN LA COBERTURA
let black = new cobertura("Black", "Si", "Si", "Si", 6000);
let golden = new cobertura("Golden", "Si", "Si", "No", 5000);
let silver = new cobertura("Silver", "No", "Si", "No", 4000);


//------------COTIZAMOS EL SEGURO

function cotizar() {
    let valor =$("#valor").val(); //lee el imput  con JQuery
    let seguro =$("#planes").val();
   

    switch(seguro){
        case "Black":
            black.salida();
            break;
        case "Golden":
            golden.salida();
            break;
        case "Silver":
            silver.salida();
            break

    }
}


function printUsuariosRegistrados()
{

    for(let i=0;i<localStorage.length;i++)
    {
        
        const llave = localStorage.key(i);
        const dato = JSON.parse(localStorage.getItem(llave));

        
                                    
 
        
        $("#uRegistrados").append(`<tr>
        <td>${i+1}</td>
        <td>${dato.nombre}</td>
        <td>${dato.apellido}</td>
        <td>${dato.mail}</td>
        <td>${dato.password}</td></tr>`);

    }
}


// VALIDA EL MAIL AL PERDER EL FOCO
$("#mail").focusout(function(e) {
          e.preventDefault();
      if($("#mail").val().indexOf('@', 0) == -1 || $("#mail").val().indexOf('.', 0) == -1) {
       flotante(1);
       $("#mail").css("color", "red");
        $("#apellido").focus();
       // return false;
    }    $("#password").focus();
    
});

// VALIDA QUE ELNOMBRE NO ESTÉ VACIO  AL PERDER EL FOCO
$("#nombre").focusout(function(e) {
    e.preventDefault();
if($("#nombre").val().length < 1) {
 flotante(3);
  $("#nombre").focus();
 // return false;
}   

});

//------------BOTON REGISTRAR, hace visible el registro y seo oculta a su mismo
$("#botonRegistro").click(function(){

    $("#botonRegistro").hide();
    $("#divRegistro").fadeIn(1500);

});

function volver(){
    $("#divCotiz").show();
    $("#volver").hide();
    $("#respuesta").html("Gracias por utilizar nuesto cotizador.");
    $("#respuesta").css("color","Blue")
                    .slideUp(500)
                    .delay(200)
                    .slideDown(500);
}

function flotante(tipo){
	if (tipo==1){
	//  Esa llamada por el validador de email
	$('#contenedor').show();
    $("#flotanteTxt").html("El email no tiene formato correcto");
    $('#flotante').animate({
      marginTop: "-152px"
    });
	}
	if (tipo==2){
	//Si hacemos clic en cerrar, deslizamos el flotante hacia arriba
    $('#flotante').animate({
      marginTop: "-756px"
    });
	//Una vez ocultado el flotante cerramos el fondo negro
	setTimeout(function(){
	$('#contenedor').hide();
		
	},500)
	}

        //  Esa llamada por el validador de nombre 
	if (tipo==3){

        $('#contenedor').show();
        $("#flotanteTxt").html("El nombre no puede estar vacio");
        $('#flotante').animate({
          marginTop: "-152px"
        });
        }

    
}

$("#next").click(function (e) { 
    e.preventDefault();



    const nombre = $('#nombre').val();
    const apellido =$('#apellido').val();
    const mail = $('#mail').val();
    const password = $('#password').val();
    

    const miUsuario = new Usuario("","","","");
    miUsuario.registrar(nombre,apellido,mail,password);

    //--- LIMPIA LOS IMPUTS Y OCULTA EL FORMULARIO

    $('#nombre').val('');
    $('#apellido').val('');
    $('#mail').val('');
    $('#password').val('');
    
    $("#divRegistro").hide();
    $("#txtRegistro").hide();

    $("#divCotiz").show();


});


function flotanteDolar(tipo){
	if (tipo==1){
	//  Esa llamada por el validador de email
	$('#contenedorDolar').show();
    //$("#flotanteTxt").html("El email no tiene formato correcto");
    $('#flotanteDolar').animate({
      marginTop: "-152px"
    });
	}
	if (tipo==2){
	//Si hacemos clic en cerrar, deslizamos el flotante hacia arriba
    $('#flotanteDolar').animate({
      marginTop: "-756px"
    });
	//Una vez ocultado el flotante cerramos el fondo negro
	setTimeout(function(){
	$('#contenedorDolar').hide();
		
	},500)
	}

        //  Esa llamada por el validador de nombre 
	if (tipo==3){

        $('#contenedor').show();
        $("#flotanteTxt").html("El nombre no puede estar vacio");
        $('#flotante').animate({
          marginTop: "-152px"
        });
        }
    
}
fetch('https://jsonplaceholder.typicode.com/users')
  .then(function(response) {
    // Transforma la respuesta. En este caso lo convierte a JSON
    return response.json();
  })
  .then(function(json) {
    // Usamos la información recibida como necesitemos
    console.log(json)
  });
