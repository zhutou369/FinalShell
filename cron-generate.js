const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

// 1. 初始化 Gemini 客户端 (从云端环境变量中直接获取 Key)
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

    // 5. 构造强化版深度 SEO Prompt 模板
    const prompt = `
    你是一个精通技术SEO和前沿网络技术的专家博主。请针对主题 "${currentTopic}" 撰写一篇深度原创文章。
    
    严格执行以下要求：
    1. 字数严格控制在 1200 - 2000 字之间，逻辑严密，多用条目化列表。
    2. 严格按以下 Markdown 格式输出头部元数据，禁止在最外层包含 \`\`\`markdown 这样的包裹外壳，直接以 --- 开头：

    ---
    title: "${currentTopic}"
    description: "针对${currentTopic}的专业技术解析与实操指南。"
    date: ${new Date().toISOString().split('T')[0]}
    tags: ["Tech", "SEO", "Automated"]
    layout: "layout.njk"
    ---

    这里开始写文章正文。请多用二级标题（##）、三级标题（###）对内容进行多层级切分，保证极佳的SEO可读性与结构性。
    `;

    try {
        console.log('正在连接 Gemini API 生产高质量内容...');
        // 调用极其适合高并发、低成本且性能强悍的 gemini-2.5-flash 模型
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const articleContent = response.text;
        if (!articleContent) {
            throw new Error("Gemini 返回内容为空");
        }

        // 6. 生成符合 11ty 规范的拼音/英文合规文件名
        const slug = encodeURIComponent(currentTopic.toLowerCase().replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-').replace(/-+/g, '-'));
        const fileName = `${new Date().toISOString().split('T')[0]}-${slug}.md`;
        
        // 7. 定位并写入 11ty 存放文章的目录（这里假设是 src/posts，你可以根据实际模板修改）
        const outputDir = path.join(__dirname, 'src', 'posts'); 
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        fs.writeFileSync(path.join(outputDir, fileName), articleContent, 'utf-8');
        console.log(`✅ 新文章已成功写入: ${fileName}`);

        // 8. 将瘦身后的新词库回写进 json 文件，确保下次不重复生成
        fs.writeFileSync(jsonPath, JSON.stringify(keywords, null, 2), 'utf-8');
        console.log(`📉 词库更新完毕！剩余可用关键词数: ${keywords.length}`);

    } catch (error) {
        console.error("❌ 自动化过程遭遇致命错误:", error);
        process.exit(1);
    }
}

runAutoBot();