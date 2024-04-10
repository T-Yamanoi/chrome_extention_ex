export default function getSelectedElement() {
    let selectedElement = window.getSelection().anchorNode.parentElement
    let text = ""

    if (selectedElement.nodeType === Node.TEXT_NODE) {
        text = selectedElement.textContent
    } else {
        text = selectedElement.innerText || selectedElement.textContent
    }

    const elementData = {
        tagName: selectedElement.tagName,
        id: selectedElement.id,
        classList: Array.from(selectedElement.classList).join(' '), 
        text: text
    }
    return elementData
}