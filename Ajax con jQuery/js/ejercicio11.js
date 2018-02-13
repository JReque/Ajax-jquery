{

  /*var $estadosPosibles = ['No inicializado', 'Cargando', 'Cargado', 'Interactivo', 'Completado'];
  var estados = $('#estados');
    $('#estados').each(function(){
        $('#estados').html($('#estados').html()+("[" + $milisegundos + " mseg.] " + $estadosPosibles[$peticion.readyState] + "<br/>"));
    });*/
    
  $(document).ready(function() {
    let pagina=$("#recurso");
    let cabeceras=$("#cabeceras");
    let contenidos=$("#contenidos");
    let enviar=$("#enviar");
    let estados=$("#estados");
    let codigo=$("#codigo");
    pagina.val(location).attr("href");

    let tiempoInicial=0;

    let calculo = function(){
      tiempoFinal = new Date();
      milisegundos = tiempoFinal - tiempoInicial;
      return "[" + milisegundos + " mseg] Completado";
    }
    let escribir = function(xhr){
      codigo.text(xhr.status + " = "+ xhr.statusText);
      estados.text("\n"+calculo());
      cabeceras.text(xhr.getAllResponseHeaders);
    }

    enviar.click(function(){
      tiempoInicial = new Date();
      $.ajax({
        url: pagina.val(),
        type: "GET",
        dataType: "text",
        error: function (xhr){
          contenidos.text("Error\nPage not found");
          escribir(xhr);
        }
      })
      .done(function(data,textStatus,xhr){
        contenidos.text(data);
        escribir(xhr);
      })
      .fail(function(xhr){
        escribir(xhr);
      });
    });

  });
}