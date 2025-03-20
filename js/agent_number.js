        function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        async function fetchAgents() {
            try {
                const response = await fetch("https://asiro-ssi.viewer.kintoneapp.com/public/api/records/agent-number/1");
                if (!response.ok) {
                    throw new Error("データ取得に失敗しました");
                }
                const data = await response.json();
                return data.records;
            } catch (error) {
                console.error("エラー:", error);
                return [];
            }
        }

        async function handleAgentInput() {
            const inputNumber = document.getElementById("ag_number").value.trim();
            const agentNameElement = document.getElementById("agent_name");
            const agentAddressElement = document.getElementById("agent_address");

            if (inputNumber === "") {
                agentNameElement.textContent = "";
                agentAddressElement.textContent = "";
                return;
            }

            const records = await fetchAgents();
            const matchedAgent = records.find(record => record.Agency_No.value === inputNumber);

            if (matchedAgent) {
                agentNameElement.textContent = matchedAgent.Agency_Name1.value;
                agentAddressElement.textContent = matchedAgent.Address1_FULL.value;
            } else {
                agentNameElement.textContent = "該当する代理店が見つかりません";
                agentAddressElement.textContent = "";
            }
        }

        window.onload = function () {
            let agencyNumber = getQueryParam("agency_no");
            if (!agencyNumber) {
                agencyNumber = "AG9999";
            }
            document.getElementById("ag_number").value = agencyNumber;
            handleAgentInput();
        };
