module.exports = {
  chainWebpack: config => {
    const mdRule = config.module.rule("markdown");
    mdRule.uses.clear();
    mdRule
      .test(/\.md$/)
      .use("html-loader")
      .loader("html-loader")
      .end();
  }
};
