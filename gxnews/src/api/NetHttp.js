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
            xhr.open("get",url,true);
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
    
    static jsonp(url,params){
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
            url += "&jsonp=jsonpCallBack";
            window["jsonpCallBack"] = (res)=>{
                resolve(res);
                window["jsonpCallBack"] = null;
            }
            let script = document.createElement("script");
            script.src = url;
            document.head.appendChild(script);
        });
    }

    static post(url,params,contentType = "application/x-www-form-urlencoded",){
        return new Promise((resolve,reject)=>{
            let xhr = null;
            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }
            else{
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            let pk = "";
            if(params && typeof params == 'object'){
                let pks = [];
                for(let key in params){
                    pks.push(key + "=" + params[key]);
                    pks.push("&");
                }
                pks.pop();
                pk = pks.join("");
            }
            xhr.withCredentials = false;
            xhr.open("POST",this.DFTT_ADVER_URL + url,false);
            xhr.setRequestHeader("Content-Type",contentType);
            xhr.send(pk);
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState == 4 && xhr.status == 200){
                    resolve(JSON.parse(xhr.responseText));
                }
                else{
                    resolve();
                }
            }
        });
    }

    static openNewWin(url,back){
        let xhr = null;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }
        else{
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.withCredentials = false;
        xhr.open("GET","https://news.dtxww.cn/mini",false);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(null);
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4 && xhr.status == 200){
                back(JSON.parse(xhr.responseText));
            }
            else{
                back();
            }
        }
    }
}