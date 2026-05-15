<!DOCTYPE html>
<html lang="zh-Hans" style="background-color: #0f172a;">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>FinalShell 官方下载 | 强大的 SSH 客户端</title>
    
    <style>
        /* 1. 全局重置，消除所有顶部白边和默认间距 */
        * { box-sizing: border-box; }
        html, body {
            margin: 0;
            padding: 0;
            background-color: #0f172a !important; 
            color: #f1f5f9;
            font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
            -webkit-font-smoothing: antialiased;
        }

        .container { 
            max-width: 1100px; 
            margin: 0 auto; 
            padding: 0 20px; 
            width: 100%;
        }

        /* 2. 导航栏样式 */
        header { 
            padding: 20px 0; 
            border-bottom: 1px solid rgba(255,255,255,0.1);
            background-color: #1e293b;
        }
        .nav-flex { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
        }
        .logo { font-size: 24px; font-weight: bold; color: #ffffff; }
        .nav-links a { 
            color: #94a3b8; 
            margin-left: 20px; 
            text-decoration: none; 
            font-size: 14px; 
            transition: 0.3s;
        }
        .nav-links a:hover { color: #38bdf8; }

        /* 3. Hero 主横幅：严格限制图片 */
        .hero { 
            text-align: center; 
            padding: 60px 0; 
            background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); 
        }
        .hero h1 { 
            font-size: 2.5rem; 
            color: #ffffff; 
            margin: 0 0 15px 0; 
        }
        .hero p { 
            color: #94a3b8; 
            font-size: 1.1rem; 
            max-width: 600px; 
            margin: 0 auto 30px; 
        }
        
        .hero-img-box { 
            width: 100%; 
            max-width: 850px; 
            margin: 40px auto 0; 
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255,255,255,0.1);
        }
        .hero-img-box img { 
            width: 100%; 
            height: auto; 
            display: block; 
        }

        /* 4. 下载按钮 */
        .btn-group { display: flex; gap: 15px; justify-content: center; }
        .btn { 
            padding: 14px 35px; 
            border-radius: 8px; 
            font-weight: bold; 
            text-decoration: none; 
            font-size: 16px;
        }
        .btn-blue { background-color: #38bdf8; color: #ffffff; }
        .btn-outline { border: 1px solid #38bdf8; color: #38bdf8; }

        /* 5. 核心栅格：修复排版乱 */
        .main-grid { 
            display: flex;
            flex-wrap: wrap;
            gap: 40px; 
            margin-top: 50px; 
            padding-bottom: 80px;
        }
        .article-part { 
            flex: 1;
            min-width: 300px;
            background-color: #1e293b; 
            padding: 35px; 
            border-radius: 12px; 
        }
        .article-part h2 { 
            color: #ffffff; 
            border-left: 4px solid #38bdf8; 
            padding-left: 15px; 
            margin-top: 0;
        }

        .sidebar-part { 
            width: 300px; 
        }
        .sidebar-part h3 { color: #ffffff; margin-top: 0; }
        .post-list { list-style: none; padding: 0; margin: 0; }
        .post-item { 
            padding: 12px 0; 
            border-bottom: 1px solid rgba(255,255,255,0.05); 
        }
        .post-item a { 
            color: #f1f5f9; 
            text-decoration: none; 
            font-size: 14px; 
        }
        .post-item a:hover { color: #38bdf8; }

        /* 响应式适配 */
        @media (max-width: 850px) {
            .sidebar-part { width: 100%; }
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
            <a href="#">更新文章</a>
            <a href="#">下载</a>
        </nav>
    </div>
</header>

<section class="hero">
    <div class="container">
        <h1>强大的 SSH 客户端</h1>
        <p>集成终端、文件管理与系统监控的一站式运维神器</p>
        <div class="btn-group">
            <a href="#" class="btn btn-blue">Windows 下载</a>
            <a href="#" class="btn btn-outline">macOS 下载</a>
        </div>
        <div class="hero-img-box">
            <img src="https://pc1.gtimg.com/guanjia/images/2b/b1/2bb1dee1d6433f1ef0f3a185eeb0d908.jpg" alt="界面预览">
        </div>
    </div>
</section>

<main class="container main-grid">
    <article class="article-part">
        <h2>全能一体化运维</h2>
        <p>FinalShell 完美融合了 SSH 终端和 SFTP 客户端，让你在同一个界面内流转，无需在多个软件间频繁切换，极大提升了工作效率。</p>
        <p>支持多平台（Windows, macOS, Linux），并提供实时服务器性能监控曲线，一眼看穿系统瓶颈。</p>
        <img src="https://pc1.gtimg.com/guanjia/images/2b/b1/2bb1dee1d6433f1ef0f3a185eeb0d908.jpg" style="width:100%; border-radius:8px; margin-top:20px;" alt="功能演示">
    </article>

    <aside class="sidebar-part">
        <h3>最新更新文章</h3>
        <ul class="post-list">
            <li class="post-item"><a href="#">FinalShell 性能优化指南</a></li>
            <li class="post-item"><a href="#">如何安全地管理 SSH 密钥</a></li>
            <li class="post-item"><a href="#">解决终端连接超时的方法</a></li>
            <li class="post-item"><a href="#">SFTP 多线程加速配置教程</a></li>
        </ul>
    </aside>
</main>

<footer style="text-align:center; padding: 50px 0; color:#94a3b8; font-size: 14px;">
    <p>&copy; 2026 FinalShell SSH. 已完成排版兼容性修复。</p>
</footer>

</body>
</html>