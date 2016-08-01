( function () {
	window.addEventListener( 'tizenhwkey', function( ev ) {
		if( ev.keyName === "back" ) {
			
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			
		}
	} );
} () );



var r1 = 0; // Valor de la primera banda.
var r2 = 0; // Valor de la segunda banda.
var r3 = 0; // Valor de la tercera banda.
var inc = 0; // Incremento al mover el Bisel.
var band = 1; // Valor de la banda a la que se aplica el incremento.
var ibezel = 0;

function updateResist(){
	switch(band){
	case 1:
		r1=inc;
		break;
		
	case 2:
		r2=inc;
		break;
		
	case 3:
		r3=inc;
		break;
	}
}
   
function calcResist(){
	var u="";
	var r = ((r1 * 10) + r2)*(Math.pow(10,r3));

	if(r>=1e6){
		r=r/1e6;
		u="M";
	}else{
		if(r>=1e3){
			r=r/1e3;
			u="K";
		}	
		
	}
	
	
	document.getElementById("vr").innerHTML=r+u+" Ω";
}


(function(){
   var progressBar,
      progressBarWidget,
      resultDiv,
      value,
      direction,
      rotaryDetentHandler = function(e) {
         // Get rotary direction
         direction = e.detail.direction;
         
         // Mejor si solo se ejecuta una vez.
         document.getElementById("vInfo").innerHTML=TIZEN_L10N["info1"]+TIZEN_L10N["info2"];
         //document.getElementById("vInfo").innerHTML="Escoge color <br> con el Bisel. Toca la pantalla para cambiar de banda.";
         
         if (direction === "CW") {
            // Right direction
        	 
        	 if(inc<9){
        		 inc++;
        		 //document.getElementById("result").innerHTML=band+" "+inc;
        		 }
        	 
            if (parseInt(progressBarWidget.value(), 10) < 100) {
               value = parseInt(progressBarWidget.value(), 10) + 10;
            } else {
               value = 100;
               
        	 value++;
            }
         } else if (direction === "CCW") {
            // Left direction
           	 if(inc>0){
        		 inc--;
        		 //document.getElementById("result").innerHTML=band+" "+inc;
        		 }
 
           	 
            if (parseInt(progressBarWidget.value(), 10) > 0) {
               value = parseInt(progressBarWidget.value(), 10) - 10;
            } else {
               value = 0;
            }
            
        	 value--;
         }
         
       	 document.getElementById("r"+band).src="img/r"+band+inc+".png";
       	 updateResist();
       	 calcResist();
      };	

   document.addEventListener("pagebeforeshow", function() {
      //resultDiv = document.getElementById("result");

      progressBar = document.getElementById("circleprogress");
      progressBarWidget = new tau.widget.CircleProgressBar(progressBar, {size: "large"});
      //resultDiv.innerText = progressBarWidget.value() + "%";

      // Add rotarydetent handler to document
      document.addEventListener("rotarydetent", rotaryDetentHandler);
   });

   document.addEventListener("pagehide", function() {
      progressBarWidget.destroy();
      document.removeEventListener("rotarydetent", rotaryDetentHandler);
   });
}());

function changeBand(){
	
	if(band<3){
		band++;
	}else{
		band=1;
	}
	switch(band){
	case 1:
		inc=r1;
		document.getElementById("m").src="img/m1.png";

		document.getElementById("b").src="";
		document.getElementById("b").style.visibility="hidden";
		break;
	case 2:
		inc=r2;
		document.getElementById("m").src="img/m2.png";
		

		document.getElementById("b").src="";
		document.getElementById("b").style.visibility="hidden";
		break;
	case 3:
		inc=r3;
		document.getElementById("m").src="img/m3.png";
		if (r1 === 0 && r2 === 0 && r3 === 0){
			document.getElementById("b").src="img/bezel.png";
			document.getElementById("b").style.visibility="visible";
		}
		break;
	}
}

document.addEventListener("click", changeBand);
