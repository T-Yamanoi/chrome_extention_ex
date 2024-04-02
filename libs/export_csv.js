export default function exportToCSV(data) {
    const csvContent = "data:text/csv;charset=utf-8," + data.map(row => Object.values(row).join(',')).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "selected_elements.csv")
    document.body.appendChild(link)
    link.click();
}