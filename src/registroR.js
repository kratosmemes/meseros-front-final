
// let mesr = "mesero";
// let clie = "cliente";

// // if (document.getElementById('#cliente').checked){
// //   mesr = "";
// //   clie = "cliente";
// // }else{
// //   mesr = "mesero"
// //   clie = "";
// // }
   
// if( $('#cliente').is('checked') ) {
//   mesr = "";
//   clie = "cliente";
// }else{
//   mesr = "mesero"
//   clie = "";
// }

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    var net = 0;

    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          net = 1;
          //alert("Complete todos los apartados");
        }
        if(form.checkValidity() === true){
          $('form').on('submit', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            
            // $.ajax({
            //     url: "http://localhost:3000/usuario",
            //     type: 'POST',
                // contentType: 'application/json',
                // data: JSON.stringify({
                //     mesero: $('#mesero').val(),
                //     cliente: $('#cliente').val(),
                //     nombre: $('#nombre').val(),
                //     apellido_p:$('#apellido').val(),
                //     apellido_m:$('#apellido2').val(),
                //     email:$('#ema').val(),
                //     numero_telefonico:$('#telefono').val(),
                //     password:$('#pass1').val(),
                //     ciudad:$('#ciudad').val(),
                //     estado_M:$('#estado').val(),
                // }),
                // dataType: 'json',
            //     // success: function(res) {
            //     //     if(res.ok === false){
            //     //         alert("Ha ocurrido un error");
            //     //     }
            //     //     else{
            //     //         alert("Usuario guardado");
            //     //         //$("form")[0].reset();
            //     //         window.location="login.html";
            //     //     }
            //     // },
            //     success: function(resp) {
            //       console.log(resp);
            //       alert("Usuario creado con exito");
            //       window.location.href = "login.html";
            //       },
            //       error: function(err) {
            //       $('#error').text(err.responseJSON.err.message);
            //       $('#error').show();
            //       }       
            // });
//https://waiters-browser-mx.herokuapp.com/

            $.ajax({
              type: 'POST',
              url: 'https://waiters-browsers-back-end.herokuapp.com/usuario',
              //url: 'https://waiters-browser-mx.herokuapp.com/usuario',
              // data: $('form').serialize(),
              contentType: 'application/json',
                data: JSON.stringify({
                    mesero: $('#mesero').val(),
                    cliente: $('#cliente').val(),
                    nombre: $('#nombre').val(),
                    apellido_p:$('#apellido').val(),
                    apellido_m:$('#apellido2').val(),
                    email:$('#ema').val(),
                    numero_telefonico:$('#telefono').val(),
                    password:$('#pass1').val(),
                    ciudad:$('#ciudad').val(),
                    estado_M:$('#estado').val(),
                }),
                dataType: 'json',
              success: function(resp) {
              console.log(resp);
              alert("Usuario creado con exito");
              window.location.href = "login.html";
              },
              error: function(err) {
              // alert("Correo repetido o error de servidor 400");
              $('#error').text(err.responseJSON.err.message);
              $('#error').show();
              }
              });

              $('input').on('focus', function(e) {
                $('#error').hide();
                });
            
            
            });
        }
      form.classList.add('was-validated');

      }, false);
    });
    
  }, false);
})();



$(function() {

  // $(document).on('change','#invalidCheck',function(){
  //     if(this.checked) {
  //       coincideRecapcha();
  //     }
  // });
  
  $(document).on('change','#cliente',function(){
    if(this.checked) {
      $('#mesero').prop('checked',false);
      $('#mesero').attr("disabled", true);
      $('#mesero').val("");
      $('#cliente').val("cliente");
    }else{
      $('#mesero').attr("disabled", false);
      $('#mesero').val("mesero");
    }
  });

  $(document).on('change','#mesero',function(){
    if(this.checked) {
      $('#cliente').prop('checked',false);
      $('#cliente').attr("disabled", true);
      $('#cliente').val("");
      $('#mesero').val("mesero");
    }else{
      $('#cliente').attr("disabled", false);
      $('#cliente').val("cliente");
    }
  });

  function coincideRecapcha(){
    //validar reCAPCHA
    var response = grecaptcha.getResponse();
  
    if(response.length === 0){
      
      $('#boton').attr("disabled", true);
      $('#invalidCheck').prop('checked',false);
      alert("????Captcha no verificado!!");
    } else {
      //alert("Captcha verificado");
      $('#boton').attr("disabled", false);
      
    }
  }
});

