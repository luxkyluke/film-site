
const PhotoApi = {
  photos:
    [
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "begin"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "middle"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
      },
      {
        src: '/data/alpes.jpg',
        name: 'Alpes',
        mask: "end"
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
