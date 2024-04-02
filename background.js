chrome.runtime.onInstalled.addListener(function(){         // トリガー: 拡張機能インストール時
  
    const parent_menu = chrome.contextMenus.create({       // 親メニュー作成
        type: "normal",
        id: "parent",
        title: "メニュー"
    })

    chrome.contextMenus.create({
        id: "red",
        parentId: parent_menu,
        title: "RED"
    })

    chrome.contextMenus.create({
        id: "blue",
        parentId: parent_menu,
        title: "BLUE"
    });

    chrome.contextMenus.create({
        id: "yellow",
        parentId: parent_menu,
        title: "YELLOW"
    });
})

chrome.contextMenus.onClicked.addListener(async item => {  
    if (!item) {
        console.error("メニューアイテムが定義されていません");
        return;
    }
    console.log(item.menuItemId)

    const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
    if (!tab) {
        console.error("アクティブなタブが見つかりません");
        return;
    }

    const response = await chrome.tabs.sendMessage(tab.id, {action: "changeBackgroundColor", color: item.menuItemId})

    console.log(response)
});