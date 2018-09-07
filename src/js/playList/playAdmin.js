{
  let view={
    el:'.playListWrap',
    template:`
    <h3>新建歌单</h3>
    <form action="#" class="playList">
      <div class="row"><label for="">名称：<input type="text" name="name"></label></div>
      <div class="row"><label for="">名称：<textarea cols="30" rows="10" name="summary"></textarea></label></div>
      <div class="row"><input type="submit"></div>
    </form>
    `,
    render(data){

    },
  }
  let controller={
    init(view,model){
      this.view=view;
      this.model=model;
      this.bindEvents();
    },
    bindEvents(){
      $(this.view.el).on('submit','form',(e)=>{
        e.preventDefault();
        let form=$(this.view.el).find('form')[0]
        let needs=['name','summary']
        let data={};
        needs.reduce((pre,item)=>{
          pre[item]=form[item].value
          return pre;
        },data)
        this.model.create(data).then((song)=>{
          console.log(this.model.data)
        })
        
      })
    },
  }
  let model={
    data:{},
    create(data) {
      // 声明类型
      var playList = AV.Object.extend('PlayList');
      // 新建对象
      var playlist = new playList();
      // 设置名称
      for(let key in data){
        playlist.set(key, data[key]);
      }
      return playlist.save().then((song) => {
        this.update(song) 
        return song
      }, function (error) {
        console.error(error);
      });

    },
    update(song){
      let {id,attributes}=song;
      this.data={id,...attributes}
    },
  }

  controller.init(view,model);
}