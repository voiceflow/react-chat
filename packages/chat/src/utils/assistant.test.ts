import type { WidgetSettings } from '@voiceflow/dtos-interact';
import { VoiceflowRuntime } from '@voiceflow/sdk-runtime';
import { createMock } from '@voiceflow/test-common/vitest';
import { ChatPersistence, ChatPosition } from '@voiceflow/voiceflow-types/build/cjs/version';
import type { Mock } from 'vitest';
import { describe, expect, it, vi } from 'vitest';

import type { ChatConfig } from '@/dtos/ChatConfig.dto';
import { ExtensionType } from '@/dtos/Extension.dto';
import type { WidgetOverrides } from '@/dtos/WidgetOverrides.dto';
import { createPalette } from '@/styles/colors';

import { mergeAssistantOptions } from './assistant';

vi.mock('@voiceflow/sdk-runtime', () => ({ VoiceflowRuntime: vi.fn() }));

describe('assistant utils', () => {
  const mockGetPublishing = (): Mock<
    Parameters<VoiceflowRuntime<any>['getPublishing']>,
    ReturnType<VoiceflowRuntime<any>['getPublishing']>
  > => {
    const getPublishing = vi.fn().mockResolvedValue({});

    vi.mocked(VoiceflowRuntime).mockImplementation(() => createMock<VoiceflowRuntime<any>>({ getPublishing }));

    return getPublishing;
  };

  describe('mergeAssistantOptions()', () => {
    const config = {} as ChatConfig;
    const remoteOptions: WidgetSettings = {
      type: 'chat',
      chat: {
        voiceInput: true,
        voiceOutput: true,
        renderMode: 'widget',
        headerImage: {
          enabled: true,
          url: 'remote_header_image',
        },
        agentImage: {
          enabled: true,
          url: 'remote_agent_image',
        },
        banner: {
          title: 'remote title',
          description: 'remote_description',
          enabled: true,
          imageURL: 'remote_banner_image',
        },
        placeholderText: 'remote_placeholder_text',
        aiDisclaimer: {
          text: 'remote ai disclaimer',
          enabled: true,
        },
        handoffToAgentImageURL: undefined,
      },
      voice: {
        renderMode: 'full',
        content: {
          imageURL: 'remote_voice_image',
          talkingText: 'remote_talking_text',
          endButtonText: 'remote_end_button_text',
          listeningText: 'remote_listening_text',
          startButtonText: 'remote_start_button_text',
          callToActionText: 'remote_call_to_action',
        },
      },
      common: {
        sideSpacing: '30px',
        bottomSpacing: '30px',
        position: 'right',
        fontFamily: 'remote_font',
        primaryColor: {
          color: 'blue',
          palette: createPalette('blue'),
        },
        poweredBy: true,
        launcher: {
          type: 'icon',
          text: undefined,
          imageURL: 'remote_launcher_image',
        },
        footerLink: {
          enabled: true,
          text: 'Remote Privacy',
          url: 'remote_privacy_link',
        },
        persistence: 'LOCAL_STORAGE',
      },
    };

    it('should use remote values pulled from publishing configuration', async () => {
      mockGetPublishing().mockResolvedValue(remoteOptions);

      const merged = await mergeAssistantOptions(config, undefined);

      expect(merged).toEqual({
        ...remoteOptions,
        extensions: [],
        stylesheet: '',
      });
    });

    it('should prioritize local options over remote options', async () => {
      const localOptions: WidgetOverrides = {
        type: 'voice',
        renderMode: 'popover',
        header: {
          hideImage: true,
        },
        banner: {
          title: 'overridden',
          description: 'overridden description',
          imageUrl: 'overridden image',
        },
        inputPlaceholder: 'overridden placeholder',
        enableVoiceInput: false,
        enableVoiceOutput: false,
        footer: {
          hide: true,
        },
        color: 'green',
        palette: {
          50: '50',
          100: '100',
          200: '200',
          300: '300',
          400: '400',
          500: '500',
          600: '600',
          700: '700',
          800: '800',
          900: '900',
        },
        fontFamily: 'Helvetica',
        side: ChatPosition.LEFT,
        spacing: {
          side: '40px',
          bottom: '50px',
        },
        aiDisclaimer: { hide: false, text: 'new disclaimer' },
        persistence: ChatPersistence.MEMORY,
        stylesheet: 'overridden_styles',
        extensions: [{ type: ExtensionType.EFFECT, name: 'remote_extension', match: () => true }],
      };
      mockGetPublishing().mockResolvedValue(remoteOptions);

      const merged = await mergeAssistantOptions(config, localOptions);

      expect(merged).toEqual({
        type: 'voice',
        chat: {
          voiceInput: false,
          voiceOutput: false,
          renderMode: 'popover',
          headerImage: {
            enabled: false,
            url: 'remote_header_image',
          },
          agentImage: {
            enabled: true,
            url: 'remote_agent_image',
          },
          banner: {
            title: 'overridden',
            description: 'overridden description',
            enabled: true,
            imageURL: 'overridden image',
          },
          placeholderText: 'overridden placeholder',
          aiDisclaimer: {
            text: 'new disclaimer',
            enabled: true,
          },
          handoffToAgentImageURL: undefined,
        },
        voice: {
          renderMode: 'full',
          content: {
            imageURL: 'remote_voice_image',
            talkingText: 'remote_talking_text',
            endButtonText: 'remote_end_button_text',
            listeningText: 'remote_listening_text',
            startButtonText: 'remote_start_button_text',
            callToActionText: 'remote_call_to_action',
          },
        },
        common: {
          sideSpacing: '40px',
          bottomSpacing: '50px',
          position: 'left',
          fontFamily: 'Helvetica',
          primaryColor: {
            color: 'green',
            palette: {
              50: '50',
              100: '100',
              200: '200',
              300: '300',
              400: '400',
              500: '500',
              600: '600',
              700: '700',
              800: '800',
              900: '900',
            },
          },
          poweredBy: true,
          launcher: {
            type: 'icon',
            text: undefined,
            imageURL: 'remote_launcher_image',
          },
          footerLink: {
            enabled: false,
            text: 'Remote Privacy',
            url: 'remote_privacy_link',
          },
          persistence: 'memory',
        },
        stylesheet: 'overridden_styles',
        extensions: [expect.objectContaining({ name: 'remote_extension', type: ExtensionType.EFFECT })],
      });
    });
  });
});
