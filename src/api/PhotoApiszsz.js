
const PhotoApi = {
  photos:
    [
      {
        id: 0,
        src: './data/alpes.jpg',
        name: 'Alpes'
      },
      {
        id: 1,
        src: './data/alpes.jpg',
        name: 'Alpes'
      },
      {
        id: 2,
        src: './data/alpes.jpg',
        name: 'Alpes'
      },
      {
        id: 3,
        src: './data/alpes.jpg',
        name: 'Alpes'
      },
      {
        id: 4,
        src: './data/alpes.jpg',
        name: 'Alpes'
      },
      {
        id: 5,
        src: './data/alpes.jpg',
        name: 'Alpes'
      }
    ],
  nbPhoto: function () { return this.photos.length },
  all: function () { return this.photos },
  get: function (id) {
    return this.photos[id]
  }
}
export default PhotoApi
