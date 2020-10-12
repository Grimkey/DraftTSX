module.exports = {
  presets: [
    "next/babel",
    '@babel/react',
    '@babel/preset-env',
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
  ],
}