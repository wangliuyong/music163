{
  let view={
    el:'.tabs-content .page-2',
    template:`
    <p>这是page2</p>
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
        if(page==='page-2'){
          $(`#${page}`).addClass('active').siblings('.active').removeClass('active')
        }
      })
    },
  }
  let model={}
  controller.init(model,view)
}