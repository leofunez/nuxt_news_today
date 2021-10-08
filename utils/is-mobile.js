const isMobile = () => {
    if (typeof window !== "undefined") {
        return (
            window.navigator.userAgent.toLowerCase().indexOf("mobile") !== -1
        )
    }
    return false
}

export default isMobile