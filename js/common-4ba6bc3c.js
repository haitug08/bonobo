const followNav = document.querySelector('.follow-nav');
let lastScrollY = window.scrollY;

// トップページかどうかを判定（"/" または "/index.html" の場合）
const isTopPage = window.location.pathname === "/" || window.location.pathname.endsWith("/index.html");

if (isTopPage) {
  // トップページならスクロールでナビを出す
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      followNav.classList.add('show');
    } else {
      followNav.classList.remove('show');
    }

    lastScrollY = currentScrollY; // 現在のスクロール位置を更新
  });
} else {
  // トップページ以外ならナビを常に表示
  followNav.classList.add('show');
}

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-cont");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabIndex = tab.getAttribute("data-tab");

      // タブのアクティブクラス切り替え
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // コンテンツのフェード切り替え
      contents.forEach(content => {
        if (content.classList.contains(`tab-cont-${tabIndex}`)) {
          content.style.display = "block";
          requestAnimationFrame(() => {
            requestAnimationFrame(() => content.classList.add("active"));
          });
        } else {
          content.classList.remove("active");
          setTimeout(() => content.style.display = "none", 500);
        }
      });
    });
  });
});

// フォームのselect要素の「選択してください」の文字
function Color(sample){
  if( sample.value == 0 ){
   sample.style.color = '';
  }else{
   sample.style.color = '#000';
  }
 }

 document.addEventListener("DOMContentLoaded", function () {
  const oya = document.querySelector(".tab-content");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const contents = {
    a: document.querySelector(".tab-cont-a"),
    b: document.querySelector(".tab-cont-b"),
    c: document.querySelector(".tab-cont-c"),
  };

  function updateHeight(activeTab) {
    if (contents[activeTab] && oya) {
      oya.style.height = `${contents[activeTab].offsetHeight}px`;
    }
  }

  // 初回ロード時に高さを設定
  updateHeight("a");

  // タブクリック時に高さを更新
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const activeTab = btn.getAttribute("data-tab");
      setTimeout(() => updateHeight(activeTab), 100); // 遅延を入れることで高さの反映を確実にする
    });
  });

  // ウィンドウリサイズ時にも高さを再計算
  window.addEventListener("resize", function () {
    const activeTab = document.querySelector(".tab-btn.active").getAttribute("data-tab");
    updateHeight(activeTab);
  });
});


 // モーダルウィンドウ
$(function() {
  $('.js-modal-open').on('click', function(event) {
    event.preventDefault(); // ページ上部に戻らないようにする
    var target = $(this).data('modal');
    var modal = $('#' + target);
    modal.addClass('is-active');

    // ラジオボタンの required を一時的に解除
    $('input[name="history"]').removeAttr('required');
  });

  // モーダルを閉じる処理
  $('.js-modal-close').on('click', function() {
    $(this).closest('.modal').removeClass('is-active');
  });

  // モーダル外をクリックした際に閉じる処理
  $(document).on('click', function(event) {
    if ($(event.target).hasClass('modal')) {
      $(event.target).removeClass('is-active');
    }
  });

  // 「同意する」ボタンの処理
  $('.agree-btn').on('click', function(event) {
    event.preventDefault(); // ページ上部に戻らないようにする
    var modal = $(this).closest('.modal');
    modal.removeClass('is-active');

    // モーダルを開いたボタンのテキストとスタイルを変更
    var openButton = $('.js-modal-open[data-modal="' + modal.attr('id') + '"]');
    openButton.text('確認済み').css({
      'background-color': 'gray',
      'cursor': 'pointer'
    }).addClass('checked'); // 確認済みのマークを追加
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form"); // フォーム要素
  const submitButtons = document.querySelectorAll('button[type="submit"]');

  submitButtons.forEach((submitButton) => {
    submitButton.addEventListener('click', function(event) {
      let isValid = true; // フォーム送信可能かどうか
      const invalidFields = []; // 無効なフィールドを格納
  
      // 2. モーダルボタンのバリデーション (Constraint Validation API)
      $('.js-modal-open').each(function() {
        if (!$(this).hasClass('checked')) {
          isValid = false;
          invalidFields.push(this); // 無効なフィールドとして追加
  
          // 既にエラーメッセージがない場合のみ追加
          if (!$(this).next('.modal-error-message').length) {
            $(this).after('<p class="modal-error-message" style="color: red; font-size: 12px;">内容を確認してください。</p>');
          }
        } else {
          // 確認済みならエラーメッセージを削除
          $(this).next('.modal-error-message').remove();
        }
      });
  
      // 3. Constraint Validation API を使ってエラー表示
      if (!isValid) {
        event.preventDefault(); // フォーム送信を防ぐ
  
        // 最初の無効なフィールドにフォーカスを当てる
        if (invalidFields.length > 0) {
          invalidFields[0].focus();
        }
      }
    });
  })  

  // モーダルウィンドウの処理
  $('.js-modal-open').on('click', function(event) {
    event.preventDefault();
    var target = $(this).data('modal');
    $('#' + target).addClass('is-active');
  });

  $('.js-modal-close').on('click', function() {
    $(this).closest('.modal').removeClass('is-active');
  });

  $('.agree-btn').on('click', function(event) {
    event.preventDefault();
    var modal = $(this).closest('.modal');
    modal.removeClass('is-active');

    var openButton = $('.js-modal-open[data-modal="' + modal.attr('id') + '"]');
    openButton.text('確認済み').css({
      'background-color': 'gray',
      'cursor': 'pointer'
    }).addClass('checked'); // 確認済みのマークを追加
  });

  $(document).on('click', function(event) {
    if ($(event.target).hasClass('modal')) {
      $(event.target).removeClass('is-active');
    }
  });
});