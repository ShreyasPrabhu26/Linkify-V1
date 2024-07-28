async function getIpInfo(ip_address) {
    const ipServiceEndpoint = `http://ip-api.com/json/${ip_address}`;

    try {
        const response = await fetch(ipServiceEndpoint);

        if (!response.ok) {
            return null;
        }
        const ipInfo = await response.json();
        return ipInfo;

    } catch (error) {
        return null;
    }
}

module.exports = {
    getIpInfo
}