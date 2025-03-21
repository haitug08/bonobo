$(document).ready(function () {
    function handleAgentInput() {
        let keyword = $("#keyword").val();
        let suspiciousWords = ["稲川聖城", "山口春吉", "工藤玄治", "上坂仙吉"];
        let found = suspiciousWords.some(word => keyword.includes(word));

        if (found) {
            $("#002").show(); // section#002を表示
            $("#paper_count, #web_count, #blog_count, #overseas_count, #database_count").text(100); // カウントを100に変更
        } else {
            $("#002").hide(); // section#002を非表示
            $("#paper_count, #web_count, #blog_count, #overseas_count, #database_count").text(0); // カウントを0にリセット
        }
    }

    $("#keyword").on("input", handleAgentInput);
});
