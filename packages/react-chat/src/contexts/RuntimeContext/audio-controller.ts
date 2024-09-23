export class AudioController {
  public audio = new Audio();

  private reject: (() => void) | null = null;

  public pause(): void {
    this.audio.pause();
  }

  public continue(): void {
    this.audio.play();
  }

  public async play(src: undefined | null | string): Promise<void> {
    this.stop();

    if (!src) return Promise.resolve();

    return new Promise<void>((resolve, reject) => {
      this.reject = reject;

      this.audio.onended = () => resolve();
      this.audio.onerror = () => reject();

      this.audio.src = src;
      this.audio.currentTime = 0;

      this.audio.play();
    });
  }

  public stop(): void {
    this.reject?.();
    this.audio.pause();

    this.audio.onended = null;
    this.audio.onerror = null;
    this.audio.currentTime = 0;
  }
}
