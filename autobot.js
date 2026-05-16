const fs = require('fs');
const path = require('path');

async function runAutoBot() {
    // 1. 检查环境变量中是否存在密钥
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.warn("⚠️ [环境提示] 未检测到 GEMINI_API_KEY 环境密钥。如果你当前处于云端阶段，此属正常现象。脚本已自动跳过生成。");
        return; 
    }

    const txtPath = path.join(__dirname, 'keywords.txt');   
    const imagesPath = path.join(__dirname, 'images.txt'); 
    
    // 3. 检查并读取关键词文本
    if (!fs.existsSync(txtPath)) {
        console.warn("⚠️ 未找到 keywords.txt 词库文件，跳过本次生成。");
        return;
    }
    
    let keywords = [];
    try {
        keywords = fs.readFileSync(txtPath, 'utf-8')
            .split(/\r?\n/)
            .map(line => line.trim().replace(/^["']|["']$/g, ''))
            .filter(line => line.length > 0 && !line.startsWith('[source')); 
    } catch (e) {
        console.error("⚠️ 读取 keywords.txt 失败:", e.message);
        return;
    }
    
    if (keywords.length === 0) {
        console.warn("⚠️ 关键词库已空，请及时补充新选题！");
        return;
    }

    // 4. 提取并准备随机图片链接
    let selectedImages = [];
    if (fs.existsSync(imagesPath)) {
        try {
            const allImages = fs.readFileSync(imagesPath, 'utf-8')
                .split(/\r?\n/)
                .map(line => line.trim().replace(/^\\s*/i, '')) 
                .filter(line => line.length > 0 && line.startsWith('http'));

            if (allImages.length >= 2) {
                const shuffled = allImages.sort(() => 0.5 - Math.random());
                selectedImages = shuffled.slice(0, 2);
                console.log(`🖼️ 成功抽取今日随机图片:\n 1. ${selectedImages[0]}\n 2. ${selectedImages[1]}`);
            } else if (allImages.length === 1) {
                selectedImages = [allImages[0], allImages[0]];
            }
        } catch (e) {
            console.error("⚠️ 读取 images.txt 失败，本次生成将不带插图:", e.message);
        }
    }

    // 5. 弹出并消费第一个关键词
    const currentTopic = keywords.shift();
    console.log(`🤖 今日推文选题确定: [ ${currentTopic} ]`);

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
    你是一个精通技术SEO和前沿网络技术的专家博主。请针对主题 "${currentTopic}" 撰写一篇深入、对用户有极高价值的原创文章。
    
    【重要核心要求】：
    1. 请将本次的主题 "${currentTopic}" 翻译为一个干净、地道、用连字符隔开的【纯英文短语】，作为 URL 的别名（Slug）。
    2. 字数严格控制在 1200 - 2000 字之间，多用结构化列表、二级标题（##）、三级标题（###）。
    3. 严格按以下 Markdown 格式输出头部元数据，禁止在最外层包含 \`\`\`markdown 包裹外壳，必须直接以 --- 开头：

    ---
    title: "${currentTopic}"
    description: "针对${currentTopic}的专业技术解析与实操指南。"
    date: ${todayStr}
    tags: ["posts", "SEO"]
    layout: "layout.njk"
    permalink: "/posts/${todayStr}-"你的纯英文短语"-${randomId}/index.html"
    ---

    【注意】：请务必将上面 permalink 里面的 "你的纯英文短语" 替换为你真正翻译出来的英文 Slug。不要保留引号。
    ${imagePromptInstruction}

    这里开始写文章正文。请多用二级标题（##）、三级标题（###）对内容进行多层级切分，保证极佳的SEO可读性与结构性。
    `;

    // 8. 使用标准原生 Fetch 绕过 SDK 的 v1beta 404 顽疾并调用 1.5-flash
    try {
        console.log('正在连接稳定版 Gemini API 生产高质量内容...');
        
        // 强行使用官方 v1 稳定版端点 + gemini-1.5-flash
        const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
        
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await res.json();

        if (data.error) {
            throw new Error(`API 返回错误: ${data.error.message}`);
        }

        const articleContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!articleContent) {
            throw new Error("Gemini 返回的文本结构为空，请检查配额或网络");
        }

        const fileName = `${todayStr}-post-${randomId}.md`;
        const outputDir = path.join(__dirname, 'posts'); 
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        fs.writeFileSync(path.join(outputDir, fileName), articleContent, 'utf-8');
        console.log(`✅ 新文章已成功写入本地磁盘: posts/${fileName}`);

        // 将剩余的关键词重新按行拼接，回写进 txt 文件
        fs.writeFileSync(txtPath, keywords.join('\n'), 'utf-8');
        console.log(`📉 词库更新完毕！剩余可用关键词数: ${keywords.length}`);

    } catch (error) {
        console.error("❌ 自动化过程遭遇致命错误:", error.message);
    }
}

runAutoBot();