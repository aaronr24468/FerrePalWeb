export const cuteText = (stringData) => {
    if (stringData.length > 26) {
        return (stringData.slice(0, 27) + "...")
    }
    return (stringData)
}