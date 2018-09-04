//发布订阅模式

window.eventHub={
    events:{
        'upload':[],
        'load':[]
    },
    emit(eventName,data){             //发布  执行所有对应的函数
        for(let key in this.events){
            if(key===eventName){
                let fnList=this.events[key];
                fnList.map((fn)=>{
                    fn.call(undefined,data)
                });
            }
        }
    },
    on(eventName,fn){                              //订阅 找到相关函数放在一个对应数组里面
        if(this.events[eventName]===undefined){
            this.events[eventName]=[];
        }
        this.events[eventName].push(fn);
    },
    off(){

    }

}