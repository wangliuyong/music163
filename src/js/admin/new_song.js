{
    let view={
        el:'aside .newSong',
        template:`
            <button class="addSong">+ 新建歌曲</button>  
        `,
        render(data){
            $(this.el).html(this.template);
        }
    };
    let model={};
    let controller={
        init(view,model){
            this.view=view;
            this.model=model;
            this.view.render(this.model.data);
            this.bindEventHubOn();
            this.bindEvent()
            
        },
        active(){
            $(this.view.el).addClass('active')
        },
        bindEventHubOn(){
            window.eventHub.on('upload',(data)=>{
                this.active();
            })
        },
        bindEvent(){
            $(this.view.el).on('click','button',(e)=>{
                window.eventHub.emit('new',{})
            })
        },
    };

    controller.init(view,model);

    //window.app.newSong=controller;
}