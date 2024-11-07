import { z } from 'zod';

export const EMBEDDED_TARGET = 'voiceflow-chat-frame';

export enum RenderMode {
  /**
   * Embed the chat window into a specific container in the screen.
   * This won't show the Launcher button because the chat will be
   * opened by default.
   */
  EMBEDDED = 'embedded',

  /**
   * Shows the launcher button in the bottom corder of the screen,
   * and the user needs to push it to open/minimize the chat window.
   */
  OVERLAY = 'overlay',
}

export type RenderOptions = z.infer<typeof RenderOptions>;

export const RenderOptions = z
  .object({
    mode: z.nativeEnum(RenderMode).default(RenderMode.OVERLAY),
    target: z
      .instanceof(HTMLElement)
      .optional()
      .transform((x) => x ?? document.getElementById(EMBEDDED_TARGET) ?? undefined),
  })
  .optional()
  .transform((render) => {
    if (render?.target && render.mode !== RenderMode.EMBEDDED) {
      console.warn(`render.target has no effect in ${render.mode} mode.`);
    }

    if (render?.mode === RenderMode.EMBEDDED) {
      if (render.target) {
        return {
          mode: RenderMode.EMBEDDED as const,
          target: render.target,
        };
      }

      console.error('No valid target found for embedded mode. Defaulting to overlay mode.');
    }

    return { mode: RenderMode.OVERLAY as const };
  });
