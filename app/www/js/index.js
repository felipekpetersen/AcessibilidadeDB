const urlMyApi = `http://192.168.0.34:3000/api/`;
var map;

const requestAjax = (URL_TO_FETCH, func, method = 'get', contentJson = null) => {
    if( method == 'get'){
        fetch(URL_TO_FETCH, {
        method: 'get' // opcional 
        })
        .then(response => { 
         return response.json();
        }).then( response => {
            func(response);
        })
        .catch(function(err) { 
            console.error(err); 
        });
    } else if (method == 'post'){
        fetch(URL_TO_FETCH, {
        method: 'post', // opcional 
        body: contentJson
        })
        .then(response => { 
        return response.json();
        }).then( response => {
            func(response);
        })
        .catch(function(err) { 
            console.error(err); 
        });
    }
}


function initMap(localizacao = { lat: -23.547, lng: -46.213 }) {
    console.log("sdfsdf");
    
    map = new google.maps.Map(document.getElementById('mapGoogle'), {
        center: { lat: -23.547, lng: -46.213 },
        zoom: 15,
        disableDefaultUI: true
    });
    initMarkers();

    map2 = new google.maps.Map(document.getElementById('map2Google'), {
            center: localizacao,
            zoom: 18,
            disableDefaultUI: true
        });
        geocoder = new google.maps.Geocoder();
        initMarkers();
    }
    
    function initMarkers(){
        const iteraOcorrencia = (json) => {
            json.forEach( e => {
                e.content = `${e.categoria}->${e.subcategoria} | ^${e.data}`;
                addMarker(e);
            });
        }
        requestAjax(urlMyApi+'ocorrencias',iteraOcorrencia);
    }



function addMarker(obj){
    var marker = new google.maps.Marker({
      position: { lat : parseFloat(obj.localizacao.lat), lng : parseFloat( obj.localizacao.lng)},
      map: map,
      icon: obj.marcador
    });
  
    var infoWindow = new google.maps.InfoWindow({
      content: obj.content
    });
  
    marker.addListener('click',function() {
      infoWindow.open( map, marker);
    });
  }


function centralizaMapaPeloForm(endereco, mapModf){
    geocoder.geocode( {'address': endereco}, function( results, status){
        if (status === 'OK') {
            mapModf.setCenter( results[0].geometry.location);
         } else {
            console.log("NÃ£o foi possivel obter localização: " + status);
         }
    });
}

function getCordUrl(mapUrl){
    let objPosition = {lat: 0, lng: 0};
    let cords = mapUrl.match(/(\-\d\d\.\d\d\d\d)/g);
    objPosition.lat = cords[0];
    objPosition.lng = cords[1];
    return objPosition;
}
$(document).ready( function() {
    $('#CEP').change(function(){
        // var logradouro = $('#logradouro').val();
        // var numeroCasa = $('#numero-casa').val();
        debugger
        var CEP = $('#CEP').val();
        centralizaMapaPeloForm(`${CEP}`, map2);
    });
});
