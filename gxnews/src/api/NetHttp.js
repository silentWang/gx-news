export default class NetHttp {
    static get(url,params){
        return new Promise((resolve,reject)=>{
            let kvs = [];
            for(let key in params){
                kvs.push(key + "=" + params[key]);
                kvs.push("&");
            }
            if(kvs.length > 0){
                kvs.pop();
                url = url + "?" + kvs.join("");
            }
            let xhr = null;
            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }
            else{
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.withCredentials = true;
            xhr.open("get",this.DFTT_ADVER_URL + url,true);
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(null);
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText));
                    }
                }
            }
        });
    }

    static post(url,params){
        return new Promise((resolve,reject)=>{
            let xhr = null;
            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }
            else{
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            let json = JSON.stringify(params);
            xhr.withCredentials = false;
            xhr.open("post",this.DFTT_ADVER_URL + url);
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(json);
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState == 4 && xhr.status == 200){
                    resolve(JSON.parse(xhr.responseText));
                }
            }
        });
    }
}