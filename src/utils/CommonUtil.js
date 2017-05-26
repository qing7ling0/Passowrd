
import * as Config from '../constants/Config';

export const naviGoBack = (navigator) => {
  if (navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
  return false;
};

export const getDownloadImageUrl = (imagePath) => {
   return Config.ConfigServerAddress+"file?file="+imagePath;
};

export const getImageUrl = (imagePath) => {
   return Config.ConfigServerDomain+imagePath;
};

export const deepCopy = (source) => { 
  var result={};
  for (var key in source) {
    result[key] = typeof source[key]==='object' ? deepCopy(source[key]): source[key];
  } 
  
  return result; 
};