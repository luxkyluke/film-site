
const PhotoApi = {
  photos:
    [
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        lens:'50mm f/1.4',
        mask: "begin",
        portrait: true
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        lens:'50mm f/1.4',
        mask: "middle",
        portrait: true
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        lens:'50mm f/1.4',
        mask: "end",
        portrait: true
      },{
        src: '/data/alpes.jpg',
        name: 'Alpes',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        lens:'50mm f/1.4',
        mask: "begin",
        portrait: true
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        lens:'50mm f/1.4',
        mask: "middle",
        portrait: true
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        camera:'Pentax K1000',
        film:'Ilford Pan 400',
        lens:'50mm f/1.4',
        mask: "end",
        portrait: true
      }
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
