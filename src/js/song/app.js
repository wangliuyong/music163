{
  let view={
    el:'#app',
    template:`
      <audio src="_url_" autoplay></audio>
    `,
    render(data){
      $(this.el).find('audio')[0].src=`${data.url}`
      this.play()
      console.log(data)
      $(this.el).find('.background').css('background',`url(${data.cover}) no-repeat center cover`)
      $(this.el).find('img.cover')[0].src=`${data.cover}`
     
      $(this.el).find('span.song').text(data.song)
      $(this.el).find('span.singer').text(data.singer)
    },
    play(){
      let audio=$(this.el).find('audio')[0]
      audio.play()
      $(this.el).find('#play').removeClass('active')
      $(this.el).find('.disc-wrap').removeClass('pause').addClass('play')
                
    },
    pause(){
      let audio=$(this.el).find('audio')[0]
      audio.pause()
      $(this.el).find('#play').addClass('active')
      $(this.el).find('.disc-wrap').removeClass('play').addClass('pause')
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
      $(this.view.el).on('click','.click',()=>{
        let status=this.model.data.status
        if(status==='pause'){
          this.view.play()
          this.model.data.status='play'
        }else{
          this.view.pause()
          this.model.data.status='pause'
        }
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