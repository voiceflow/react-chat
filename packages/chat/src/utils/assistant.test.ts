import { VoiceflowRuntime } from '@voiceflow/sdk-runtime';
import { createMock } from '@voiceflow/test-common/vitest';
import type { Mock } from 'vitest';
import { describe, expect, it, vi } from 'vitest';

import type { RawAssistantOptions } from '@/dtos/AssistantOptions.dto';
import { DEFAULT_AVATAR } from '@/dtos/AssistantOptions.dto';
import type { ChatConfig } from '@/dtos/ChatConfig.dto';
import { ExtensionType } from '@/dtos/Extension.dto';
import { PRIMARY } from '@/styles';
import { ChatPersistence, ChatPosition } from '@/types';

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
    const remoteOptions: RawAssistantOptions = {
      title: 'remote',
      color: 'remote',
      image: 'remote',
      avatar: 'remote',
      watermark: false,
      feedback: true,
      description: 'remote',
      position: ChatPosition.LEFT,
      persistence: ChatPersistence.MEMORY,
      launcher: 'remote',
      stylesheet: ['remote'],
      spacing: {
        side: 100,
        bottom: 100,
      },
      extensions: [{ name: 'remote_extension', type: ExtensionType.EFFECT, match: () => false }],
    };

    it('should fallback to default options when not configured', async () => {
      mockGetPublishing();

      const merged = await mergeAssistantOptions(config, {});

      expect(merged).toEqual({
        title: 'Voiceflow Assistant',
        color: PRIMARY,
        image: DEFAULT_AVATAR,
        avatar: DEFAULT_AVATAR,
        watermark: true,
        feedback: false,
        description: '',
        position: ChatPosition.RIGHT,
        persistence: ChatPersistence.LOCAL_STORAGE,
        spacing: {
          side: 30,
          bottom: 30,
        },
        extensions: [],
      });
    });

    it('should use remote values pulled from publishing configuration', async () => {
      mockGetPublishing().mockResolvedValue(remoteOptions);

      const merged = await mergeAssistantOptions(config, undefined);

      expect(merged).toEqual({
        ...remoteOptions,
        extensions: [expect.objectContaining({ name: 'remote_extension', type: ExtensionType.EFFECT })],
      });
    });

    it('should prioritize local options over remote options (with some exceptions)', async () => {
      const localOptions: RawAssistantOptions = {
        title: 'local',
        color: 'local',
        image: 'local',
        avatar: 'local',
        description: 'local',
        position: ChatPosition.RIGHT,
        persistence: ChatPersistence.SESSION_STORAGE,
        launcher: 'local',
        stylesheet: ['local'],
        spacing: {
          side: 150,
          bottom: 150,
        },
        extensions: [{ name: 'local_extension', type: ExtensionType.EFFECT, match: () => false }],

        // setting these locally should have no effect
        watermark: !remoteOptions.watermark,
        feedback: !remoteOptions.feedback,
      };
      mockGetPublishing().mockResolvedValue(remoteOptions);

      const merged = await mergeAssistantOptions(config, localOptions);

      expect(merged).toEqual({
        ...localOptions,
        extensions: [
          expect.objectContaining({ name: 'remote_extension', type: ExtensionType.EFFECT }),
          expect.objectContaining({ name: 'local_extension', type: ExtensionType.EFFECT }),
        ],

        // verify these setting have not changed from what is remote
        watermark: remoteOptions.watermark,
        feedback: remoteOptions.feedback,
      });
    });

    it('should merge spacing from multiple sources', async () => {
      const localOptions: RawAssistantOptions = {
        spacing: { side: 100 },
      };
      mockGetPublishing().mockResolvedValue({ spacing: { bottom: 100 } });

      const merged = await mergeAssistantOptions(config, localOptions);

      expect(merged).toEqual({
        title: 'Voiceflow Assistant',
        color: PRIMARY,
        image: DEFAULT_AVATAR,
        avatar: DEFAULT_AVATAR,
        watermark: true,
        feedback: false,
        description: '',
        position: ChatPosition.RIGHT,
        persistence: ChatPersistence.LOCAL_STORAGE,
        spacing: {
          side: 100,
          bottom: 100,
        },
        extensions: [],
      });
    });
  });
});
