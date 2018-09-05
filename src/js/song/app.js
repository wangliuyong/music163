{
  let view={
    el:'#app',
    template:`
      <audio src="_url_" autoplay></audio>
    `,
    render(data){
      $(this.el).find('audio')[0].src=`${data.url}`
      console.log(data)
    },
    play(){
      let audio=$(this.el).find('audio')[0]
      audio.play()
    },
    pause(){
      let audio=$(this.el).find('audio')[0]
      audio.pause()
    },
  }
  let controller={
    init(view,model){
      this.view=view
      this.model=model
      let id=this.getSongId()
      this.model.setId(id)
      this.model.getSong().then((song)=>{
        this.view.render(this.model.data.song)
        //this.view.play()
      })
      this.bindEvents()
    },
    bindEvents(){
      $(this.view.el).on('click','.play',()=>{
        this.view.play()
      })
    },
    getSongId() {
      let id = window.location.search
      if (id.indexOf('?') === 0) {
        id = id.substring(1)
      }
      let arr = id.split('&').filter((item) => { return item })
      for (let i = 0; i < arr.length; i++) {
        let key = arr[i].split('=')[0]
        let value = arr[i].split('=')[1]
        if (key === 'id') {
          id = value;
          break
        }
      }
      return id
    }
  }
  let model={
    data:{
      song:{
        id:'',
        cover:'',
        singer:'',
        url:''
      },
      status:'pause',
      
    },
    setId(id){
      this.data.song.id=id
    },
    getSong() {
      var query = new AV.Query('Song');
      return query.get(this.data.song.id).then((song)=>{
        // 成功获得实例
        Object.assign(this.data.song,song.attributes)
        return song
      }, function (error) {
        // 异常处理
      });
    },
  }


  controller.init(view,model)
}