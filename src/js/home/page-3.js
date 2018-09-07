{
  let view={
    el:'.tabs-content .page-3',
    template:`
    <h1 align="center" style="padding:20px;">搜索页面敬请期待</h1>
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
      this.bindEventHubOn()
    },
    bindEvent(){},
    bindEventHubOn(){
      window.eventHub.on('active',(page)=>{
        if(page==='page-3'){
          $(`#${page}`).addClass('active').siblings('.active').removeClass('active')
        }
      })
    },
  }
  let model={}
  controller.init(model,view)
}