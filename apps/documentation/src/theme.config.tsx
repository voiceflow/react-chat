import type { DocsThemeConfig } from 'nextra-theme-docs';
import React from 'react';

const config: DocsThemeConfig = {
  logo: (
    <>
      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" height={30} viewBox="0 0 220.01 165.31">
        <path
          fill="#1f2428"
          d="m178.88,41.9c-4.96-17.08-13.3-29.27-24.92-29.27-15.5,0-36.74,43.52-36.74,43.52l-1.38-.3.37-4.9c.06-.94.12-2.86.19-5.28.3-11.72.17-23.44-.35-35.14l-.46-10.2c0-.18-.16-.32-.34-.32h-10.5c-.18,0-.33.14-.34.32l-.46,10.2c-.53,11.71-.66,23.43-.35,35.14.06,2.42.13,4.35.19,5.28l.37,4.9-1.38.3S81.54,12.63,66.04,12.63c-11.61,0-19.95,12.19-24.92,29.27C18.33,42.64,0,60.61,0,82.65s18.33,40.01,41.12,40.75c4.96,17.08,13.3,29.27,24.92,29.27,15.5,0,36.74-43.52,36.74-43.52l1.38.3-.37,4.9c-.06.94-.12,2.86-.19,5.28-.3,11.72-.17,23.44.35,35.15l.46,10.2c0,.18.16.32.34.32h10.5c.18,0,.33-.14.34-.32l.46-10.2c.53-11.71.66-23.43.35-35.15-.06-2.42-.13-4.35-.19-5.28l-.37-4.9,1.38-.3s21.24,43.52,36.74,43.52c11.61,0,19.95-12.19,24.92-29.27,22.79-.74,41.12-18.71,41.12-40.75s-18.33-40.01-41.12-40.75ZM38.09,109.73c-13.94-2.06-24.68-13.4-24.68-27.08s10.74-25.02,24.68-27.08c-1.45,8.61-2.16,17.86-2.16,27.08s.71,18.47,2.16,27.08ZM63.95,26.81c.95-.64,2.09-.51,3.14.03,5.57,3,25.86,34.71,25.86,35.79l-.98,1.05c-6.08-4.22-21.51-14.72-37.55-19.65,2.94-9.35,6.55-15.23,9.52-17.22Zm3.14,111.66c-1.05.54-2.19.68-3.14.03-2.97-1.99-6.58-7.87-9.52-17.22,16.04-4.93,31.47-15.43,37.55-19.65l.98,1.05c0,1.08-20.29,32.79-25.86,35.79Zm31.87-55.07c-1.69.95-38.59,22.66-47.61,24.88-1.25-7.36-2.06-15.9-2.06-25.63s.81-18.27,2.06-25.63c9.01,2.23,45.92,23.94,47.61,24.88v1.49Zm53.96-56.55c1.05-.54,2.19-.68,3.14-.03,2.97,1.99,6.58,7.87,9.52,17.22-16.04,4.93-31.47,15.43-37.55,19.65l-.98-1.05c0-1.08,20.29-32.79,25.86-35.79Zm3.14,111.66c-.95.64-2.09.51-3.14-.03-5.57-3.01-25.86-34.71-25.86-35.79l.98-1.05c6.08,4.22,21.51,14.72,37.55,19.65-2.94,9.35-6.55,15.23-9.52,17.22Zm12.59-30.22c-9.01-2.23-45.92-23.94-47.61-24.88v-1.49c1.69-.95,38.59-22.66,47.61-24.88,1.25,7.36,2.06,15.9,2.06,25.63s-.81,18.27-2.06,25.63Zm13.27,1.45c1.45-8.61,2.16-17.86,2.16-27.08s-.71-18.47-2.16-27.08c13.94,2.06,24.68,13.4,24.68,27.08s-10.74,25.02-24.68,27.08Z"
        />
      </svg>
      <span>ChatKit UI Documentation</span>
    </>
  ),
  project: {
    link: 'https://github.com/voiceflow/react-chat',
  },
  docsRepositoryBase: 'https://github.com/voiceflow/react-chat',
  footer: {
    content: 'Made with ❤️ by Voiceflow',
  },
  darkMode: false,
  nextThemes: {
    defaultTheme: 'light',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
};

export default config;
