document.addEventListener('DOMContentLoaded', function(){
// Handling SignUp
var username = document.getElementById('username');
var password = document.getElementById('pwd');
var password2 = document.getElementById('pwd2');
var profilePic = document.getElementById('dp');
var submit = document.getElementById('submit');
var root = document.getElementById('root');

// SIGNUP FN::

submit.addEventListener('click', handleSingup);
function handleSingup(e){
    e.preventDefault();
    if(username.value && password.value && password2.value){
        if(password2.value === password.value){
            let imagePath = null;
             if(profilePic.value){
                imagePath = profilePic.value
             }
             else {
                 image = null
             }
            
            let init = {
                dbName:'PublicMedia',
                store: {
                    name: 'Users',
                    params: {
                        autoIncrement: true
                    }
                },
                index: {
                    name:'Username',
                    other: 'Username',
                    params: {
                        unique: true
                    }
                },
                txParams:'readwrite',
                body:{
                    method: 'put',
                    inserts:[
                        {Username: username.value, Password: password.value, ImagePath: imagePath }
                    ]
                        
                    
                }
            }
            // using saveIndexedDB Function from include\/db.js\/\/
            saveIndexedDB(init,1,function(result){
              
                if(result === 'Username taken'){
                    root.innerText = 'Username Already Taken';
                    username.value = '';
                }else {
                    root.innerText = 'Account Successfully Created';
                    root.className = "success";
                    username.value = '';
                    password.value = '';
                    password2.value = '';
                    profilePic.value = '';
                    
                    
                    setTimeout(function(){
                        window.location = '/login.html';
                        //window.reload();
                    },1000)
                    setTimeout(function(){
                        root.innerText = '';
                        root.className = '';
                    },2000)
                }
            });
           
        }else {
            root.innerText = 'Passwords Do Not Match';
            root.className = "error";
        }
        
    }else{
        
        root.innerText = 'Fields Must not be empty';
        root.className = "error";
    };
    console.log('clicked')
}

})