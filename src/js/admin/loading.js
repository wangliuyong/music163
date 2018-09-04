{
  let model={}
  let view={el:'#loading'}
  let controller={
    init(view){
      this.view=view
      this.bindEventHubOn()
    },
    bindEventHubOn(){
      window.eventHub.on('beforeUpload',()=>{
        $(this.view.el).addClass('active')
      })
      window.eventHub.on('afterUpload',()=>{
        $(this.view.el).removeClass('active')
      })
    }
  }

  controller.init(view);
}