## Get started

```sh
# Install dependencies
yarn install
npx pod-install

# Enable husky
yarn husky install

# Start dev server
## IOS:
  yarn ios
## Special IOS:
  yarn react-native run-ios --simulator='iPhone 13 Pro Max'
## Android:
  yarn android
## Note: If metro bundler not starting automatically, following steps:
  yarn metro
  yarn android
```

## Script

```sh
# Clean
## IOS:
  yarn clean:ios
## Android:
  yarn clean:android
```

## Publishing

[Android](https://reactnative.dev/docs/signed-apk-android)
