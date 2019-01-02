function saveIndexedDB( db, id ,app ){
    //the args ID and APP areonly needed when GETTING data and App the callback fn;
    //NOTE:: ID should be a String with quotes around as arg; eg: aveIndexedDB(db, =>'1'<=, app); //:::AMMENDED => CAN BE LEFT AS NUMBER
    //the args DB  is an object like defined bellow;
    //demerits::://1. No way to query all data in database store. just one at a time with ID
                        //uses store.get(id)
    //ERROR HANDLING//:://=>THE FIRST THREE ARE GIVEN VIA CALLBACK::;
    //              //:://=>THE REST ARE OUTPUT TO THE CONSOLE ONLY WHEN THEY OCCUR::;
    //              ::/.1=> 'username taken' => when you try to save a taken indexed value;
    //              ::/.2=> saved: {obj} => is the return of successfully saved data;
    //              ::/.3=> {obj} => on retreiving data, just the object containing it is given back;              
    //              ::/.4=> console.log()s => Other connection errors due to failure to establis
    //                  /connectio with db are given via the console automatically
/***
 * dbName: '', //STRING
 * store: {}, //OBJECT
 * index: {}, //OBJECT
 * body: {}, //OBJECT
 * txParams: '' //STRING
 */
///INNER CONTEXT
/***
 * store: {
 *      name: '', //STRING
 *      params: {} //OBJECT
 * }
 */
/***
 * index: {
 *      name: '', //STRING
 *      other: '', //STRING     ::\\SAME AS NAME::
 *      params: {} //OBJECT
 * }
 */
/***
 * body: {
 *      method: '', //STRING
 *      inserts: [{},{}] //ARRAY OF OBJECTS
 * }
 */
   
    var configs = db;

    //checking if SUPPORTED
   
window.indexedDB = window.indexedDB ||  window.mozIndexedDB 
    || window.webkitIndexedDB || window.msIndexedDB ;

if(!window.indexedDB){
    alert('indexedDB not supported')
}else {
    // if SUPPORTED OPEN DB
        let request = window.indexedDB.open(configs.dbName, 1),
        db, tx, index, store;
    request.onerror = function(e){
        console.log('ERROR: could not establish Handshake' + e.target.errorCode)
    }

    // ONUPGRADE NEEDED SETUP
    request.onupgradeneeded = function(){
        db = request.result;
        store = db.createObjectStore(configs.store.name,configs.store.params);
        index = store.createIndex(configs.index.name,configs.index.other, configs.index.params );
    }
    request.onsuccess = function(){
        db = request.result;
        tx = db.transaction(configs.store.name, configs.txParams );
        store = tx.objectStore(configs.store.name);
        index = store.index(configs.index.name);
        
        // STORING DATA TO DATABASE
    if(configs.body.method === 'put'){  
        if(configs.body.inserts.length > 0){

            for(let i = 0; i<configs.body.inserts.length; i++){
                var constIndex = configs.index.other
                let inputIndex = configs.body.inserts[i];
                
                var searchIndex = inputIndex[constIndex];
                let qs = index.get(searchIndex);
                    qs.onsuccess = function(e){
                        var targetRes = e.target.result;
                        
                        if(targetRes === undefined){
                            store.put(configs.body.inserts[i]) ;

                            app({saved :configs.body.inserts[i]})
                        }else {
                            var err = constIndex + ' taken';
                            app(err);  
                        }
                    }    
                    }   
            } 
    }else if(configs.body.method === 'get'){
        // getting Data
        
        let qs = index.get(String(id))
        qs.onsuccess = function(e){
            if(e.target.result === undefined){
                let errmsn  = 'no data Found';
                app(errmsn)
                return;
            }else{
                let getData = e.target.result;
                app(getData)
                return ;
            }
            
        }
        qs.onerror = function(e){
            console.log(e.target.statusCode)
        }            
    }else{
        let errormsg = 'Check Your method'
        app(errormsg)
    }
        }

        //  tx.oncomplete = function(){
        //     db.close();
        // }
    }  
    }       
     










