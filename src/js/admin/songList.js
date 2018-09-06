{
    let view={
        el:'#songList-container',
        template:`
        <ul class="songList">
            
        </ul>
        `,
        render(data){
            $(this.el).html(this.template);
            let $ul=$(this.el).find('ul');

            let child= data.map((songs)=>{
                return $ul.append($('<li></li>').text(songs.song).attr('data-id',songs.id).append($('<span class="singer"></span>').text(songs.singer)))
            });
            $(this.el).html(child);
            if(model.data.selectId){
                $(this.el).find(`li[data-id="${model.data.selectId}"]`).addClass('active')   
            } 
            $(this.el)[0].scrollTop=1000000
        },
        clearActive(){
            $(`${this.el} li`).removeClass('active');
        },
        removeActive(element){
            let $li=$(element);
            $li.addClass('active').siblings('.active').removeClass('active');
        },
    };
    

    let model={
        data:{
            songs:[],
            selectId:null
        },
        find(){
            var query = new AV.Query('Song');
            return query.find().then((e)=>{
                let songs=e.map((item)=>{
                    let {id,attributes}=item;
                    return {id,...attributes}
                })
                this.data.songs=songs;
            });
        },
    };


    let controller={
        init(view,model){
            this.view=view;
            this.model=model;
            this.view.render(this.model.data.songs);
            this.getAllSongs();
            this.bindEvent();
            this.bindEventOn();
        },
        getAllSongs(){
            return this.model.find().then(()=>{
                this.view.render(this.model.data.songs);
            })
        },
        bindEventOn(){
            window.eventHub.on('upload',(data)=>{
                this.view.clearActive();
            });
            window.eventHub.on('create',(data)=>{
                this.model.data.songs.push(data);
                this.view.render(this.model.data.songs);
            })
            window.eventHub.on('update',(data)=>{
                let songs=this.model.data.songs
                for(let i=0;i<songs.length;i++){
                    if(songs[i].id===data.id){
                        songs[i]=data;
                    }
                }
                this.view.render(songs);
            })
        },
        bindEvent(){
            $(this.view.el).on('click','li',(e)=>{
                let songId=e.currentTarget.getAttribute('data-id')

                this.model.data.selectId=songId
                let data
                let songs=this.model.data.songs
                
                for(let i=0;i<songs.length;i++){
                    if(songs[i].id===songId){
                        data=songs[i];
                    }
                }
                let copyData=JSON.parse(JSON.stringify(data));

    
                window.eventHub.emit('select',copyData)
        
                this.view.removeActive(e.currentTarget);
            })
        },
    };
    controller.init(view,model);
    //window.app.songList=controller;
}