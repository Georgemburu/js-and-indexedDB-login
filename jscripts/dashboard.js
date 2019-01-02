document.addEventListener('DOMContentLoaded', function(){
    let user_name = document.getElementById('user-name');
    let status = document.getElementById('status');
    let logout_btn =  document.getElementById('logout-btn');
    var ril = sessionStorage.getItem('user');
    if(!ril){
        window.location = '/login.html';
    }else{
        logout_btn.addEventListener('click', handleLogout)
        function handleLogout(e){
            sessionStorage.removeItem('user');
            window.location = '/login.html';
        }
        let ril1 = ril.split('');
        let ril2 = ril1.slice(1,-1);
        let ril3 = ril2.join('');
       
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
                    {Username: '', Password: '' }
                ]
                    
                
            }
        };
        saveIndexedDB(init,ril3,function(result){
            user_name.innerText = result.Username;
            status.innerText = 'online';
        });
    }
   
})