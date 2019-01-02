// document.addEventListener('DOMContentLoaded', function(){
    // Handling Login
var login_username = document.getElementById('login-username');
var login_pwd = document.getElementById('login-pwd');
var login_btn = document.getElementById('login-btn');

// LOGIN FN::
login_btn.addEventListener('click', function handleLogin(e){
  
    e.preventDefault();
    if(login_username.value && login_pwd.value){
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
                method: 'get',
                inserts:[
                    {Username: login_username.value, Password: login_pwd.value }
                ]
                    
                
            }
        }
        saveIndexedDB(init,login_username.value,function(result){
            if(result=== 'no data Found'){
                root.className = 'error';
                root.innerText = 'No data Found';
                setTimeout(function(){
                    root.className = '';
                    root.innerText = '';
                },1400)
            }else {
          
                if(result.Username === login_pwd.value){
                    root.className = 'success';
                    root.innerText = 'Access Granted';
                    sessionStorage.setItem('user',JSON.stringify(result.Username));
                    
                    setTimeout(function(){
                        root.className = '';
                        root.innerText = '';
                        window.location = '/dashboard.html';
                    },1400)
                }else {
                    root.className = 'error';
                    root.innerText = 'Access Denied';
                    setTimeout(function(){
                        root.className = '';
                        root.innerText = '';
                    },1400)
                }
               
            }
           
        })
    }else{
        root.className = 'error';
        root.innerText = 'Fields Must Not Be Empty!';
        setTimeout(function(){
            root.className = '';
            root.innerText = '';
        },1400)
    }
    
    
});
// })