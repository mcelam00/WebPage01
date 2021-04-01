
/*FUNCIONES*/

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

  function programarHora(){
    setInterval(pideHora, 1000); //un segundo son 1000 milisegundos
    //MUY IMPORTANTE poner pideHora no pideHora(); sino, no se actualiza
    
  }

  function pideHora(){
    //Funcion que da la hora ne formato Americano
    fecha = new Date();

    //transformo el formato a formato local
    fecha = fecha.toLocaleString();
    //fecha = fecha.toLocaleTimeString('es-ES');

    //console.log(fecha.toLocaleTimeString('es-ES'));

    //Lo setteo dentro del párrafo en el encabezado
    document.getElementById("hora").textContent = fecha;
    //document.getElementById("hora").innerHTML = fecha;
  }

  function confirmaAlmLoc(){
    //Pregunta si se permite el almacenamiento local
    confnAlmacenamiento = confirm("El sitio web permite el almacenamiento local, ¿consiente su utilizacion para la sesión actual?\nSi acepta, se almacenarán localmente los campos del currículum recargándose en la siguiente sesión");
  }


  function CargarCampos(){
    //En primer lugar se comprueba si se ha dado permiso de almacenamiento local
    console.log("NO")

    if(confnAlmacenamiento == true){
      //se mira si hay campos almacenados localmente
      console.log("SI")
      document.getElementById("fname").value = localStorage.getItem("cv_nombre");
      document.getElementById("lname").value = localStorage.getItem("cv_apellidos");
      document.getElementById("dni").value = localStorage.getItem("cv_dni");

      //En funcion del valor almacenado para el radio, se selecciona uno u otro
      if(localStorage.getItem("cv_sexo") == "Masculino"){
        document.getElementById("masc").checked = true;
      }else if(localStorage.getItem("cv_sexo") == "Femenino"){
        document.getElementById("fem").checked = true;
      }else if(localStorage.getItem("cv_sexo") == "Otro"){
        document.getElementById("otro").checked = true;
      }


      //Miro en el almacenamiento local que casillas estaban marcadas (las que tengan valor guardado) y las marco
      if(localStorage.getItem("cv_chk1") != undefined){
        document.getElementById("Opcion1").checked = true;
      }
      if(localStorage.getItem("cv_chk2") != undefined){
        document.getElementById("Opcion2").checked = true;
      }
      if(localStorage.getItem("cv_chk3") != undefined){
        document.getElementById("Opcion3").checked = true;
      }

      document.getElementById("FN").value = localStorage.getItem("cv_fechNacim");
      document.getElementById("ce").value = localStorage.getItem("cv_correoE");
      document.getElementById("resumen").value = localStorage.getItem("cv_resumen");

    }else{
      //si no se dan, no tiene sentido que se mire para cargar nada, ni suyo ni de nadie anterior 
       //Resetea el formulario al recargarPagina
       document.getElementById("formulario").reset(); 
       localStorage.clear(); //borro los posibles datos que haya
    }
   
  }

  function almacenarLocal(){

    //Tanto con permiso como sin él, salvo los campos en variables para poder mostrarlos en la nueva hoja

      nombre = document.getElementById("fname").value;
      apellidos = document.getElementById("lname").value;
      docNacId = document.getElementById("dni").value;
  
      if(document.getElementById("masc").checked){
      //console.log(document.getElementById("m").innerHTML);
        sexo = document.getElementById("m").textContent;
      //console.log(document.getElementById("m").innerText);

      }else if(document.getElementById("fem").checked){
        sexo = document.getElementById("f").textContent;
      }else if(document.getElementById("otro").checked){
        sexo = document.getElementById("o").textContent;
      }

      if(document.getElementById("Opcion1").checked){
        chk1 = document.getElementById("c1").textContent;
      }
      if(document.getElementById("Opcion2").checked){
        chk2 = document.getElementById("c2").textContent;
      }
      if(document.getElementById("Opcion3").checked){
        chk3 = document.getElementById("c3").textContent;
      }
       
      FNacimiento = document.getElementById("FN").value;
      e_mail = document.getElementById("ce").value;
      resumen = document.getElementById("resumen").value;


    //si nos han dado permiso de almacenamiento local, se guardaran los campos en el almac local
    if(confnAlmacenamiento == true){
        
      //Cogemos cada campo, y con una etiqueta (no demasiado genérica, ya que persiste) vamos a grabar el contenido del elemento HTML
      localStorage.setItem("cv_nombre", nombre);
      localStorage.setItem("cv_apellidos", apellidos);
      localStorage.setItem("cv_dni", docNacId);
      localStorage.setItem("cv_sexo", sexo);
      
      
      if(chk1 != undefined){
        localStorage.setItem("cv_chk1", chk1);
      }
      if(chk2 != undefined){
        localStorage.setItem("cv_chk2", chk2);
      }
      if(chk3 != undefined){
        localStorage.setItem("cv_chk3", chk3);
      }

      localStorage.setItem("cv_fechNacim", FNacimiento);
      localStorage.setItem("cv_correoE", e_mail);
      localStorage.setItem("cv_resumen", resumen);

    }


  }

  function desplegarNVent(){

  }


  /*VARIABLES GLOBALES*/

var confnAlmacenamiento;
var nombre;
var apellidos;
var docNacId;
var sexo;
var chk1;
var chk2;
var chk3;
var FNacimiento;
var e_mail;
var resumen;
