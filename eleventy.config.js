module.exports = function(eleventyConfig) {
  
  // 1. 注册日期过滤器 (修复 dateFilter 报错)
  eleventyConfig.addFilter("dateFilter", function(dateValue) {
    if (!dateValue || !(dateValue instanceof Date)) {
      return ""; // 如果没有日期，返回空字符串，不报错
    }
    return dateValue.getFullYear() + "-" + 
           (dateValue.getMonth() + 1).toString().padStart(2, '0') + "-" + 
           dateValue.getDate().toString().padStart(2, '0');
  });

  // 2. 定义并增强 blog 集合逻辑 (支持上下页跳转)
  eleventyConfig.addCollection("blog", function(collectionApi) {
    // 获取 posts 文件夹下的所有 md 文件，并按日期升序排列
    const posts = collectionApi.getFilteredByGlob("./posts/*.md").sort((a, b) => {
      return a.date - b.date;
    });

    // 为每一篇文章手动绑定 prevPost 和 nextPost
    for (let i = 0; i < posts.length; i++) {
      const prevPost = posts[i - 1];
      const nextPost = posts[i + 1];

      // 将找到的关联文章存储到该文章的 data 属性中，供内页模板调用
      posts[i].data.prevPost = prevPost;
      posts[i].data.nextPost = nextPost;
    }

    return posts;
  });

  // 3. 静态资源拷贝配置
  eleventyConfig.addPassthroughCopy("ai1");
  eleventyConfig.addPassthroughCopy("assets");

  // 4. 项目整体配置
  return {
    dir: {
      input: ".",          // 设置根目录为输入
      output: "_site",     // 设置输出目录
      includes: "_includes" // 模板组件目录
    },
    // 强制使用 Nunjucks 渲染，确保 {% for %} 等指令正常解析
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};