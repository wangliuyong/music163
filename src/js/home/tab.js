{
  let view={
    el:'#tabs',
    template:`
    <ol class="tabs-nav">
      <li class="active" data-page="page-1"><div class="text">推荐音乐</div></li>
      <li data-page="page-2"><div class="text">热歌榜</div></li>
      <li data-page="page-3"><div class="text">搜索</div></li>
    </ol>
    `,
    render(){
      $(this.el).html(this.template)
    },
  }
  let controller={
    init(model,view){
      this.model=model
      this.view=view
      this.view.render()
      this.bindEvent()
    },
    bindEvent(){
      $(this.view.el).on('click','li',(e)=>{
        $(e.currentTarget).addClass('active').siblings('.active').removeClass('active')
        let $page=$(e.currentTarget).attr('data-page')
        window.eventHub.emit('active',$page)
        
      })
    },
  }
  let model={}

  controller.init(model,view)
}