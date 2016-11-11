var template=
'<div class="col s12 m4 align-center">'+
		    '<div class="card horizontal cards">'+
		      '<div class="card-stacked">'+
		        '<div class="card-content fondo">'+
		          '<p>My name is :'+'<strong>{{name}}</strong>'+'</p>'+
		        '</div>'+
		        '<div class="card-action">'+
		          '<a data-show-url="{{url}}" class="about" >This is a link</a>'+
		        '</div>'+
		      '</div>'+
		    '</div>'+
		  '</div>';
$(document).ready(function(){
	var formaResponse=function(response){
			$("#total").text(response.results.length);
			var personajes="";
			$.each(response.results, function(i,personaje){
				personajes+=template
				.replace("{{name}}", personaje.name)
				.replace("{{url}}", personaje.url);
			});
				$("#people").html(personajes);
			if(!response.next==null || !response.previous==null){
				$("#next").attr("data-url",response.next.replace("http","https"));
				$("#previous").attr("data-url-previous",response.previous.replace("http","https"));
			}	
			if(!response.next){
				$("#next").fadeOut();
			}
			else if (!response.previous) {
				$("#previous").fadeOut();
			}
			else if (response.next && response.previous) {
				$("#next").fadeIn();
				$("#previous").fadeIn();
			}
	}
	$.getJSON("https://swapi.co/api/people/",formaResponse);


	$("#next").click(function(event){
		event.preventDefault();
		var url=$(this).attr("data-url");
		// alert(url);
		//Hacemos una peticion ajax
		$.getJSON(url,formaResponse);
	});
	$("#previous").click(function(event){
		event.preventDefault();
		var pre=$(this).attr("data-url-previous");
		// alert(url);
		//Hacemos una peticion ajax
		$.getJSON(pre,formaResponse);
	});

	$(".about").on("click",function(event){
		event.preventDefault();
		alert("Hola");
	})
});


var opcion='<option value="{{#}}">{{opcion}}</option>';
var person='<div class="personaje">{{personaje}}</div>';


$(document).ready(function(){
	var especies="";
	var personaje="";
	$.getJSON("https://swapi.co/api/species/",function(response){
			$("#total").text(response.results.length);
			$.each(response.results, function(i,specie){
				var a="";
				for (var i = 0; i < specie.people.length; i++) {
				a+=specie.people[i].substr(-3);	

			}
			especies+=opcion.replace("{{opcion}}", specie.name)
			.replace("{{#}}", a.substring(0,a.length-1));
		});

		$("#especies").change(function(e) {
			$("#personaje").html("");
				var b= $(this).val().split("/"); 
				for (var i = 0; i < b.length; i++) {
					$.getJSON("https://swapi.co/api/people/" + b[i] + "/", function(respuesta) {
						personaje=person.replace("{{personaje}}", respuesta.name);
						$("#personaje").append(personaje);
					});
				}
			});

		$("#especies").append(especies);	
	});
});