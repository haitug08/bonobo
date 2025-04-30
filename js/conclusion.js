(function () {
  'use strict';

  kintone.events.on('app.record.detail.show', function () {
    if (document.getElementById('copy-button') || document.getElementById('summary-button')) return;

    const space = kintone.app.record.getSpaceElement('btn_01');
    if (!space) return;

    const createButton = (id, label, color) => {
      const btn = document.createElement('button');
      btn.id = id;
      btn.innerText = label;
      btn.style.margin = "10px";
      btn.style.padding = "5px 15px";
      btn.style.backgroundColor = color;
      btn.style.color = "#fff";
      btn.style.border = "none";
      btn.style.borderRadius = "5px";
      btn.style.cursor = "pointer";
      return btn;
    };

    const copyBtn = createButton('copy-button', '締め処理', '#0090B0');
    const summaryBtn = createButton('summary-button', '集計処理', '#2A9D8F');
    space.appendChild(copyBtn);
    space.appendChild(summaryBtn);

    // App IDs
    const app132 = 132;
    const app147 = 147;
    const app148 = 148;
    const app149 = 149;

    // コピー処理
    copyBtn.onclick = async function () {
      try {
        const thisId = kintone.app.record.getId();
        const current = await kintone.api(kintone.api.url('/k/v1/record', true), 'GET', {
          app: app148,
          id: thisId
        });

        const closingDate = current.record.ag_payment_date.value;
        const closingText = current.record.Closing_date.value;

        if (!closingDate || !closingText) {
          alert('締め日または締め内容が未入力です');
          return;
        }

        const query = 'Deposit_status in ("入金済") and ag_payment_date = "" and Closing_date = ""';
        const res = await kintone.api(kintone.api.url('/k/v1/records', true), 'GET', {
          app: app132,
          query,
          fields: [
            'Premium_API', 'Paymentduedate', 'Number_of_Payments_API', 'Deposit_status', 'Deposit_date',
            'PaymentMethod_API', 'InsuranceID_API', 'Contractor', 'start_benefit', 'start_date', 'end_date',
            'CompanyDivision_API', 'Plan_API', 'ag_number', 'ag_name', 'agency_fee',
            'storage_information_id', 'Mypage_login_Email', 'AG_login_Email'
          ]
        });

        if (!res.records.length) {
          alert('コピー対象レコードがありません');
          return;
        }

        const fields = [
          'Premium_API', 'Paymentduedate', 'Number_of_Payments_API', 'Deposit_status', 'Deposit_date',
          'PaymentMethod_API', 'InsuranceID_API', 'Contractor', 'start_benefit', 'start_date', 'end_date',
          'CompanyDivision_API', 'Plan_API', 'ag_number', 'ag_name', 'agency_fee',
          'storage_information_id', 'Mypage_login_Email', 'AG_login_Email'
        ];

        const newRecs = res.records.map(record => {
          const rec = {};
          fields.forEach(field => {
            rec[field] = { value: record[field]?.value ?? null };
          });
          return rec;
        });

        while (newRecs.length) {
          await kintone.api(kintone.api.url('/k/v1/records', true), 'POST', {
            app: app147,
            records: newRecs.splice(0, 100)
          });
        }

        // 更新処理（元と先）
        const storageIds = res.records.map(r => r.storage_information_id.value);

        const updateRecords = async (appId) => {
          const batchSize = 100;
          for (let i = 0; i < storageIds.length; i += batchSize) {
            const quote = str => `"${str.replace(/"/g, '\\"')}"`;
            const ids = storageIds.slice(i, i + batchSize).map(id => `"${id}"`).join(',');
            const query = `storage_information_id in (${ids})`;
            const result = await kintone.api(kintone.api.url('/k/v1/records', true), 'GET', {
              app: appId,
              query,
              fields: ['$id']
            });

            const updates = result.records.map(r => ({
              id: r.$id.value,
              record: {
                ag_payment_date: { value: closingDate },
                Closing_date: { value: closingText }
              }
            }));

            while (updates.length) {
              await kintone.api(kintone.api.url('/k/v1/records', true), 'PUT', {
                app: appId,
                records: updates.splice(0, 100)
              });
            }
          }
        };

        await updateRecords(app132);
        await updateRecords(app147);

        alert('レコードコピー完了＆締め情報更新');
      } catch (err) {
        console.error(err);
        alert('コピー中にエラーが発生しました');
      }
    };

    // 集計処理
    summaryBtn.onclick = async function () {
      try {
        const thisId = kintone.app.record.getId();
        const current = await kintone.api(kintone.api.url('/k/v1/record', true), 'GET', {
          app: app148,
          id: thisId
        });

        const closingDate = current.record.ag_payment_date.value;
        const closingText = current.record.Closing_date.value;

        const res = await kintone.api(kintone.api.url('/k/v1/records', true), 'GET', {
          app: app147,
          query: `ag_payment_date = "${closingDate}" and Closing_date = "${closingText}"`,
          fields: ['ag_number', 'ag_name', 'AG_login_Email', 'Premium_API', 'agency_fee']
        });

        const summaryMap = {};
        res.records.forEach(rec => {

          console.log('集計対象レコード:', rec); 

          const agNum = rec.ag_number?.value;
          if (!agNum) return;
          if (!summaryMap[agNum]) {
            summaryMap[agNum] = {
              count: 0,
              total_premium: 0,
              total_fee: 0,
              ag_name: rec.ag_name?.value || '',
              AG_login_Email: rec.AG_login_Email?.value || ''
            };
          }
          summaryMap[agNum].count += 1;
          summaryMap[agNum].total_premium += Number(rec.Premium_API?.value ?? 0);
          summaryMap[agNum].total_fee += Number(rec.agency_fee?.value ?? 0);
        });

          const summaryRecords = Object.entries(summaryMap).map(([ag_number, data]) => {
            return {
              ag_number: { value: ag_number },
              ag_name: { value: data.ag_name },
              AG_login_Email: { value: data.AG_login_Email },
              ag_payment_date: { value: closingDate },
              Closing_date: { value: closingText },
              record_count: { value: data.count },
              total_premium: { value: data.total_premium },
              total_fee: { value: data.total_fee }
            };
          });

        if (summaryRecords.length === 0) {
          alert('集計対象のデータがありません');
          return;
        }

        await kintone.api(kintone.api.url('/k/v1/records', true), 'POST', {
          app: app149,
          records: summaryRecords
        });

        const agNumbers = Object.keys(summaryMap);
        const batchSize = 100;
        for (let i = 0; i < agNumbers.length; i += batchSize) {
          const batchAgNums = agNumbers.slice(i, i + batchSize).map(n => `"${n}"`).join(',');
          const agencyQuery = `Agency_No in (${batchAgNums})`;

          const agencyRes = await kintone.api(kintone.api.url('/k/v1/records', true), 'GET', {
            app: 46,
            query: agencyQuery,
            fields: ['Agency_No', 'corporate_number', 'Bank_Cord', 'Branch_Cord', 'Bank_Name', 'Branch_Name', 'Deposit_type', 'Account_Number', 'Account_holder2']
          });

          const corpMap = {};
          agencyRes.records.forEach(rec => {
            corpMap[rec.Agency_No.value] = {
              corporate_number: rec.corporate_number?.value || '',
              Bank_Cord: rec.Bank_Cord?.value || '',
              Branch_Cord: rec.Branch_Cord?.value || '',
              Bank_Name: rec.Bank_Name?.value || '',
              Branch_Name: rec.Branch_Name?.value || '',
              Deposit_type: rec.Deposit_type?.value || '',
              Account_Number: rec.Account_Number?.value || '',
              Account_holder2: rec.Account_holder2?.value || ''
            };
          });

          // 149のレコードIDを取得して corporate_number をセット
          const summaryRes = await kintone.api(kintone.api.url('/k/v1/records', true), 'GET', {
            app: app149,
            query: `ag_payment_date = "${closingDate}" and Closing_date = "${closingText}"`,
            fields: ['$id', 'ag_number']
          });

          const updates = summaryRes.records
            .filter(r => corpMap[r.ag_number?.value])
            .map(r => ({
              id: r.$id.value,
              record: {
                corporate_number: { value: corpMap[r.ag_number.value].corporate_number },
                Bank_Cord: { value: corpMap[r.ag_number.value].Bank_Cord },
                Branch_Cord: { value: corpMap[r.ag_number.value].Branch_Cord },
                Bank_Name: { value: corpMap[r.ag_number.value].Bank_Name },
                Branch_Name: { value: corpMap[r.ag_number.value].Branch_Name },
                Deposit_type: { value: corpMap[r.ag_number.value].Deposit_type },
                Account_Number: { value: corpMap[r.ag_number.value].Account_Number },
                Account_holder2: { value: corpMap[r.ag_number.value].Account_holder2 }
              }
            }));

          while (updates.length) {
            await kintone.api(kintone.api.url('/k/v1/records', true), 'PUT', {
              app: app149,
              records: updates.splice(0, 100)
            });
          }
        }
                alert('代理店別の集計レコードを作成しました');
              } catch (err) {
                console.error(err);
                alert('集計処理中にエラーが発生しました');
              }
            };

    const exportBtn = createButton('export-button', '振込用ファイル出力', '#F4A261');
    space.appendChild(exportBtn);

    exportBtn.onclick = async function () {
      try {
        const thisId = kintone.app.record.getId();
        const current = await kintone.api(kintone.api.url('/k/v1/record', true), 'GET', {
          app: app148,
          id: thisId
        });

        const closingDate = current.record.ag_payment_date.value;
        const closingText = current.record.Closing_date.value;

        const summaryRes = await kintone.api(kintone.api.url('/k/v1/records', true), 'GET', {
          app: app149,
          query: `ag_payment_date = "${closingDate}" and Closing_date = "${closingText}"`,
          fields: ['corporate_number', 'Bank_Cord', 'Bank_Name', 'Branch_Cord', 'Branch_Name', 'Deposit_type', 'Account_Number', 'Account_holder2', 'total_premium','total_fee_including_tax']
        });

        if (!summaryRes.records.length) {
          alert('出力対象の集計データがありません');
          return;
        }

        // フォーマット用関数
        const padRight = (str, length) => (str ?? '').padEnd(length, ' ').substring(0, length);
        const padLeftZero = (str, length) => (str ?? '').toString().padStart(length, '0').slice(-length);

        const rows = [];

        // ヘッダー
        const header = ''
          + '1'
          + '21'
          + '0'
          + padLeftZero('9891049959', 10)
          + padRight('ｶ)ｱｼﾛｼﾖｳｶﾞｸﾀﾝｷﾎｹﾝ', 40)
          + (closingDate ? closingDate.substr(5,2) + closingDate.substr(8,2) : '0000') 
          + padLeftZero('0001', 4)
          + padRight('               ', 15)
          + padLeftZero('066', 3)
          + padRight('               ', 15)
          + '1'
          + padLeftZero('4358840', 7)
          + padRight('', 17);
        rows.push(header);

        let totalAmount = 0;

        // データレコード
        summaryRes.records.forEach(rec => {
          const amount = Number(rec.total_fee_including_tax?.value ?? 0);
          totalAmount += amount;

          const dataRow = ''
            + '2'
            + padLeftZero(rec.Bank_Cord?.value, 4)
            + padRight('', 15)
            + padLeftZero(rec.Branch_Cord?.value, 3)
            + padRight('', 15) 
            + '0000'
            + padLeftZero(rec.Deposit_type.value === '普通' ? '1' : '2', 1)
            + padLeftZero(rec.Account_Number?.value, 7) 
            + padRight(rec.Account_holder2?.value, 30) 
            + padLeftZero(rec.total_fee_including_tax?.value, 10)
            + '0'
            + '          '
            + '          '
            + '7'
            + ' '
            + padRight('', 7);
          rows.push(dataRow);
        });

        // トレーラレコード
        const trailer = ''
          + '8'
          + padLeftZero(summaryRes.records.length, 6) 
          + padLeftZero(totalAmount, 12) 
          + padRight('', 101);
        rows.push(trailer);

        // エンドレコード
        const endRecord = ''
          + '9'
          + padRight('', 119);
        rows.push(endRecord);

        // 1行ずつCRLFで区切る
        const fileContent = rows.join('\r\n');

        // ダウンロード処理
        const blob = new Blob([fileContent], { type: 'text/plain;charset=Shift_JIS' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `振込データ_${closingDate}.txt`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

      } catch (err) {
        console.error(err);
        alert('ファイル出力中にエラーが発生しました');
      }
    };
  });
})();
