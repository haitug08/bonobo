function calculate() {
  // 各選択肢の値を取得
  const classValue = document.getElementById("class1").value;
  const planValue = document.getElementById("plan1").value;
  const timesValue = document.getElementById("times1").value;

  // 保険料と保険金額を初期化
  let premium = 0; // 保険料
  let legalConsultationText = ""; // 法律相談料保険金テキスト
  let attorneyFeeText = ""; // 弁護士費用保険金テキスト
  let specialClauseText = ""; // 特約テキスト

  // パターン別に保険料と保険金額を設定
  if (classValue === "1") { // 個人事業主
    if (planValue === "1") { // ライトプラン
      premium = timesValue === "1" ? 4500 : 54000; // 月払か年払
      legalConsultationText = "5.5万円・2回/年・基本てん補割合100％";
      attorneyFeeText = "25万円・2回/年・基本てん補割合100％";
      specialClauseText = "弁護士費用保険金（報酬金等対応分）不担保特約・代表者個人補償特約";
    } else if (planValue === "2") { // スタンダードプラン
      premium = timesValue === "1" ? 11700 : 140400;
      legalConsultationText = "5.5万円・2回/年・基本てん補割合100％";
      attorneyFeeText = "50万円・2回/年・基本てん補割合100％";
      specialClauseText = "代表者個人補償特約";
    }
  } else if (classValue === "2") { // 法人A
    if (planValue === "1") {
      premium = timesValue === "1" ? 26500 : 318000;
      legalConsultationText = "11万円・3回/年・基本てん補割合100％";
      attorneyFeeText = "300万円・3回/年・基本てん補割合100％";
      specialClauseText = "弁護士費用保険金（報酬金等対応分）不担保特約・代表者個人補償特約";
    } else if (planValue === "2") {
      premium = timesValue === "1" ? 63900 : 766800;
      legalConsultationText = "11万円・3回/年・基本てん補割合100％";
      attorneyFeeText = "600万円・3回/年・基本てん補割合100％";
      specialClauseText = "代表者個人補償特約";
    }
  } else if (classValue === "3") { // 法人B
    if (planValue === "1") {
      premium = timesValue === "1" ? 22000 : 264000;
      legalConsultationText = "11万円・3回/年・基本てん補割合100％";
      attorneyFeeText = "100万円・3回/年・基本てん補割合100％";
      specialClauseText = "弁護士費用保険金（報酬金等対応分）不担保特約・代表者個人補償特約";
    } else if (planValue === "2") {
      premium = timesValue === "1" ? 52800 : 633600;
      legalConsultationText = "11万円・3回/年・基本てん補割合100％";
      attorneyFeeText = "200万円・3回/年・基本てん補割合100％";
      specialClauseText = "代表者個人補償特約";
    }
  } else if (classValue === "4") { // 法人C
    if (planValue === "1") {
      premium = timesValue === "1" ? 10000 : 120000;
      legalConsultationText = "11万円・3回/年・基本てん補割合100％";
      attorneyFeeText = "100万円・3回/年・基本てん補割合100％";
      specialClauseText = "弁護士費用保険金（報酬金等対応分）不担保特約・代表者個人補償特約";
    } else if (planValue === "2") {
      premium = timesValue === "1" ? 22800 : 273600;
      legalConsultationText = "11万円・3回/年・基本てん補割合100％";
      attorneyFeeText = "200万円・3回/年・基本てん補割合100％";
      specialClauseText = "代表者個人補償特約";
    }
  }

  // 結果を表示
  const premiumResult = document.getElementById("premium-result");
  const legalConsultationResult = document.getElementById("legal-consultation-result");
  const attorneyFeeResult = document.getElementById("attorney-fee-result");
  const specialClauseResult = document.getElementById("special-clause-result");

  if (premium) {
    premiumResult.textContent = `${premium.toLocaleString()}円/${timesValue === "1" ? "月" : "年"}`;
    legalConsultationResult.textContent = legalConsultationText;
    attorneyFeeResult.textContent = attorneyFeeText;
    specialClauseResult.textContent = specialClauseText;
  } else {
    premiumResult.textContent = "---";
    legalConsultationResult.textContent = "---";
    attorneyFeeResult.textContent = "---";
    specialClauseResult.textContent = "---";
  }
}
