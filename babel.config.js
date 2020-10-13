module.exports = {
  presets: [
    "next/babel",
    '@babel/react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
  ],
}