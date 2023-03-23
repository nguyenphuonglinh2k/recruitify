module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      require.resolve("babel-plugin-module-resolver"),
      {
        root: ["."],
        extensions: [".ts", ".tsx", ".js", ".ios.js", ".android.js"],
        alias: {
          "*": "./src/*",
          assets: ["./src/assets"],
          navigation: ["./src/navigation"],
          screens: ["./src/screens"],
          utils: ["./src/utils"],
          const: ["./src/const"],
          components: ["./src/components"],
          icons: ["./src/icons"],
          reduxStore: ["./src/reduxStore"],
          sagas: ["./src/sagas"],
          services: ["./src/services"],
          layouts: ["./src/layouts"],
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
