const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

// 1. 初始化 Gemini 客户端
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function runAutoBot() {
    const jsonPath = path.join(__dirname, 'keywords.json');
    const imagesPath = path.join(__dirname, 'images.txt'); // 图片链接文本文档
    
    // 2. 检查词库文件是否存在
    if (!fs.existsSync(jsonPath)) {
        console.error("❌ 未找到 keywords.json 词库文件，流程终止。");
        process.exit(1);
    }
    
    // 3. 读取并解析词库
    let keywords = [];
    try {
        keywords = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    } catch (e) {
        console.error("❌ keywords.json 格式解析错误:", e);
        process.exit(1);
    }
    
    if (keywords.length === 0) {
        console.warn("⚠️ 关键词库已空，请及时补充新选题！");
        return;
    }

    // 4. 提取并准备随机图片链接 (2个)
    let selectedImages = [];
    if (fs.existsSync(imagesPath)) {
        try {
            // 按行读取，并过滤掉空行
            const allImages = fs.readFileSync(imagesPath, 'utf-8')
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);

            if (allImages.length >= 2) {
                // 洗牌算法随机抽取两个不同的图片链接
                const shuffled = allImages.sort(() => 0.5 - Math.random());
                selectedImages = shuffled.slice(0, 2);
                console.log(`🖼️ 成功抽取今日随机图片:\n 1. ${selectedImages[0]}\n 2. ${selectedImages[1]}`);
            } else if (allImages.length === 1) {
                selectedImages = [allImages[0], allImages[0]]; // 只有一张时重复使用
                console.warn("⚠️ images.txt 中只有 1 张图片，两处插图将使用同一张图。");
            }
        } catch (e) {
            console.error("⚠️ 读取 images.txt 失败，本次生成将不带插图:", e);
        }
    } else {
        console.warn("⚠️ 未找到 images.txt，请在根目录下建立该文件，每行放置一个图片链接。");
    }

    // 5. 弹出并消费第一个关键词
    const currentTopic = keywords.shift();
    console.log(`🤖 今日推文选题确定: [ ${currentTopic} ]`);

    // 6. 获取当前日期 (格式: 2026-05-16)
    const todayStr = new Date().toISOString().split('T')[0];
    const randomId = Math.floor(100 + Math.random() * 900); 

    // 7. 构造图片指导 Prompt 片段
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

    // 8. 构造终极 SEO Prompt 模板
    const prompt = `
    你是一个精通技术SEO和前沿网络技术的专家博主。请针对主题 "${currentTopic}" 撰写一篇深入、对用户有极高价值的原创文章。
    
    【重要核心要求】：
    1. 请将本次的主题 "${currentTopic}" 翻译为一个干净、地道、用连字符隔开的【纯英文短语】，作为 URL 的别名（Slug）。
       例如，如果主题是"独立站SEO优化方向"，你可以翻译为 "independent-site-seo-directions"。
    2. 字数严格控制在 1200 - 2000 字之间，多用结构化列表、二级标题（##）、三级标题（###）。
    3. 严格按以下 Markdown 格式输出头部元数据，禁止在最外层包含 \`\`\`markdown 这样的包裹外壳，必须直接以 --- 开头：

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

    try {
        console.log('正在连接 Gemini API 生产高质量内容...');
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const articleContent = response.text;
        if (!articleContent) {
            throw new Error("Gemini 返回内容为空");
        }

        // 9. 本地磁盘文件名
        const fileName = `${todayStr}-post-${randomId}.md`;
        
        // 10. 定位到你真实的本地文章库路径：根目录下的 posts 文件夹
        const outputDir = path.join(__dirname, 'posts'); 
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // 11. 写入文件
        fs.writeFileSync(path.join(outputDir, fileName), articleContent, 'utf-8');
        console.log(`✅ 新文章已成功写入本地磁盘: posts/${fileName}`);

        // 12. 将瘦身后的新词库回写进 json 文件
        fs.writeFileSync(jsonPath, JSON.stringify(keywords, null, 2), 'utf-8');
        console.log(`📉 词库更新完毕！剩余可用关键词数: ${keywords.length}`);

    } catch (error) {
        console.error("❌ 自动化过程遭遇致命错误:", error);
        process.exit(1);
    }
}

runAutoBot();