// $(document).ready(function() {	
//   function validarRecapcha(){
//     //validar el estado del CAPCHA cada 3 segundos
//     var res = grecaptcha.getResponse();
  
//     if(res.length === 0){
      
//       $('#boton').attr("disabled", true);

//     } else {
      
//       $('#boton').attr("disabled", false);
      
//     }
//   }
//   setInterval(validarRecapcha, 3000);
// });


$(document).ready(function() {
  //variables
  var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
	var pass1 = $('[name=pass1]');
	var pass2 = $('[name=pass2]');
	var confirmacion = "??Ok v??lido!";
	var longitud = "La contrase??a debe estar formada entre 8-10 car??cteres (ambos inclusive)";
  var negacion = "No coinciden las contrase??as";
  var min = "La clave debe tener al menos [a-z], [A-Z], [0-9] y [&$%#/()*]";
  var XD = 0;
	//var vacio = "La contrase??a no puede estar vac??a";
	//oculto por defecto el elemento span
	var span = $('<span></span>').insertAfter(heardPass);
  span.hide();
  
	//funci??n que comprueba las dos contrase??as
	function coincidePassword(){
	var valor1 = pass1.val();
  var valor2 = pass2.val();
  
	//muestro el span
	span.show().removeClass();
	//condiciones dentro de la funci??n
	
	// if(valor1.length==0 || valor1==""){
	// span.text(vacio).addClass('negacion');	
  // }
  //$("#form1").on('submit', function(evt){
	if(valor1.length<8 || valor1.length>10){
  span.text(longitud).addClass('negacion');
  
    XD = 1;
    
	}else{
    if(valor1 != valor2){
      span.text(negacion).addClass('negacion');	
      
        XD = 1;
        
      }else{
        if(strongRegex.test(valor1)){
          //if(valor1.length!=0 && valor1==valor2){
            span.text(confirmacion).removeClass("negacion").addClass('confirmacion');
            alert("????CONTRASE??AS CORRECTAS!!");
            XD = 0;
            $('#invalidCheck').prop('checked',false);
          
            //}
          	
          }else{
            span.text(min).addClass('negacion');
            
              XD = 1;
              
          }
        
      }
  }  
    
  $("#form1").on('submit', function(evt){
  if (XD == 1) {
    evt.preventDefault();
    evt.stopPropagation();
  }
});	
  }
	pass2.keyup(function(){
	coincidePassword();
  });
  pass1.keyup(function(){
    coincidePassword();
    });
});

$('#pass1').keyup(function(e) {
  var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
  var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
  var enoughRegex = new RegExp("(?=.{6,}).*", "g");
  if (false == enoughRegex.test($(this).val())) {
          $('#passstrength').html('Contrase??a Muy D??bil.');
  } else if (strongRegex.test($(this).val())) {
          $('#passstrength').className = 'ok';
          $('#passstrength').html('Contrase??a Fuerte!');
  } else if (mediumRegex.test($(this).val())) {
          $('#passstrength').className = 'alert';
          $('#passstrength').html('Contrase??a Media!');
  } else {
          $('#passstrength').className = 'error';
          $('#passstrength').html('Contrase??a D??bil!');
  }
  return true;
});

$('#pass2').keyup(function(e) {
  var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
  var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
  var enoughRegex = new RegExp("(?=.{6,}).*", "g");
  if (false == enoughRegex.test($(this).val())) {
          $('#passstrength2').html('Contrase??a Muy D??bil.');
  } else if (strongRegex.test($(this).val())) {
          $('#passstrength2').className = 'ok';
          $('#passstrength2').html('Contrase??a Fuerte!');
  } else if (mediumRegex.test($(this).val())) {
          $('#passstrength2').className = 'alert';
          $('#passstrength2').html('Contrase??a Media!');
  } else {
          $('#passstrength2').className = 'error';
          $('#passstrength2').html('Contrase??a D??bil!');
  }
  return true;
});

$(document).ready(function(){    
  $('#iniciar').click(function(){  
      window.location="login.html";
  });  
});







