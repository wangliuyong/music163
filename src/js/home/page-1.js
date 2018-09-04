{
  let view={
    el:'.tabs-content .page-1',
    template:`
    <section class="playList">
      <h2>推荐歌单</h2>
      <ol class="songs">
        <li>
          <div class="cover"><img src="./img/1.webp" alt=""></div>
          <p>失落少年孤独者俱乐部</p>
        </li>
        <li>
          <div class="cover"><img src="./img/2.webp" alt=""></div>
          <p>另类R&B，带给你不一样的性感</p>
        </li>
        <li>
          <div class="cover"><img src="./img/3.webp" alt=""></div>
          <p>午睡民谣</p>
        </li>
        <li>
          <div class="cover"><img src="./img/4.webp" alt=""></div>
          <p>毛阿姨唱过的歌</p>
        </li>
        <li>
          <div class="cover"><img src="./img/5.webp" alt=""></div>
          <p>『港乐』香港音乐大师第三辑：黄霑作品集</p>
        </li>
        <li>
          <div class="cover"><img src="./img/6.webp" alt=""></div>
          <p>『旧影』台湾琼瑶剧&电影歌曲全记录</p>
        </li>
      </ol>
    </section>
    <section class="songs">
      <h2>最新音乐</h2>
      <ol class="list">
        
        
      </ol>
    </section>
    <section class="art">
      <div class="logo">
        <img src="./img/log01.jpg" alt="">
      </div>
      <div class="open-app">
        <a href="#">打开APP，发现更多好音乐</a>
      </div>
      <div class="copyright">
          网易公司版权所有©1997-2017杭州乐读科技有限公司运营
      </div>
    </section>
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
      this.loadMoudle1()
      this.loadMoudle2()
    },
    loadMoudle1() {
      let script1 = document.createElement('script')
      script1.src = './js/home/page-1-1.js'
      $(document.body).append(script1)
    },
    loadMoudle2() {
      let script2 = document.createElement('script')
      script2.src = './js/home/page-1-2.js'
      $(document.body).append(script2)
    },
    bindEvent(){},
    bindEventHubOn(){
      window.eventHub.on('active',(page)=>{
        if(page==='page-1'){
          $(`#${page}`).addClass('active').siblings('.active').removeClass('active')
        }
      })
    },
  }
  let model={}
  controller.init(model,view)
}