const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

// 1. 初始化 Gemini 客户端
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function runAutoBot() {
    const jsonPath = path.join(__dirname, 'keywords.json');
    
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

    // 4. 弹出并消费第一个关键词
    const currentTopic = keywords.shift();
    console.log(`🤖 今日推文选题确定: [ ${currentTopic} ]`);

    // 5. 获取当前日期 (格式: 2026-05-16)
    const todayStr = new Date().toISOString().split('T')[0];
    // 生成一个3位随机数防止极端情况下的链接冲突
    const randomId = Math.floor(100 + Math.random() * 900); 

    // 6. 构造终极 SEO Prompt 模板 (强制 Gemini 吐出英文 Slug 并写入 permalink)
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

    这里开始写文章正文。请多用二级标题（##）、三级标题（###）对内容进行多层级切分，保证极佳的SEO可读性与结构性。
    `;

    try {
        console.log('正在连接 Gemini API 生产高质量内容...');
        // 调用适合高并发、低成本且性能强悍的 gemini-2.5-flash 模型
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const articleContent = response.text;
        if (!articleContent) {
            throw new Error("Gemini 返回内容为空");
        }

        // 7. 本地磁盘文件名：采用 纯数字日期-随机数 组合，绝不包含任何中文、百分号或特殊字符
        const fileName = `${todayStr}-post-${randomId}.md`;
        
        // 8. 定位到你真实的本地文章库路径：根目录下的 posts 文件夹
        const outputDir = path.join(__dirname, 'posts'); 
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // 9. 写入文件
        fs.writeFileSync(path.join(outputDir, fileName), articleContent, 'utf-8');
        console.log(`✅ 新文章已成功写入本地磁盘: posts/${fileName}`);

        // 10. 将瘦身后的新词库回写进 json 文件，确保下次不重复生成
        fs.writeFileSync(jsonPath, JSON.stringify(keywords, null, 2), 'utf-8');
        console.log(`📉 词库更新完毕！剩余可用关键词数: ${keywords.length}`);

    } catch (error) {
        console.error("❌ 自动化过程遭遇致命错误:", error);
        process.exit(1);
    }
}

runAutoBot();