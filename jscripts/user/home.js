document.addEventListener('DOMContentLoaded', function(){
    let nav_As = document.querySelectorAll("nav>a")
   
   var a_links = Array.from(nav_As);
   a_links.forEach(a => {
       a.addEventListener('click', function(e){
           
           this.classList.toggle('active') //= 'active';
       })
   });

   let crypt_input = document.getElementById('crypt-input');
   var crypt = document.getElementById('crypt');
   var cryptCount = 0;
   var off = '';
   crypt.addEventListener('click', handleCrypt);
   function handleCrypt(e){
       e.preventDefault();
       if(off === crypt_input.value){
            console.log('off')
       }
       cryptCount+=1;
       let val1 = crypt_input.value
       if(!val1){
           
           let origin_disp = document.getElementById("origin-disp");
           origin_disp.innerText = 'Fill In Something';
           
       }else{
        let arr = val1.split('');

        crypto(arr,function(original,result){
            let origin_disp = document.getElementById("origin-disp");
            let crypt_disp = document.getElementById("crypt-disp");
          
            origin_disp.innerText = original;
            crypt_disp.innerText = result;

            off = result;
        });
        
       }
       

   }
setInterval(function(){
   if(cryptCount===3){
     
       let notes = document.getElementById('notes');
       notes.innerText = 'Now copy the crypted word in your clip board';
       
   }else {

   }
  
})
})
