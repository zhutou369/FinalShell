<!DOCTYPE html>
<html lang="zh-Hans" style="background-color: #0f172a; margin: 0; padding: 0;">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>FinalShell 下载 | 官方版</title>
    <style>
        /* 1. 强制消除所有可能的白边 */
        * { box-sizing: border-box; }
        body {
            margin: 0;
            padding: 0;
            background-color: #0f172a !important;
            color: #f1f5f9;
            font-family: sans-serif;
        }

        /* 2. 限制全局容器宽度 */
        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 15px;
        }

        /* 3. 核心修复：强制图片缩放 */
        /* 无论图片原图多大，最高只能占满父容器，且高度自适应 */
        img {
            max-width: 100% !important;
            height: auto !important;
            display: block;
        }

        /* 4. 头部 Banner 图片的“保险箱” */
        .img-shield {
            width: 100%;
            max-width: 800px; /* 锁死最大宽度 */
            margin: 30px auto;
            border-radius: 10px;
            overflow: hidden; /* 超出部分强制切掉 */
            border: 1px solid #334155;
        }

        /* 5. 简单的两栏布局 */
        .main-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
            margin-top: 40px;
        }
        .main-content { flex: 1; min-width: 300px; background: #1e293b; padding: 25px; border-radius: 8px; }
        .sidebar { width: 280px; }

        header { background: #1e293b; padding: 15px 0; border-bottom: 1px solid #334155; }
        .btn { background: #38bdf8; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; }
        
        ul { list-style: none; padding: 0; }
        li { padding: 10px 0; border-bottom: 1px solid #334155; }
        a { color: #38bdf8; text-decoration: none; }

        @media (max-width: 800px) {
            .sidebar { width: 100%; }
            h1 { font-size: 1.5rem; }
        }
    </style>
</head>
<body style="background-color: #0f172a;">

<header>
    <div class="container">
        <strong>FinalShell SSH</strong>
    </div>
</header>

<section style="text-align: center; padding: 40px 0;">
    <div class="container">
        <h1>新一代 SSH 管理工具</h1>
        <p style="color: #94a3b8;">一体化服务器运维平台</p>
        
        <div style="margin: 20px 0;">
            <a href="#" class="btn">Windows 版下载</a>
        </div>

        <div class="img-shield">
            <img src="https://pc1.gtimg.com/guanjia/images/2b/b1/2bb1dee1d6433f1ef0f3a185eeb0d908.jpg" alt="FinalShell 预览">
        </div>
    </div>
</section>

<main class="container">
    <div class="main-wrapper">
        <div class="main-content">
            <h2 style="margin-top: 0;">专业运维必备</h2>
            <p>FinalShell 完美融合了 SSH 终端和 SFTP 客户端，支持多平台同步，提供实时服务器性能监控曲线。</p>
            <div class="img-shield" style="max-width: 100%;">
                <img src="https://pc1.gtimg.com/guanjia/images/2b/b1/2bb1dee1d6433f1ef0f3a185eeb0d908.jpg" alt="界面截图">
            </div>
        </div>

        <aside class="sidebar">
            <h3 style="margin-top: 0;">最新更新</h3>
            <ul>
                {% for post in collections.blog | reverse %}
                <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
                {% else %}
                <li><a href="#">FinalShell 使用教程</a></li>
                <li><a href="#">如何加速 SFTP 传输</a></li>
                <li><a href="#">SSH 安全配置建议</a></li>
                {% endfor %}
            </ul>
        </aside>
    </div>
</main>

<footer style="text-align: center; padding: 40px 0; font-size: 12px; color: #64748b;">
    <p>&copy; 2026 FinalShell SSH 工具. 排版增强版.</p>
</footer>

</body>
</html>