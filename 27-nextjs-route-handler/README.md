# 27-nextjs-route-handler

## Request Handler

Get Request对象：
```json
{
    "method": "GET",
    "url": "http://localhost:3000/api",
    "headers": {
        "host": "localhost:3000",
        "connection": "keep-alive",
        "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "sec-fetch-site": "none",
        "sec-fetch-mode": "navigate",
        "sec-fetch-user": "?1",
        "sec-fetch-dest": "document",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "zh-CN,zh;q=0.9",
        "x-forwarded-host": "localhost:3000",
        "x-forwarded-port": "3000",
        "x-forwarded-proto": "http",
        "x-forwarded-for": "::1"
    },
    "destination": "",
    "referrer": "about:client",
    "referrerPolicy": "",
    "mode": "cors",
    "credentials": "same-origin",
    "cache": "default",
    "redirect": "follow",
    "integrity": "",
    "keepalive": false,
    "isReloadNavigation": false,
    "isHistoryNavigation": false,
    "signal": {
        "aborted": false
    }
}
```