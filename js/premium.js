function calculate() {
  // 各選択肢の値を取得
  const classValue = document.getElementById("class1").value;
  const planValue = document.getElementById("plan1").value;
  const timesValue = document.getElementById("times1").value;

  // 保険料と保険金額を初期化
  let premium = 0; // 保険料
  let legalConsultationText1 = "", legalConsultationText2 = "", legalConsultationText3 = "";
  let attorneyFeeText1 = "", attorneyFeeText2 = "", attorneyFeeText3 = "";
  let specialClauseText = "";

  // パターン別に保険料と保険金額を設定
  if (classValue === "1") { // 個人事業主
    if (planValue === "1") { // ライトプラン
      premium = timesValue === "1" ? 4500 : 54000;
      legalConsultationText1 = "5.5万円"; legalConsultationText2 = "2回/年"; legalConsultationText3 = "100％";
      attorneyFeeText1 = "25万円"; attorneyFeeText2 = "2回/年"; attorneyFeeText3 = "100％";      
      specialClauseText = "弁護士費用保険金（報酬金等対応分）不担保特約";
    } else if (planValue === "2") { // スタンダードプラン
      premium = timesValue === "1" ? 11700 : 140400;
      legalConsultationText1 = "5.5万円"; legalConsultationText2 = "2回/年"; legalConsultationText3 = "100％";
      attorneyFeeText1 = "50万円"; attorneyFeeText2 = "2回/年"; attorneyFeeText3 = "100％";
      specialClauseText = "";
    }
  } else if (classValue === "2") { // 法人A
    if (planValue === "1") {
      premium = timesValue === "1" ? 25300 : 303600;
      legalConsultationText1 = "11万円"; legalConsultationText2 = "3回/年"; legalConsultationText3 = "100％";
      attorneyFeeText1 = "300万円"; attorneyFeeText2 = "3回/年"; attorneyFeeText3 = "100％";
      specialClauseText = "弁護士費用保険金（報酬金等対応分）不担保特約";
    } else if (planValue === "2") {
      premium = timesValue === "1" ? 62700 : 752400;
      legalConsultationText1 = "11万円"; legalConsultationText2 = "3回/年"; legalConsultationText3 = "100％";
      attorneyFeeText1 = "600万円"; attorneyFeeText2 = "3回/年"; attorneyFeeText3 = "100％";
      specialClauseText = "";
    }
  } else if (classValue === "3") { // 法人B
    if (planValue === "1") {
      premium = timesValue === "1" ? 21000 : 252000;
      legalConsultationText1 = "11万円"; legalConsultationText2 = "3回/年"; legalConsultationText3 = "100％";
      attorneyFeeText1 = "100万円"; attorneyFeeText2 = "3回/年"; attorneyFeeText3 = "100％";
      specialClauseText = "弁護士費用保険金（報酬金等対応分）不担保特約";
    } else if (planValue === "2") {
      premium = timesValue === "1" ? 51800 : 621600;
      legalConsultationText1 = "11万円"; legalConsultationText2 = "3回/年"; legalConsultationText3 = "100％";
      attorneyFeeText1 = "200万円"; attorneyFeeText2 = "3回/年"; attorneyFeeText3 = "100％";
      specialClauseText = "";
    }
  } else if (classValue === "4") { // 法人C
    if (planValue === "1") {
      premium = timesValue === "1" ? 9000 : 108000;
      legalConsultationText1 = "11万円"; legalConsultationText2 = "3回/年"; legalConsultationText3 = "100％";
      attorneyFeeText1 = "100万円"; attorneyFeeText2 = "3回/年"; attorneyFeeText3 = "100％";
      specialClauseText = "弁護士費用保険金（報酬金等対応分）不担保特約";
    } else if (planValue === "2") {
      premium = timesValue === "1" ? 21800 : 261600;
      legalConsultationText1 = "11万円"; legalConsultationText2 = "3回/年"; legalConsultationText3 = "100％";
      attorneyFeeText1 = "200万円"; attorneyFeeText2 = "3回/年"; attorneyFeeText3 = "100％";
      specialClauseText = "";
    }
  }

  // 結果を表示
  document.getElementById("premium-result").textContent = premium ? `${premium.toLocaleString()}円/${timesValue === "1" ? "月" : "年"}` : "---";

  document.getElementById("legalConsultationText1").textContent = legalConsultationText1 || "---";
  document.getElementById("legalConsultationText2").textContent = legalConsultationText2 || "---";
  document.getElementById("legalConsultationText3").textContent = legalConsultationText3 || "---";

  document.getElementById("attorneyFeeText1").textContent = attorneyFeeText1 || "---";
  document.getElementById("attorneyFeeText2").textContent = attorneyFeeText2 || "---";
  document.getElementById("attorneyFeeText3").textContent = attorneyFeeText3 || "---";

  document.getElementById("special-clause-result").textContent = specialClauseText || "---";
}
