function crypto(arr,fncb){
    let ln = arr.length;
    for(let i = 0; i<1; i++){
        let sN = arr[i];
        let dict = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        let dict2 = ['!','@','#','$','%','^','&','*','(',')','_','-','=','+','{','}','[',']',';',':','"','.','?','/','', '|','`'];
        let dict3 = ['1','2','3','4','5','6','7','8','9','0'];
        var hidden = {
            one: dict,
            two: dict2,
            three: dict3
        }
        let rule = Math.floor(Math.random()*3);
        let choice;
        if(rule=='1'){
            choice = 'one'
        }else if(rule=='2'){
            choice = 'two';
        }else {
            choice = 'three';
        }
        
        var order = hidden[choice];
        let word = ''
        for(let ii =0; ii<ln; ii++){
            let rule2 = Math.floor(Math.random()*order.length);
            
            word+=order[rule2]
        }
        var original = arr.join('')

        fncb(original,word)
        
    }
}