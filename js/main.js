
//ハンバーガーメニューがham(X印)を持つかどうかにより、メニューを表示するか、見えなくするか。
function db() {
	if($('#menubar_hdr').hasClass('ham')) {
		$('#menubar').addClass('db');
	} else {
		$('#menubar').removeClass('db');
	}
}


//ハンバーガーメニューをクリックした際の処理
$(function() {
	$('#menubar_hdr').click(function() {
		$(this).toggleClass('ham');
		db();
	});
});


//タイマー
$(function() {
	var timer = false;
	$(window).resize(function() {
		if(timer !== false){
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
		}, 500);
	});
});


//メニュー切り替え処理
$(window).on("load resize", function() {
	setTimeout(function(){

		var winW = window.innerWidth;
		var winBP = 900;	//ブレイクポイント

			//小さな端末用
			if(winW < winBP) {
				$('#menubar').removeClass('pc');
				$('#menubar').addClass('sh');
				db();
				
			//大きな端末用
			} else {
				$('#menubar').removeClass('sh db');
				$('#menubar').addClass('pc');
			}

	}, 100);
});


// 同一ページへのリンクの場合に開閉メニューを閉じる処理
$(function() {
	$('#menubar a[href^="#"]').click(function() {
		$('#menubar').removeClass('db');
		$('#menubar_hdr').removeClass('ham');
	});
});


// 汎用開閉処理
$(function() {
	$('.openclose').next().hide();
	$('.openclose').click(function() {
		$(this).next().slideToggle();
		$('.openclose').not(this).next().slideUp();
	});
});


//pagetop
$(function() {
    var scroll = $('.pagetop');
    var scrollShow = $('.pagetop-show');
        $(scroll).hide();
        $(window).scroll(function() {
            if($(this).scrollTop() >= 300) {
                $(scroll).fadeIn().addClass(scrollShow);
            } else {
                $(scroll).fadeOut().removeClass(scrollShow);
            }
        });
});


//スムーススクロール
$(window).on('load', function() {
	var hash = location.hash;
	if(hash) {
		$('body,html').scrollTop(0);
		setTimeout(function() {
			var target = $(hash);
			var scroll = target.offset().top - 20;
			$('body,html').animate({scrollTop:scroll},500);
		}, 100);
	}
});
$(window).on('load', function() {
    $('a[href^="#"]').click(function() {
        var href = $(this).attr('href');
        var target = href == '#' ? 0 : $(href).offset().top - 80;
            $('body,html').animate({scrollTop:target},500);
            return false;
    });
});


//h2の中に下線用のスタイルを作る
$(function() {
	$('main h2').wrapInner('<span class="uline">');
});

//　ナビの読み込み
$(function(){
        $('#navigation').load('navigation.html'); 
        });


//表示・非表示切り替え
function customCalculate() {
    const selectedOption = document.querySelector('input[name="course"]:checked').value;
    const openElements = document.querySelectorAll(".open01, .open02, .open03, .open04, .open05, .open06, .open07, .open08, .open09, .open10, .open11");

    // すべての要素をフェードアウト（非表示）
    openElements.forEach(element => {
        element.classList.remove("show");
        setTimeout(() => {
            element.style.display = "none"; // 完全に消す
        }, 400); // アニメーション時間に合わせる
    });
	
    // 該当する要素をフェードイン（表示）
    const targetElement = document.querySelector(`.open${selectedOption.slice(-2)}`);
    if (targetElement) {
        targetElement.style.display = "block";
        setTimeout(() => {
            targetElement.classList.add("show");
        }, 10); // 少し遅らせてCSSのトランジションを適用
    }
}


  // 解約手続き内の月末日を取得して表示する関数
  function setEndOfMonth() {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // 月末日
    const formattedDate = `${endOfMonth.getFullYear()}年${endOfMonth.getMonth() + 1}月${endOfMonth.getDate()}日`;
    document.getElementById("termination-date").innerText = formattedDate;
  }

  // ページ読み込み後に月末日を設定
  window.onload = setEndOfMonth;

