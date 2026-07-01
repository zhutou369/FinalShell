const fs = require("fs");
const siteData = require("./_data/site.json");

const systemTags = new Set(["all", "nav", "post", "posts", "blog", "indexableposts", "homepageposts", "seo"]);

function assetVersion() {
  return siteData.assetVersion || "1";
}

function cacheBustStaticUrl(url) {
  const value = String(url || "").trim();
  if (!value.startsWith("/static/")) return value;
  if (/[?&]v=/.test(value)) return value;
  return `${value}?v=${assetVersion()}`;
}

function isPostIndexable(data, inputPath) {
  if (data.noindex === true) return false;
  if (data.featured === true) return true;
  if (data.generated === true) return false;

  const filePath = inputPath || "";
  if (/\d{4}-\d{2}-\d{2}-post-\d+-\d+\.md$/i.test(filePath)) return false;

  const title = data.title || "";
  const description = data.description || "";
  const tags = Array.isArray(data.tags) ? data.tags : [];

  if (/官方权威|站群|SEO优化|友链|跨境流量|全攻略|产业智能|不二之选|业界领先/.test(title)) return false;
  if (/SEO优化|自动检测|狂降\d+%/.test(title)) return false;
  if (/小伙伴们注意|手把手教你|个人开发者项目，由社区驱动/.test(description)) return false;
  if (tags.some((t) => String(t).toLowerCase() === "seo")) return false;

  if (/\/posts\/cn-finalshell-[a-z0-9-]+\.md$/i.test(filePath)) return true;

  return false;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("CONTENT-LINK-RULES.md");
  eleventyConfig.ignores.add("tools/**");

  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("images.txt");
  eleventyConfig.addPassthroughCopy({ "_headers": "_headers" });
  eleventyConfig.addPassthroughCopy("ai1");
  if (fs.existsSync("BingSiteAuth.xml")) {
    eleventyConfig.addPassthroughCopy("BingSiteAuth.xml");
  }
  for (const name of fs.readdirSync(".")) {
    if (/^[0-9a-f-]{20,}\.txt$/i.test(name)) {
      eleventyConfig.addPassthroughCopy(name);
    }
  }

  eleventyConfig.addFilter("assetUrl", cacheBustStaticUrl);

  eleventyConfig.addTransform("cache-bust-static-assets", function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    const version = assetVersion();
    return content.replace(
      /\/static\/[^"'\s<>]+\.(?:svg|jpg|png|webp)(?![^"']*[?&]v=)/g,
      (path) => `${path}?v=${version}`
    );
  });

  eleventyConfig.addGlobalData("eleventyComputed", {
    noindex: (data) => {
      if (data.noindex === true) return true;
      const inputPath = data.page?.inputPath || "";
      if (inputPath.includes("/tags/") || inputPath.includes("/categories/")) return true;
      if (!inputPath.includes("/posts/")) return false;
      return !isPostIndexable(data, inputPath);
    },
    canonicalUrl: (data) => {
      const base = siteData.url.replace(/\/$/, "");
      const urlPath = data.page?.url || "/";
      return `${base}${urlPath}`;
    },
  });

  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md").filter((item) => {
      if (!item.date) return true;
      const now = new Date();
      return item.date.getTime() <= now.getTime() + 24 * 60 * 60 * 1000;
    });
  });

  eleventyConfig.addCollection("indexablePosts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("posts/*.md")
      .filter((item) => isPostIndexable(item.data, item.inputPath))
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("homepagePosts", function (collectionApi) {
    const posts = collectionApi
      .getFilteredByGlob("posts/*.md")
      .filter((item) => isPostIndexable(item.data, item.inputPath));
    const pillars = posts
      .filter((item) => /\/posts\/cn-finalshell-/.test(item.inputPath))
      .sort((a, b) => a.inputPath.localeCompare(b.inputPath, "zh-CN"));
    const featured = posts
      .filter((item) => !/\/posts\/cn-finalshell-/.test(item.inputPath))
      .sort((a, b) => b.date - a.date);
    return [...pillars, ...featured].slice(0, 8);
  });

  eleventyConfig.addFilter("htmlDateString", function (dateValue) {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    return d.toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("limit", function (arr, limit) {
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, limit);
  });

  eleventyConfig.addFilter("dateFilter", function (dateValue) {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
      data: "_data",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
