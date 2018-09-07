{
  let view={
    el:'#app',
    template:`
      <audio src="_url_" autoplay></audio>
    `,
    render(data){
      $(this.el).find('audio').attr('src',data.url).get(0).onended=()=>{
        this.pause()
      }
      this.play()

      //console.log($(this.el).find('.background').css())
      //$(this.el).find('.background').css('background',`url(${data.cover}) no-repeat center cover`)
      $(this.el).find('.background').css('background',`url(${data.cover}) no-repeat center center/cover`)
      $(this.el).find('img.cover')[0].src=`${data.cover}`
     
      $(this.el).find('span.song').text(data.song)
      $(this.el).find('span.singer').text(data.singer)
      let arr=data.lyrics.split('\n')

      arr.map((string)=>{
        let p=$('<p></p>')
        let times=string.substr(1,8).split(':')
        let minutes=times[0]-0
        let seconds=times[1]-0
        let time=minutes*60+seconds
        p.attr('data-time',time)
        $(this.el).find('.lyricWrap').append(p.text(string.substr(10)))
      })
    },
    play(){
      let audio=$(this.el).find('audio')[0]
      audio.play()
      $(this.el).find('#play').removeClass('active')
      $(this.el).find('.disc-wrap').removeClass('pause').addClass('play')

      audio.ontimeupdate=()=>{
        //console.log(audio.currentTime)
        this.showLyrics(audio.currentTime)
      }
                
    },
    pause(){
      let audio=$(this.el).find('audio')[0]
      audio.pause()
      $(this.el).find('#play').addClass('active')
      $(this.el).find('.disc-wrap').removeClass('play').addClass('pause')
    },
    showLyrics(time){
      //console.log(time)
      let $p=$(this.el).find('p')
      let currentTime 
      let nextTime
      //console.log($p.eq(2).offset())
      for(let i=0;i<$p.length;i++){
        if(i===$p.length-1){
          console.log($p[i])
          
        } else {
          currentTime = $p.eq(i).attr('data-time')
          nextTime = $p.eq(i + 1).attr('data-time')
          if (currentTime <= time && time < nextTime) {

            //console.log($p[i])

            let pHeight=$p[i].getBoundingClientRect().top
           
            let lyHeight=$(this.el).find('.lyricWrap')[0].getBoundingClientRect().top
            
            height=pHeight-lyHeight
          
            $(this.el).find('.lyricWrap').css({
              transform:`translateY(${-height+25}px)`,
            })
            $p.eq(i).addClass('active').siblings('.active').removeClass('active')
            break
          }
        }
        
        
      }
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
      let arr = id.split('&').filter((item) => { return item })//利用filter过滤地掉空字符串
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
        url:'',
        lyrics:''
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