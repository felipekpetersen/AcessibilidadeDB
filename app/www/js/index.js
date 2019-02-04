const urlMyApi = `${URLSERVER}/api/`;
var map;

const requestAjax = (URL_TO_FETCH, func, method = 'get', contentJson = null) => {
    if (method == 'get') {
        fetch(URL_TO_FETCH, {
            method: 'get' // opcional 
        })
            .then(response => {
                return response.json();
            }).then(response => {
                func(response);
            })
            .catch(function (err) {
                console.error(err);
            });
    } else if (method == 'post') {
        fetch(URL_TO_FETCH, {
            method: 'post', // opcional 
            body: contentJson
        })
            .then(response => {
                return response.json();
            }).then(response => {
                func(response);
            })
            .catch(function (err) {
                console.error(err);
            });
    }
}

function initMapOcorrencias(localizacao = { lat: -23.547, lng: -46.213 }) {

    map = new google.maps.Map(document.getElementById('mapGoogle'), {
        center: { lat: -23.547, lng: -46.213 },
        zoom: 15,
        disableDefaultUI: true
    });
    initMarkers();
    geocoder = new google.maps.Geocoder();
}

function initMapRegistro(localizacao = { lat: -23.547, lng: -46.213 }) {

    map2 = new google.maps.Map(document.getElementById('map2Google'), {
        center: localizacao,
        zoom: 18,
        disableDefaultUI: true
    });
    initMarkers();
    geocoder = new google.maps.Geocoder();
}

function initMarkers() {
    const iteraOcorrencia = (json) => {
        json.forEach(e => {
            e.content = `${e.categoria}->${e.subcategoria} | ^ ${timestamp(e.createdAt)}`;
            addMarker(e);
        });
    }
    requestAjax(urlMyApi + 'ocorrencias', iteraOcorrencia);
}



function addMarker(obj) {
    let imagem = './img/icon.png'
    var marker = new google.maps.Marker({
        position: { lat: parseFloat(obj.localizacao.lat), lng: parseFloat(obj.localizacao.lng) },
        map: map,
        icon: imagem
    });

    var infoWindow = new google.maps.InfoWindow({
        content: obj.content
    });

    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
}


function centralizaMapaPeloForm(endereco, mapModf) {
    geocoder.geocode({ 'address': endereco }, function (results, status) {
        if (status === 'OK') {
            mapModf.setCenter(results[0].geometry.location);
        } else {
            console.log("Não foi possivel obter a localização: " + status);
        }
    });
}

function getCordUrl(mapUrl) {
    let objPosition = { lat: 0, lng: 0 };
    let cords = mapUrl.match(/(\-\d\d\.\d\d\d\d)/g);
    objPosition.lat = cords[0];
    objPosition.lng = cords[1];
    return objPosition;
}
$(document).ready(function () {
    $('#CEP').change(function () {
        // var logradouro = $('#logradouro').val();
        // var numeroCasa = $('#numero-casa').val();
        debugger
        var CEP = $('#CEP').val();
        centralizaMapaPeloForm(`${CEP}`, map2);
    });
});

function centralizaMapa (mapa) {
    navigator.geolocation.getCurrentPosition(
       sucess =>{ 
        let local = sucess.coords.latitude + ' ' + sucess.coords.longitude
        if (mapa == 'menu')
            centralizaMapaPeloForm(local, map);
        else 
            centralizaMapaPeloForm(local, map2);

    }, error => {
        console.log(error)
    })
}

function timestamp(timestamp) {
    var a = new Date(timestamp)
    var months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Otubro', 'Novembro', 'Dezembro']
    var year = a.getFullYear()
    var month = months[a.getMonth()]
    var date = a.getDate()
    var hour = a.getHours()
    var min = a.getMinutes()
    var sec = a.getSeconds()
    var time = date + ' de ' + month + ' de ' + year + ' às ' + hour + ':' + min
    return time
}
