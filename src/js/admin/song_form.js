{
    let view={
        el:'.page>main>.formwrap',
        init(){
            this.$el=$(this.el);
        },
        template:`
        <form action="#" class="songForm">
            <div class="row">编辑歌曲信息</div>
            <div class="row"><label>歌名: <input name="song" type="text" value="_song_"></label></div>
            <div class="row"><label>歌手: <input name="singer" type="text" value="_singer_"></label></div>
            <div class="row"><label>外链: <input name="url" type="text" value="_url_"></label></div>
            
            <div class="row"><label>封面: <input name="cover" type="text" value="_cover_"></label></div>
            <div class="row"><label>歌词: <textarea rows="3" cols="21" name="lyrics" type="text" ></textarea></label></div>
            <div class="row"><input type="submit" value="保存"></div>
        </form>
        `,
        render(data={}){
            let placeholder=['song','url','singer','cover',"lyrics"];
            let html=this.template;
            placeholder.map((string)=>{
                html=html.replace(`_${string}_`,data[string] || '')
            });
            $(this.el).html(html);
            $(this.el).find('textarea').text(data.lyrics)  
        },
        addActive(data) {
            
            model.data = data;
            this.render(model.data);
            $(this.el).addClass('active');
        },
    }
    let model={
        data:{song:'',singer:'',url:'',id:'',cover:'',lyrics:''},//永远只存储一首歌的数据
        create(data) {

            console.log('create')
            // 声明类型
            var Song = AV.Object.extend('Song');
            // 新建对象
            var song = new Song();
            // 设置名称
            song.set('song', data.song);
            song.set('singer', data.singer);
            song.set('url', data.url);
            song.set('cover', data.cover);
            song.set('lyrics', data.lyrics);
            // 设置优先级
            //song.set('priority', 1);
            return song.save().then((Song) =>{ //更新model data
                
                let {id,attributes}=Song;
                Object.assign(this.data,{
                    id:id,
                    song:attributes.song,
                    url:attributes.url,
                    singer:attributes.singer,
                    cover:attributes.cover,
                    lyrics:attributes.lyrics
                }) 
            }, function (error) {
                console.error(error);
            });
        },
        update(data){
            // 第一个参数是 className，第二个参数是 objectId
            var song = AV.Object.createWithoutData('Song',this.data.id);
            // 修改属性
            song.set('song',data.song)
            song.set('singer',data.singer)
            song.set('url',data.url)
            song.set('cover',data.cover)
            song.set('lyrics',data.lyrics)
            // 保存到云端
            return song.save()
        },
    };
    let controller={
        init(model,view){
            this.model=model;
            this.view=view;
            this.view.init();
            this.view.render(this.model.data);
            this.bindEventHubOn()
            this.bindEvent() 

            
        },
        reset(data){
            this.view.render(data);
        },
        bindEventHubOn(){
            window.eventHub.on('upload',(data)=>{
                this.view.addActive(data)
            });
            window.eventHub.on('select',(data)=>{
                this.view.addActive(data)
            })
            window.eventHub.on('new',(data)=>{
                this.view.addActive(data)
            })
        },
        bindEvent(){
            this.view.$el.on('submit','form',(e)=>{
            
                e.preventDefault();
                let needs=['song','singer','url','cover','lyrics'];
                let data={}
                needs.map((string)=>{
                    data[string]=this.view.$el.find(`[name="${string}"]`).val();
                });
                if (this.model.data.id) {
                    this.model.update(data).then((song)=>{
                        let {id,attributes}=song;
                        this.model.data={id,...attributes}

                        //console.log(this.model.data)
                        let data=JSON.parse(JSON.stringify(this.model.data));
                        window.eventHub.emit('update',data)
                        $(this.view.el).removeClass('active');
                        window.eventHub.emit('submit', this.model.data);
                    })
                }else{
                    this.model.create(data).then(()=>{
                        this.reset({});
                        this.create()
                    });
                }  
            });
        },
        create() {
            let json = JSON.stringify(this.model.data)
            let object = JSON.parse(json)
            window.eventHub.emit('create', object);
            $(this.view.el).removeClass('active');
            window.eventHub.emit('submit', this.model.data);
        },
    }

    controller.init(model,view);
    //window.app.songForm=controller;
}