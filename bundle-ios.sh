react-native bundle --entry-file index.ios.js --bundle-output ./ios/password/main.jsbundle --platform ios --assets-dest ./ios/password --dev false
# react-native bundle --entry-file index.ios.js --bundle-output ./ios/HL_LY_APP_RN/bundle/main.jsbundle --platform ios --assets-dest ./ios/HL_LY_APP_RN/bundle --dev false

# code-push release HA_FA_LA_LY-ios ./ios/bundle/main.jsbundle 1.0.1 -d Production -x true


# code-push patch HA_FA_LA_LY-ios Production -t ~1.0.0 -x true

# code-push release-react HA_FA_LA_LY-ios ios -d Production -t 1.0.1 -e index.ios.js -s ./ios/bundle -p ./ios/HL_LY_APP_RN/ios/Info.plist
