
const PhotoApi = { 
  photos : 
    [
      { 
        id: 0,   
        src:  "./data/alpes.jpg",
        name:"Alpes"
      },
      { 
        id: 1,   
        src:  "./data/alpes.jpg",
        name:"Alpes"
      },
      { 
        id: 2,   
        src:  "./data/alpes.jpg",
        name:"Alpes"
      }
    ] ,
  nbPhoto: function(){return this.photos.length},
  all: function() {return this.photos},
  get: function(id) {
    const isPhoto = p => p.id === id;
    return this.photos[id];
  }
}

export default ProjectApi;