/**
 * @author M Montserrat Gomez A
 * @description All the Cache Methods
 */
const CACHE = {
  cacheName: null,
  refer: null,

  init(name){
    CACHE.cacheName = name;
    caches.open(CACHE.cacheName)
      .then(cache=>{
        CACHE.refer = cache;
    }).catch(console.warn); 
  },
/**
 * 
 * @param {*} req 
 * @param {*} resp 
 * @description Add a file to the Cache
 */
    put(req,resp){
        CACHE.refer.put(req, resp);
    },

  /**
   * 
   * @param {*} file 
   * @description Shows de content of a file
   */
  contentFile(file){
    let request = new Request(`.data/${file}`);
    return CACHE.refer.match(request);
  },
  /**
   * @description list the files in cache
   */
  listFiles(){
    return caches
      .open(CACHE.cacheName)
      .then((cache) => {
        return cache.keys();
    });
  }, 
  /**
   * 
   * @param {*} file 
   * @description delete a file in cache
   */
  deleteFile(file){
     let request = new Request(`.data/${file}`);
   return CACHE.refer.delete(request);
  }

};

export default CACHE;
