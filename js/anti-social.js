$(document).ready(function () {
    $("#kijisuukensaku").on("click", function (event) {
        event.preventDefault(); // デフォルトのリンク動作を防ぐ

        let keyword = $("#keyword").val();
        let suspiciousWords = ["稲川聖城", "山口春吉", "工藤玄治", "上坂仙吉"];
        let found = suspiciousWords.some(word => keyword.includes(word));

        if (found) {
            $("#002").show(); // section#002を表示
            $("#paper_count, #web_count, #blog_count, #overseas_count, #database_count")
                .text(100)
                .css("color", "#ff4d4d"); // 100の文字色を赤に変更
        } else {
            $("#002").hide(); // section#002を非表示
            $("#paper_count, #web_count, #blog_count, #overseas_count, #database_count")
                .text(0)
                .css("color", ""); // デフォルトの色に戻す
        }
    });
});

$(document).ready(function() {
    $("#check_button").click(function() {
        $("#result_url").show(); // URLの表示
    });
});
