
const CACHE = {
  
  refer: null,

  init(name){
    CACHE.cacheName = name;
    caches.open(CACHE.cacheName)
      .then(cache=>{
        CACHE.refer = cache;
    }).catch(console.warn); 
  },

    put(req,resp){
        CACHE.refer.put(req, resp);
    },

  contentFile(file){
    let request = new Request(file);
    return CACHE.refer.match(request);
  },
  
  listFiles(){
    return caches
      .open(CACHE.cacheName)
      .then((cache) => {
        return cache.keys();
    });
  }, 
 
  deleteFile(file){
     let request = new Request(`.data/${file}.json`);
   return CACHE.refer.delete(request);
  }

};

export default CACHE;
