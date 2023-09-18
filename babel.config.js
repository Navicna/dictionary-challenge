module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [     
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@providers': './src/providers',
            '@data': './src/data',
            '@screens': './src/screens',
            '@interfaces': './src/interfaces',
            '@metrics': './src/metrics',
            '@context': './src/context',
            '@constants': './src/constants',
            '@components': './src/components',
          },
        },
      ],
    ]
  };
};
