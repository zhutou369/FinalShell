const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

async function runAutoBot() {
    // 1. 检查环境变量中是否存在密钥
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.warn("⚠️ [环境提示] 未检测到 GEMINI_API_KEY 环境密钥。打包阶段跳过生成。");
        return; 
    }

    // 从命令行参数中获取需要生成的文章篇数（例如 node autobot.js 5）
    // 如果没有获取到参数，默认只生成 1 篇作为安全垫
    const args = process.argv.slice(2);
    let maxPosts = parseInt(args[0], 10) || 1;
    console.log(`🤖 收到发文指令，本次任务尝试批量生成: ${maxPosts} 篇文章`);

    // 2. 初始化 Gemini 客户端
    const ai = new GoogleGenAI({ apiKey: apiKey });

    // 🛡️ 【高可用重构】带智能重试机制的 Gemini 內容生成闭包函数
    async function generateContentWithRetry(prompt, maxRetries = 3, initialDelay = 5000) {
        let currentDelay = initialDelay;
        
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                });
            } catch (error) {
                // 兼容解析 SDK 可能返回的不同错误格式（状态码或错误描述文本）
                const is503 = error.status === 503 || (error.message && error.message.includes('503'));
                const is429 = error.status === 429 || (error.message && error.message.includes('429'));
                
                // 如果遇到 503 或 429 错误，并且还没超过最大重试次数，执行原地静默等待
                if ((is503 || is429) && i < maxRetries - 1) {
                    console.warn(`⚠️ [API 波动] 触发 ${is503 ? '503 伺服器拥塞' : '429 请求过多限流'}。`);
                    console.warn(`💤 将在原地静默等待 ${currentDelay / 1000} 秒后进行第 ${i + 1} 次自动尝试...`);
                    
                    // 原地静默等待
                    await new Promise(resolve => setTimeout(resolve, currentDelay));
                    
                    // 指数级退避延长下一次的等待时间（例如：5秒 -> 10秒 -> 20秒）
                    currentDelay *= 2; 
                    continue;
                }
                // 如果是其他致命错误（如 400 认证失效），或 3 次重试机会全部耗尽，则直接抛出异常
                throw error;
            }
        }
    }

    // 文件路径切回标准的 .json 格式
    const jsonPath = path.join(__dirname, 'keywords.json');   
    const imagesPath = path.join(__dirname, 'images.txt'); 
    
    // 3. 检查并读取 JSON 关键词文本
    if (!fs.existsSync(jsonPath)) {
        console.warn("⚠️ 未找到 keywords.json 词库文件，跳过本次生成。");
        return;
    }
    
    let keywords = [];
    try {
        keywords = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    } catch (e) {
        console.error("⚠️ 读取或解析 keywords.json 失败，请检查JSON语法:", e.message);
        return;
    }
    
    if (!Array.isArray(keywords) || keywords.length === 0) {
        console.warn("⚠️ 关键词库为空或格式非数组，请及时补充新选题！");
        return;
    }

    // 调整生成数量：如果输入的数量大于词库剩余词量，以词库剩余数量为准
    if (maxPosts > keywords.length) {
        console.log(`💡 提示：输入的数量 ${maxPosts} 大于词库剩余词量 ${keywords.length}，将生成现存的全部文章. `);
        maxPosts = keywords.length;
    }

    // 🌟 将文章生成的“核心步骤”打包塞入 for 循环，实现批量生成
    for (let currentLoop = 0; currentLoop < maxPosts; currentLoop++) {
        console.log(`\n------------------ 正在处理第 ${currentLoop + 1} / ${maxPosts} 篇 ------------------`);

        // 4. 提取并准备随机图片链接
        let selectedImages = [];
        if (fs.existsSync(imagesPath)) {
            try {
                const allImages = fs.readFileSync(imagesPath, 'utf-8')
                    .split(/\r?\n/)
                    .map(line => line.trim().replace(/^\s*/i, '')) 
                    .filter(line => line.length > 0 && (line.startsWith('/static/images/') || line.startsWith('http')));

                if (allImages.length >= 2) {
                    const shuffled = allImages.sort(() => 0.5 - Math.random());
                    selectedImages = shuffled.slice(0, 2);
                    console.log(`图片配给成功: 1. ${selectedImages[0]} | 2. ${selectedImages[1]}`);
                } else if (allImages.length === 1) {
                    selectedImages = [allImages[0], allImages[0]];
                }
            } catch (e) {
                console.error("⚠️ 读取 images.txt 失败，本篇生成将不带插图:", e.message);
            }
        }

        // 5. 弹出并消费第一个关键词
        const currentTopic = keywords.shift();
        console.log(`当前推文选题确定: [ ${currentTopic} ]`);

        const todayStr = new Date().toISOString().split('T')[0];
        const randomId = Math.floor(100 + Math.random() * 900); 

        // 6. 构造图片指导 Prompt
        let imagePromptInstruction = '';
        if (selectedImages.length === 2) {
            imagePromptInstruction = `
    4. 【插图嵌入要求】：
       请在撰写文章正文时，将以下两个图片链接【严格、自然地】嵌入到不同的二级标题（##）或段落之间，提升排版丰富度。
       必须使用标准的 Markdown 图片格式，且必须补充具有 SEO 价值的 alt 描述（严禁包含中文百分号或特殊字符）。
       
       图片链接 1：${selectedImages[0]}
       图片链接 2：${selectedImages[1]}
       
       例如嵌入格式：![FinalShell 核心功能界面演示](${selectedImages[0]})
            `;
        }

        // 7. 构造终极 SEO Prompt 模板
        const prompt = `
    你是一个熟悉 Linux 运维与 SSH 工具的简体中文技术博主。请针对主题 "${currentTopic}" 撰写一篇原创、可操作的教程文章。
    
    【站点定位】finalshell-cn.com 中文下载站，与 finalshell-ssh.com 内容需有区分，标题勿与常见 pillar 教程雷同。
    
    【重要核心要求】：
    1. 将主题翻译为干净、连字符分隔的【纯英文 slug】作为 URL 别名。
    2. 字数 1200～1800 字，用 ## / ### 分节，至少一节「## 常见问题」。
    3. 正文禁止出现 # 一级标题；直接从段落或 ## 二级标题开始。
    4. 在正文自然插入 2～3 条本站内链（锚文本用中文描述），优先链到：
       /posts/cn-finalshell-official-download-channel/
       /posts/cn-finalshell-windows-install-setup/
       /posts/cn-finalshell-first-server-connection/
       /posts/cn-finalshell-ssh-keypair-login/
       /posts/cn-finalshell-sftp-drag-upload/
       /posts/cn-finalshell-connect-timeout-fix/
    5. 严格按以下 Markdown 头部输出，直接以 --- 开头，禁止 \`\`\`markdown 包裹：

    ---
    title: "${currentTopic}"
    description: "围绕${currentTopic}的实操步骤与注意事项，面向简体中文用户。"
    date: ${todayStr}
    tags: ["参考文章", "FinalShell"]
    generated: true
    layout: "layout.njk"
    permalink: "/posts/${todayStr}-"你的纯英文短语"-${randomId}/index.html"
    ---

    【注意】permalink 中 "你的纯英文短语" 替换为真实 slug，不要保留引号。
    ${imagePromptInstruction}
        `;

        try {
            console.log('正在连接 Gemini API 生产高质量内容...');
            
            // 🔥 【核心修改】替换为带有防塞车、防限流重试机制的生成调用
            const response = await generateContentWithRetry(prompt, 3, 5000);

            const articleContent = response.text;
            if (!articleContent) {
                throw new Error("Gemini 返回内容为空");
            }

            // 为了防止同秒内生成的 randomId 撞车，加上 currentLoop 索引增加唯一性
            const fileName = `${todayStr}-post-${randomId}-${currentLoop}.md`;
            const outputDir = path.join(__dirname, 'posts'); 
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }
            
            fs.writeFileSync(path.join(outputDir, fileName), articleContent, 'utf-8');
            console.log(`✅ 第 ${currentLoop + 1} 篇文章已成功写入本地磁盘: posts/${fileName}`);

        } catch (error) {
            console.error(`❌ 第 ${currentLoop + 1} 篇文章生成遭遇错误:`, error.message);
            // 如果某一篇失败了，把当前错过的词塞回去，防止词库无故丢失
            keywords.unshift(currentTopic);
        }
    }

    // 🌟 当所有的循环全部执行完毕后，再一次性回写成标准的 JSON 数组格式
    try {
        fs.writeFileSync(jsonPath, JSON.stringify(keywords, null, 2), 'utf-8');
        console.log(`\n📉 词库整体更新完毕！剩余可用关键词数: ${keywords.length}`);
    } catch (e) {
        console.error("❌ 回写 keywords.json 失败:", e.message);
    }
}

// 🌟 核心修復：正確閉合 runAutoBot 本體函數並執行調用（移除了多餘的外層大括號）
runAutoBot();
