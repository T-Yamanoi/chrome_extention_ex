import getSelectedElement from "/libs/getElement.js";

chrome.runtime.onInstalled.addListener(function(){         // トリガー: 拡張機能インストール時

    const parent_menu = chrome.contextMenus.create({ 
        type: "normal",
        id: "parent",
        contexts: ["all"], 
        title: "メニュー"
    })

    chrome.contextMenus.create({
        id: "getSelectedElements",
        title: "URL/DOM 取得",
        contexts: ["all"], 
        parentId: parent_menu,
    })
    chrome.contextMenus.create({
        id: "SelectedElementsDone",
        title: "完了",
        contexts: ["all"], 
        parentId: parent_menu,
    })
})

chrome.contextMenus.onClicked.addListener(async (info) => {  
    if (!info) {
        console.error("メニューアイテムが定義されていません")
        return;
    }

    const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
    if (!tab) {
        console.error("アクティブなタブが見つかりません")
        return;
    }

    if (info.menuItemId === "getSelectedElements") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: getSelectedElement
        }, function(results) {
            const elementsData = results[0].result
            console.log(elementsData)
          //   exportToCSV(elementsData)
        })
    } else if (info.menuItemId === "SelectedElementsDone") {
        console.log("一社の情報を保存しました。")
    }

    // const response = await chrome.tabs.sendMessage(tab.id, {action: "changeBackgroundColor", color: info.menuItemId})
    // console.log(response)
});

