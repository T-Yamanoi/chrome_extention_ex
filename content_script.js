console.log("loaded content_script")
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "changeBackgroundColor") {
        console.log("recieved: changeBackgroundColor", message.color)
        document.body.style.backgroundColor = message.color;
        sendResponse({message: "goodbye"})
    }
    else {
        console.error("backgroundとの接続に問題があります。")
    }
});