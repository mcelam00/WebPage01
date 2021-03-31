function validarDNI(dni) {
    //var x = document.getElementById("dni");
    //var x = document.getElementsByName("Ndni"); no me funciona
    //x.value = x.value.toUpperCase();

    testigo = false; 
    tabla_letras = "TRWAGMYFPDXBNJZSQVHLCKE";

    //Compruebo el formato del dni:
    dni_re = /^[0-9]{8}[a-zA-Z]{1}$/; //aunque permita letras que no figuran en la tabla, al calculo posterior van a fallar

    if(dni_re.test(dni)){
      testigo = true;
       console.log("Correct RE");
        //compruebo la validez de la letra
          //Separo letra y números 
          dni_letra = dni.substring(8, 9);
          dni_numeros = dni.substring(0, 8);

          //convierto numeros a formato numero
          dni_numeros = parseInt(dni_numeros);
          
          //hago el calculo de la letra
          indice_letra = dni_numeros%23;
          console.log(indice_letra);
          letra = tabla_letras.charAt(indice_letra);
          console.log(letra);

          //letra la pongo en mayuscula por si no estaba
          dni_letra = dni_letra.toUpperCase();

          //comparo las letras
          if(dni_letra != letra){
              testigo = false;
          }
    
    }

    //veo el testigo para ver si ha pasado las comprobaciones
    console.log(testigo);
    if(testigo == false){
      //se marca en rojo
      document.getElementById("dni").style.background= "#ff8989";
      document.getElementById("dni").style.color = "white";
    }else{
      //se marca en verde
      document.getElementById("dni").style.background= "#DAF7A6 ";      
      document.getElementById("dni").style.color = "black";

      
    }

  }

  function resetColor(){
    //Resetea el color por defecto del CSS del campo DNI
    document.getElementById("dni").style.color = "black";
    document.getElementById("dni").style.background= "white";

  }

  function myFunction2() {
    alert("Input field lost focus.");
  }

  function pgCargada(){

  }


  function limpiarCampos(){

    document.getElementById("formulario").reset(); 
  }