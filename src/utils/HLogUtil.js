
import * as Config from '../constants/Config';

export const log = (message)=>{
  if (Config.APP_LOG_ENABLE) {
    console.log('HL_LY_APP_RN[log:' + message + ']');
  }
}

export const error = (message)=>{
    console.log('HL_LY_APP_RN[Error:' + message + ']');
}