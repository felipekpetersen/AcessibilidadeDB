var $ = Dom7;
var URLSERVER = 'https://mogicidade.herokuapp.com'
// Init App
var app = new Framework7({
  name: 'App',
  id: 'br.mackenzie.lfs.App',
  root: '#app',
  theme: 'md',
  swipePanel: 'left', 
  touch: {
    materialRipple: false
  },
  materialPreloaderHtml: true,
  view: {
    pushState: true
  },
  routes: [{
    path: '/about/',
    url: './pages/about.html',
  }, {
    path: '/login/',
    componentUrl: './pages/login.html',
  }, {
    path: '/menu/',
    componentUrl: './pages/menu.html'
  }, {
    path: '/index/',
    url: './index.html',
  }, {
    path: '/perfil/',
    componentUrl: './pages/perfil.html'
  }, {
    path: '/registro/',
    componentUrl: './pages/registro.html'
  }, {
    path: '/novaOcorencia/',
    componentUrl: './pages/novaOcorencia.html'
  }, {
    path: '/bilheteUnico/',
    componentUrl: './pages/bilheteUnico.html'
  }, {
    path: '/yellow/',
    componentUrl: './pages/yellow.html'
  }, {
    path: '/historico/',
    componentUrl: './pages/historico.html'
  },
  {
    path: '/left-panel/',
    panel: {
      content: `
        <div class="panel panel-left panel-cover">
          <div class="view">
            <div class="page">
              <h1>EIIIIII</h1>
            </div>
          </div>
        </div>
      `
    }
  },

]
});

var mainView = app.views.create('.view-main');
