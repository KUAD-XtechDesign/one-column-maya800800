$(function(){
  var cursor=$("#cursor");
  //ちょっと遅れてついてくるストーカー要素の指定  
  var stalker=$("#stalker");
  
  //mousemoveイベントでカーソル要素を移動させる
  $(document).on("mousemove",function(e){
    //カーソルの座標位置を取得
    var x=e.clientX;
    var y=e.clientY;
    //カーソル要素のcssを書き換える用
    cursor.css({
      "opacity":"1",
      "top":y+"px",
      "left":x+"px"
    });
    //ストーカー要素のcssを書き換える用    
    setTimeout(function(){
      stalker.css({
        "opacity":"1",
        "top":y+"px",
        "left":x+"px"
      });
    },140);//カーソルより遅れる時間を指定
    
  });

  

    /*=================================================
    ハンバーガ―メニュー
    ===================================================*/
    // ハンバーガーメニューをクリックした時
    $('.hamburger').on('click', function() {
      // ハンバーガーメニューの共通処理を呼び出す
      hamburger();
    });
    // メニューのリンクをクリックした時
    $('#navi a').on('click', function() {
      // ハンバーガーメニューの共通処理を呼び出す
      hamburger();
    });
  
    /*=================================================
    スムーススクロール
    ===================================================*/
    // ページ内リンクのイベント
    $('a[href^="#"]').click(function(){
      // リンクを取得
      let href= $(this).attr("href");
      // ジャンプ先のid名をセット
      let target = $(href == "#" || href == "" ? 'html' : href);
      // トップからジャンプ先の要素までの距離を取得
      let position = target.offset().top;
      // animateでスムーススクロールを行う
      // 600はスクロール速度で単位はミリ秒
      $("html, body").animate({scrollTop:position}, 600, "swing");
      return false;
    });
  
    /*=================================================
    フェード表示
    ===================================================*/
    $(".inview").on("inview", function (event, isInView) {
      if (isInView) {
        // 要素（inviewクラス）が表示されたらshowクラスを追加する
        $(this).stop().addClass("show");
      }
    });
  
    /*=================================================
    スクロール時のイベント
    ===================================================*/
    $(window).scroll(function() {
      // スクロール位置を取得
      let scroll = $(window).scrollTop();
  
      /*=================================================
      メインビジュアルの拡大・縮小
      ===================================================*/
      mv_scale(scroll);
  
      /*=================================================
      ロゴ、ハンバーガーメニューの表示
      ===================================================*/
      // スクロール位置が520pxを超えた場合
      if (scroll > 520) {
        // ロゴとハンバーガ―メニュをfadeInで表示する
        $('.logo').fadeIn(500);
        $('.hamburger').fadeIn(500);
      // スクロール位置が520px未満の場合
      } else {
        // ロゴとハンバーガ―メニュをfadeOutで非表示にする
        $('.logo').fadeOut(500);
        $('.hamburger').fadeOut(500);
      }
  
      /*=================================================
      サイドボタンを表示
      ===================================================*/
      // 画面下から#galleryまでの距離を取得
      let gallery_position = $('#gallery').offset().top - $(window).height();
      // 画面下から#accessまでの距離を取得
      let access_position = $('#access').offset().top - $(window).height();
  
      // window.innerWidthで画面幅を取得
      // PC表示の場合の処理（画面幅が900pxより大きい場合　※900pxはCSSのブレークポイントとあわせる）
      if (window.innerWidth > 900) {
        // #galleryが表示された場合（スクロール位置が、画面下から#galleryまでの距離を超えた場合）
        if(scroll > gallery_position){
          // #accessが表示されるまでの間は、#side-btnを横からスライドさせて表示する
          if(scroll < access_position){
            $('#side-btn').css({
              'transform': 'rotate(-90deg) translateY(0)'
            });
           // #accessが表示されたら、#side-btnをスライドさせて非表示にする
          } else {
            $('#side-btn').css({
              'transform': 'rotate(-90deg) translateY(60px)'
            });
          }
        // #galleryが表示される前は、#side-btnをスライドさせて非表示にする
        } else {
          $('#side-btn').css({
            'transform': 'rotate(-90deg) translateY(60px)'
          });
        }
      }
  
      /*=================================================
      Accessの背景画像を表示
      ===================================================*/
      // 画面下から#contactまでの距離を取得
      let contact_position = $('#contact').offset().top - $(window).height();
  
      // #accessが表示された場合
      if(scroll > access_position){
        // #contactが表示されるまでの間は、背景画像をfadeInで表示する
        if(scroll < contact_position){
          $('.bg').fadeIn(500);
        } else {
          $('.bg').fadeOut(500);
        }
      // #accessが表示される前の場合
      } else {
        // 背景画像を表示しない
        $('.bg').fadeOut(500);
      }
    });
  
    /*=================================================
    画面読み込み時と画面幅変更時のイベント
    ===================================================*/
    $(window).on('load resize', function() {
      // スクロール位置を取得
      let scroll = $(window).scrollTop();
  
      /*=================================================
      メインビジュアルの拡大・縮小
      ===================================================*/
      mv_scale(scroll);
    });
  });
  
  /*=================================================
  ハンバーガ―メニュー（共通処理）
  ===================================================*/
  // ハンバーガーメニューをクリックした時とメニュー内のリンクをクリックした時の
  // 処理が同じなので処理を共通化する
  function hamburger() {
    // toggleClassを使用することで、hamburgerクラスにactiveクラスが存在する場合は削除、
    // 存在しない場合を追加する処理を自動で行ってくれる
    $('.hamburger').toggleClass('active');
  
    if ($('.hamburger').hasClass('active')) {
      // hamburgerクラスにactiveクラスが存在する場合は、naviにもactiveクラスを追加する
      $('#navi').addClass('active');
    } else {
      // hamburgerクラスにactiveクラスが存在しない場合は、naviからactiveクラスを削除する
      $('#navi').removeClass('active');
    }
  }
  
  /*=================================================
  メインビジュアルの拡大・縮小（共通処理）
  ===================================================*/
  function mv_scale(scroll) {
    // window.innerWidthで画面幅を取得
    // PC表示の場合の処理（画面幅が900pxより大きい場合　※900pxはCSSのブレークポイントとあわせる）
    if (window.innerWidth > 900) {
      // メインビジュアルのCSS（width）を変更する
      // widthの値をスクロール量にあわせて増やすことで画像を拡大させる
      $('#mainvisual img').css({
        'width': 100/3 + scroll/10  + '%'
      });
    // スマホ表示の場合の処理（画面幅が900px以下の場合）
    } else {
      // メインビジュアルのCSS（width）を変更する
      // widthの値をスクロール量にあわせて減らすことで画像を縮小させる
      $('#mainvisual img').css({
        'width': 100 - scroll/10  + '%'
      });
    }

    var
    cursor = $(".cursor"),
    follower = $(".follower"),
    cWidth = 6, //カーソルの大きさ
    fWidth = 40, //フォロワーの大きさ
    delay = 15, //数字を大きくするとフォロワーがより遅れて来る
    mouseX = 0, //マウスのX座標
    mouseY = 0, //マウスのY座標
    posX = 0, //フォロワーのX座標
    posY = 0; //フォロワーのX座標

   //カーソルの遅延アニメーション
   //ほんの少ーーーしだけ遅延させる 0.001秒
    TweenMax.to({}, .001, {
   repeat: -1,
   onRepeat: function() {
    posX += (mouseX - posX) / delay;
    posY += (mouseY - posY) / delay;
    
    TweenMax.set(follower, {
        css: {    
          left: posX - (fWidth / 2),
          top: posY - (fWidth / 2)
        }
    });
    
    TweenMax.set(cursor, {
        css: {    
          left: mouseX - (cWidth / 2),
          top: mouseY - (cWidth / 2)
        }
    });
  }
  });

     //マウス座標を取得
 　$(document).on("mousemove", function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
 　});

 $("a").on({
  "mouseenter": function() {
    cursor.addClass("is-active");
    follower.addClass("is-active");
  },
  "mouseleave": function() {
    cursor.removeClass("is-active");
    follower.removeClass("is-active");
  }
  });

 var
 cursor = $(".cursor"),
 cWidth = 20, //カーソルの大きさ
 mouseX = 0, //マウスのX座標
 mouseY = 0; //マウスのY座標

 $(document).on('mousemove', function(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
  cursor.css({
    //カーソルの真ん中に座標軸が来るよう、
    //カーソルの大きさの半分を引きます
    left: mouseX - (cWidth / 2),
    top: mouseY - (cWidth / 2)
  })});

 $(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  });
  
  
  const images = [
  "https://images.unsplash.com/photo-1516663713099-37eb6d60c825?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1527607976958-7cbb4a6d0131?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=3343&q=80",
  ];


 const texts = [
  ["03h30 digital"],
  ["We love motion, interactivity, minimalism and more "],
  ["We make cool websites and webapp"],
  
 ]

 rgbKineticSlider = new rgbKineticSlider({

  slideImages: images, // array of images > must be 1920 x 1080
  itemsTitles: texts, // array of titles / subtitles

  backgroundDisplacementSprite: 'https://kineticslider.com/_demos/rgbKineticSlider/map-3.jpg', // slide displacement image 
  cursorDisplacementSprite: 'https://kineticslider.com/_demos/rgbKineticSlider/map-3.jpg', // cursor displacement image 

  cursorImgEffect : true, // enable cursor img effect
  cursorTextEffect : true, // enable cursor text effect
  cursorScaleIntensity : 0.35, // cursor effect intensity
  cursorMomentum : 0.14, // lower is slower

  swipe: true, // enable swipe
  swipeDistance : window.innerWidth * 0.5, // swipe distance - ex : 580
  swipeScaleIntensity:5, // scale intensity during swipping

  slideTransitionDuration : 0.75, // transition duration
  transitionScaleIntensity : 80, // scale intensity during transition
  transitionScaleAmplitude : 100, // scale amplitude during transition

  nav: true, // enable navigation
  navElement: '.main-nav', // set nav class

  imagesRgbEffect : false, // enable img rgb effect
  // imagesRgbIntensity : 0.9, // set img rgb intensity
  // navImagesRgbIntensity : 80, // set img rgb intensity for regular nav

  textsDisplay : true, // show title
  textsSubTitleDisplay : false, // show subtitles
  textsTiltEffect : true, // enable text tilt
  googleFonts : ['Poppins:700', ''], // select google font to use
  buttonMode : true, // enable button mode for title
  textsRgbEffect : true, // enable text rgb effect
  textsRgbIntensity : 0.05, // set text rgb intensity
  navTextsRgbIntensity : 15, // set text rgb intensity for regular nav

  textTitleColor : 'white', // title color
  textTitleSize : 80, // title size
  mobileTextTitleSize : 80, // title size
  textTitleLetterspacing : 2, // title letterspacing

  // textSubTitleColor : 'white', // subtitle color ex : 0x000000
  // textSubTitleSize : 21, // subtitle size
  // mobileTextSubTitleSize : 14,
  // textSubTitleLetterspacing : 3, // subtitle letter spacing
  // textSubTitleOffsetTop : 90, // subtitle offset top
  // mobileTextSubTitleOffsetTop : 40,
 });

  
  
}
  