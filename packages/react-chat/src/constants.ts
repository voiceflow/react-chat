import Bowser from 'bowser';

export enum ClassName {
  ASSISTANT_INFO = 'vfrc-assistant-info',
  AVATAR = 'vfrc-avatar',
  BUBBLE = 'vfrc-bubble',
  BUTTON = 'vfrc-button',
  CARD = 'vfrc-card',
  CAROUSEL = 'vfrc-carousel',
  CHAT = 'vfrc-chat',
  CHAT_INPUT = 'vfrc-chat-input',
  FEEDBACK = 'vfrc-feedback',
  FOOTER = 'vfrc-footer',
  HEADER = 'vfrc-header',
  ICON = 'vfrc-icon',
  IMAGE = 'vfrc-image',
  INPUT = 'vfrc-input',
  LAUNCHER = 'vfrc-launcher',
  LOADER = 'vfrc-loader',
  MESSAGE = 'vfrc-message',
  PROMPT = 'vfrc-prompt',
  SYSTEM_RESPONSE = 'vfrc-system-response',
  TIMESTAMP = 'vfrc-timestamp',
  TOOLTIP = 'vfrc-tooltip',
  TYPING_INDICATOR = 'vfrc-typing-indicator',
  USER_RESPONSE = 'vfrc-user-response',
  WIDGET = 'vfrc-widget',

  PROACTIVE_CLOSE = 'vfrc-proactive-close',
  PROACTIVE_MESSAGE = 'vfrc-proactive-message',
  PROACTIVE = 'vfrc-proactive',
}

export const DEVICE_INFO = Bowser.parse(window.navigator.userAgent);
