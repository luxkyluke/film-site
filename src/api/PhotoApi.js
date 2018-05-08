
const PhotoApi = {
  photos:
    [
      {
        src: './static/data/alpes.jpg',
        name: 'Alpes',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        lens:'50mm f/1.4',
        location:'France',
        locationLink:'https://www.google.com/maps/place/St-gervais,+France',
        mask: "middle",
        portrait: false
      },
      {
        src: './static/data/arabesco.jpg',
        name: 'Arabesco',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        lens:'50mm f/1.4',
        location:'Portugal',
        locationLink:'https://www.google.com/maps/place/lisboa,+Portugal',
        mask: "middle",
        portrait: false
      },
      {
        src: './static/data/azulejos.jpg',
        name: 'Azulejos',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'Portugal',
        locationLink:'https://www.google.com/maps/place/Loulé,+Portugal',
        lens:'50mm f/1.4',
        mask: "end",
        portrait: false
      },
      {
        src: './static/data/blau.jpg',
        name: 'Blau',
        camera:'Pentax K1000',
        film:'AGFA Vista Plus 400',
        lens:'50mm f/1.4',
        location:'Allemagne',
        locationLink:'https://www.google.com/maps/place/Berlin,+Allemagne',
        mask: "middle",
        portrait: false
      },
      {
        src: './static/data/caminho.jpg',
        name: 'Caminho',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        lens:'50mm f/1.4',
        mask: "begin",
        portrait: false
      },
      {
        src: './static/data/chafarica.jpg',
        name: 'Chafarica',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'Portugal',
        locationLink:'https://www.google.com/maps/place/Porto,+Portugal',
        lens:'50mm f/1.4',
        mask: "begin",
        portrait: false
      },
      {
        src: './static/data/ciel.jpg',
        name: 'Ciel',
        camera:'Minolta XG-M',
        film:'AGFA Vista Plus 400',
        location:'Canada',
        locationLink:'https://www.google.com/maps/place/Montréal,+Canada',
        lens:'50mm f/2',
        mask: "middle",
        portrait: true
      },
      {
        src: './static/data/constance.jpg',
        name: 'Constance',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'Allemagne',
        locationLink:'https://www.google.com/maps/place/Reichenau,+Allemagne',
        lens:'50mm f/1.4',
        mask: "end",
        portrait: false
      },
      {
        src: './static/data/eclat.jpg',
        name: 'Éclat',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'Allemagne',
        locationLink:'https://www.google.com/maps/place/Berlin,+Allemagne',
        lens:'50mm f/1.4',  
        mask: "end",
        portrait: false
      },
      {
        src: './static/data/emplettes.jpg',
        name: 'Emplette',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'France',
        locationLink:'https://www.google.com/maps/place/Ile-de-la-cité,+France',
        lens:'50mm f/1.4',  
        mask: "middle",
        portrait: false
      },
      {
        src: './static/data/en_route.jpg',
        name: 'En Route',
        camera:'Pentax K1000',
        film:'AGFA Vista Plus 400',
        location:'France',
        locationLink:'https://www.google.com/maps/place/sarrazac,+France',
        lens:'50mm f/1.4',
        mask: "begin",
        portrait: false
      },
      {
        src: './static/data/fluide.jpg',
        name: 'Fluide',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'France',
        locationLink:'https://www.google.com/maps/place/st-gervais,+France',
        lens:'50mm f/1.4',
        mask: "end",
        portrait: false
      },
      {
        src: './static/data/getty.jpg',
        name: 'Getty',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'État-Unis',
        locationLink:'https://www.google.com/maps/place/los+angeles,+État-Unis',
        lens:'50mm f/1.4',
        mask: "end",
        portrait: false
      },
      {
        src: './static/data/high.jpg',
        name: 'High',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'État-Unis',
        locationLink:'https://www.google.com/maps/place/manhattan,+new+york,+État-Unis',
        lens:'50mm f/1.4',
        mask: "begin",
        portrait: true
      },
      {
        src: './static/data/holocaust-mahnmal.jpg',
        name: 'Holocaust Mahnmal',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'Allemagne',
        locationLink:'https://www.google.com/maps/place/berlin,+Allemagne',
        lens:'50mm f/1.4',
        mask: "middle",
        portrait: false
      },
      {
        src: './static/data/janela.jpg',
        name: 'Janela',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'Portugal',
        locationLink:'https://www.google.com/maps/place/porto,+Portugal',
        lens:'50mm f/1.4',
        mask: "middle",
        portrait: false
      },
      {
        src: './static/data/namorados.jpg',
        name: 'Namorados',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'Portugal',
        locationLink:'https://www.google.com/maps/place/porto,+Portugal',
        lens:'50mm f/1.4',
        mask: "middle",
        portrait: false
      },
      {
        src: './static/data/penseuse.jpg',
        name: 'penseuse',
        camera:'Pentax K1000',
        film:'AGFA Vista Plus 400',
        lens:'50mm f/1.4',
        mask: "middle",
        portrait: false
      },
      {
        src: './static/data/pezinhos.jpg',
        name: 'Pezinhos',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'Portugal',
        locationLink:'https://www.google.com/maps/place/porto,+Portugal',
        lens:'50mm f/1.4',
        mask: "middle",
        portrait: false
      },
      {
        src: './static/data/ponte.jpg',
        name: 'Ponte',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        lens:'50mm f/1.4',
        mask: "middle",
        portrait: false
      },
      {
        src: './static/data/porto.jpg',
        name: 'Porto',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'Portugal',
        locationLink:'https://www.google.com/maps/place/porto,+Portugal',
        lens:'50mm f/1.4',
        mask: "middle",
        portrait: true
      },
      {
        src: './static/data/quadrat.jpg',
        name: 'Quadrat',
        camera:'Pentax K1000',
        film:'AGFA Vista Plus 400',
        location:'Allemagne',
        locationLink:'https://www.google.com/maps/place/berlin,+Allemagne',
        lens:'50mm f/1.4',
        mask: "middle",
        portrait: false
      },
      {
        src: './static/data/ray.jpg',
        name: 'Ray',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'État-Unis',
        locationLink:'https://www.google.com/maps/place/manhattan,+new-york,+État-Unis',
        lens:'50mm f/1.4',
        mask: "end",
        portrait: false
      },
      {
        src: './static/data/regard.jpg',
        name: 'Regard',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'France',
        locationLink:'https://www.google.com/maps/place/Paris,+France',
        lens:'50mm f/1.4',
        mask: "middle",
        portrait: false
      },
      {
        src: './static/data/relief.jpg',
        name: 'Relief',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'État-Unis',
        locationLink:'https://www.google.com/maps/place/Parc+national+de+Yosemite/@37.8534972,-119.6911932,11z/data=!3m1!4b1!4m5!3m4!1s0x8096f09df58aecc5:0x2d249c2ced8003fe!8m2!3d37.8651011!4d-119.5383294',
        lens:'50mm f/1.4',
        mask: "begin",
        portrait: false
      },
      {
        src: './static/data/rock.jpg',
        name: 'Rock',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'État-Unis',
        locationLink:'https://www.google.com/maps/place/Parc+national+de+Yosemite/@37.8534972,-119.6911932,11z/data=!3m1!4b1!4m5!3m4!1s0x8096f09df58aecc5:0x2d249c2ced8003fe!8m2!3d37.8651011!4d-119.5383294',
        lens:'50mm f/1.4',
        mask: "end",
        portrait: false
      },
      {
        src: './static/data/saint.jpg',
        name: 'Saint',
        camera:'Pentax K1000',
        film:'AGFA Vista Plus 400',
        location:'France',
        locationLink:'https://www.google.com/maps/place/sarrazac,+France',
        lens:'50mm f/1.4',
        mask: "middle",
        portrait: false
      },
      {
        src: './static/data/sarrazac.jpg',
        name: 'Sarrazac',
        camera:'Pentax K1000',
        film:'AGFA Vista Plus 400',
        location:'France',
        locationLink:'https://www.google.com/maps/place/sarrazac,+France',
        lens:'50mm f/1.4',
        mask: "begin",
        portrait: false
      },
      {
        src: './static/data/sauvage.jpg',
        name: 'Sauvage',
        camera:'Pentax K1000',
        film:'AGFA Vista Plus 400',
        location:'France',
        locationLink:'https://www.google.com/maps/place/sarrazac,+France',
        lens:'50mm f/1.4',
        mask: "middle",
        portrait: false
      },
      {
        src: './static/data/stone.jpg',
        name: 'Stone',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'État-Unis',
        locationLink:'https://www.google.com/maps/place/los+angeles,+État-Unis',
        lens:'50mm f/1.4',
        mask: "begin",
        portrait: false
      },
      {
        src: './static/data/versteckspie.jpg',
        name: 'Versteckspie',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        location:'Allemagne',
        locationLink:'https://www.google.com/maps/place/berlin,+Allemagne',
        lens:'50mm f/1.4',
        mask: "end",
        portrait: false
      },
      {
        src: './static/data/volupte.jpg',
        name: 'Volupté',
        camera:'Pentax K1000',
        film:'AGFA Vista Plus 400',
        lens:'50mm f/1.4',
        mask: "middle",
        portrait: true
      },
      {
        src: './static/data/wave.jpg',
        name: 'Wave',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        lens:'50mm f/1.4',
        location:'État-Unis',
        locationLink:'https://www.google.com/maps/place/Parc+national+de+Yosemite/@37.8534972,-119.6911932,11z/data=!3m1!4b1!4m5!3m4!1s0x8096f09df58aecc5:0x2d249c2ced8003fe!8m2!3d37.8651011!4d-119.5383294',
        mask: "end",
        portrait: false
      },
      {
        src: './static/data/wind.jpg',
        name: 'Wind',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        lens:'50mm f/1.4',
        location:'État-Unis',
        locationLink:'https://www.google.com/maps/place/los+angeles,+État-Unis',
        mask: "end",
        portrait: false
      },
      {
        src: './static/data/wood.jpg',
        name: 'Wood',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        lens:'50mm f/1.4',
        location:'État-Unis',
        locationLink:'https://www.google.com/maps/place/Parc+national+de+Yosemite/@37.8534972,-119.6911932,11z/data=!3m1!4b1!4m5!3m4!1s0x8096f09df58aecc5:0x2d249c2ced8003fe!8m2!3d37.8651011!4d-119.5383294',
        mask: "begin",
        portrait: false
      },
    ],
  nbPhoto: function () { return this.photos.length },
  all: function () { 
    return this.photos.map(function(p, i){
      p.id=i
      return p
    }) 
  },
  get: function (id) {
    return this.photos[id]
  }
}
export default PhotoApi
