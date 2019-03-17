import { createFilter } from 'rollup-pluginutils';
import postcssrc from 'postcss-load-config';
import postcss from 'postcss';
// import syntax from 'postcss-syntax';

const ctx = {
  production: !process.env.ROLLUP_WATCH,
};

export default (include = '**/*.html', exclude) => {
  const filter = createFilter(include, exclude);

  return {
    name: 'rollup-plugin-html',

    async transform(code, id) {
      if (!filter(id)) return;

      return await postcssrc(ctx).then(({ plugins, options }) => postcss(plugins)
          .process(code, { ...options, from: id, /* syntax: 'postcss-html' */ })
          .then(({ css }) => ({
            code: `export default ${JSON.stringify(css)};`,
            map: { mappings: '' }
          })));
    },
  };
};