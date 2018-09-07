{
  let view={
    el:'ol.list',
    template:`
    <li>
      <h3>_song_</h3>
      <p>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinle"></use>
      </svg>_singer_
      </p>
      <a href="./song.html?id=_id_">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shuangsechangyongtubiao-"></use>
          </svg>
      </a>
    </li>
    `,
    render(data){
      let $ol=$(this.el)
      data.map((song)=>{
        let html=this.template
        console.log(song.song)
        html=html.replace('_song_',song.song).replace('_singer_',song.singer).replace('_id_',song.id)
        $ol.append(html)
      })

    },
  }
  let controller={
    init(model,view){
      this.model=model
      this.view=view
      this.model.fetch().then(()=>{
        this.view.render(this.model.data.songs)
      })
      
    },
  }
  let model={
    data:{
      songs:[],
    },
    fetch() {
      let query = new AV.Query('Song');
      return query.find().then((e) => {
        let songs = e.map((item) => {
          let { id, attributes } = item;
          return { id, ...attributes }
        })
        this.data.songs = songs;
      });
    },
  }

  controller.init(model,view)
}