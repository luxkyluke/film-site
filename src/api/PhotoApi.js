
const PhotoApi = {
  photos:
    [
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "begin",
        portrait: false
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "middle",
        portrait: false
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end",
        portrait: false
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
