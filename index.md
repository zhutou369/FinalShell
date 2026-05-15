<!DOCTYPE html>
<html lang="zh-Hans">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>FinalShell 官方下载 | 强大的 SSH 客户端</title>
    
    <style>
        /* 1. 彻底解决白屏：在最顶部强制定义颜色 */
        :root {
            --bg-deep: #0f172a;
            --bg-main: #1e293b;
            --accent: #38bdf8;
            --text-main: #f1f5f9;
            --text-dim: #94a3b8;
        }

        html, body {
            margin: 0;
            padding: 0;
            background-color: #0f172a !important; /* 强制背景 */
            color: #f1f5f9;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6;
        }

        .container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }

        /* 2. 导航栏修复 */
        header { 
            padding: 20px 0; 
            border-bottom: 1px solid rgba(255,255,255,0.1);
            background: #1e293b; 
        }
        .nav-flex { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 22px; font-weight: bold; color: #fff; }
        .nav-links a { color: var(--text-dim); margin-left: 20px; text-decoration: none; font-size: 14px; }

        /* 3. Hero 区域 & 图片大小锁定 */
        .hero { text-align: center; padding: 60px 0; background: linear-gradient(to bottom, #1e293b, #0f172a); }
        .hero h1 { font-size: 2.5rem; color: #fff; margin-bottom: 10px; }
        .hero p { color: var(--text-dim); margin-bottom: 30px; }
        
        .hero-img-wrapper { 
            width: 100%; 
            max-width: 800px; 
            margin: 40px auto 0; 
            overflow: hidden;
            border-radius: 12px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .hero-img-wrapper img { 
            width: 100%; 
            height: auto; 
            display: block; /* 解决图片下方间隙 */
        }

        /* 4. 下载按钮 */
        .btn-group { display: flex; gap: 15px; justify-content: center; }
        .btn { 
            padding: 12px 35px; 
            border-radius: 6px; 
            font-weight: bold; 
            text-decoration: none; 
            transition: 0.3s;
        }
        .btn-blue { background: var(--accent); color: #fff; }
        .btn-outline { border: 1px solid var(--accent); color: var(--accent); }

        /* 5. 主内容栅格 */
        .main-grid { 
            display: grid; 
            grid-template-columns: 1fr 300px; 
            gap: 40px; 
            margin-top: 50px; 
            padding-bottom: 80px;
        }
        .article-card { background: var(--bg-main); padding: 30px; border-radius: 12px; }
        .article-card h2 { color: #fff; border-left: 4px solid var(--accent); padding-left: 15px; }

        /* 6. 侧边栏 */
        .sidebar h3 { color: #fff; font-size: 18px; }
        .post-list { list-style: none; padding: 0; }
        .post-item { padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .post-item a { color: var(--text-main); text-decoration: none; font-size: 14px; }

        @media (max-width: 850px) {
            .main-grid { grid-template-columns: 1fr; }
            .hero h1 { font-size: 2rem; }
        }
    </style>
</head>
<body>

<header>
    <div class="container nav-flex">
        <div class="logo">FinalShell SSH</div>
        <nav class="nav-links">
            <a href="#">特性</a>
            <a href="#">文档</a>
            <a href="#">下载</a>
        </nav>
    </div>
</header>

<section class="hero">
    <div class="container">
        <h1>新一代 SSH 管理工具</h1>
        <p>集成终端模拟、系统监控、文件管理于一体的高性能运维平台</p>
        <div class="btn-group">
            <a href="/dows" class="btn btn-blue">Windows 下载</a>
            <a href="/dows" class="btn btn-outline">macOS 下载</a>
        </div>
        <div class="hero-img-wrapper">
            <img src="https://pc1.gtimg.com/guanjia/images/2b/b1/2bb1dee1d6433f1ef0f3a185eeb0d908.jpg" alt="界面预览">
        </div>
    </div>
</section>

<main class="container main-grid">
    <article class="article-card">
        <h2>为什么选择 FinalShell？</h2>
        <p>FinalShell 是一款一体化的服务器网络管理软件，不仅是 SSH 客户端，更是强大的开发运维助手。</p>
        <p>它完美融合了 SSH 终端和 SFTP 客户端，让你在同一个界面内完成所有操作，无需在多个软件间频繁切换。</p>
        <img src="https://pc1.gtimg.com/guanjia/images/2b/b1/2bb1dee1d6433f1ef0f3a185eeb0d908.jpg" style="width:100%; border-radius:8px; margin-top:20px;">
    </article>

    <aside class="sidebar">
        <h3>最新技术动态</h3>
        <ul class="post-list">
            <li class="post-item"><a href="#">FinalShell v4.0 更新说明</a></li>
            <li class="post-item"><a href="#">如何配置 SSH 密钥登录</a></li>
            <li class="post-item"><a href="#">提升 SFTP 传输速度的技巧</a></li>
        </ul>
    </aside>
</main>

<footer style="text-align:center; padding: 40px; color:var(--text-dim); font-size: 14px;">
    <p>&copy; 2026 FinalShell SSH. 纯净版排版修复。</p>
</footer>

</body>
</html>