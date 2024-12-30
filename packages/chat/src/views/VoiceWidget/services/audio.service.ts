import debounce from 'lodash.debounce';

interface QueueItem {
  markIndex: number;
  arrayBuffer: ArrayBuffer;
}

export class AudioService {
  private audio: HTMLAudioElement;

  private stopped = false;

  private mediaSource: MediaSource | null = null;

  private lastMarkIndex = 0;

  private lastSentMarkIndex = 0;

  private onMark: (markIndex: number) => void;

  private onTalking: () => void;

  private onListening: () => void;

  private queue: QueueItem[] = [];

  private activeItem: QueueItem | null = null;

  private sourceBuffer: SourceBuffer | null = null;

  constructor(options: { onMark: (markIndex: number) => void; onListening: () => void; onTalking: () => void }) {
    this.onMark = options.onMark;
    this.onTalking = options.onTalking;
    this.onListening = options.onListening;

    this.audio = new Audio();
    this.audio.addEventListener('ended', this.onAudioEnded);
    this.audio.addEventListener('waiting', this.onAudioWaiting);
    this.audio.addEventListener('stalled', this.onAudioStalled);
    this.audio.addEventListener('playing', this.onAudioPlaying);
  }

  private onAudioWaiting = () => {
    this.sendMark();
  };

  private onAudioStalled = () => {
    this.sendMark();
  };

  private onAudioPlaying = () => {
    this.onTalking();
  };

  private onAudioEnded = () => {
    this.onListening();
  };

  private sendMark() {
    if (this.lastMarkIndex === this.lastSentMarkIndex) return;

    this.lastSentMarkIndex = this.lastMarkIndex;

    this.onMark(this.lastMarkIndex);
  }

  private base64ToArrayBuffer(base64: string) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
  }

  private onBufferUpdated(markIndex: number) {
    this.activeItem = null;

    if (markIndex > this.lastMarkIndex) {
      this.lastMarkIndex = markIndex;
    }

    if (this.queue.length) {
      this.playQueue();
    } else {
      this.sendMark();
      this.onListening();
      this.stopAudioDebounced();
    }
  }

  private async updateSourceBuffer(markIndex: number, arrayBuffer: ArrayBuffer) {
    await this.startAudio();

    this.sourceBuffer?.addEventListener('error', () => this.onBufferUpdated(markIndex), { once: true });
    this.sourceBuffer?.addEventListener('updateend', () => this.onBufferUpdated(markIndex), { once: true });

    this.sourceBuffer?.appendBuffer(arrayBuffer);
  }

  private async playQueue() {
    if (this.stopped || this.activeItem || !this.queue.length) return;

    this.activeItem = this.queue.shift()!;

    this.updateSourceBuffer(this.activeItem.markIndex, this.activeItem.arrayBuffer);
  }

  addChunk(base64Chunk: string, markIndex: number) {
    if (this.stopped) return;

    const arrayBuffer = this.base64ToArrayBuffer(base64Chunk);

    this.queue.push({ markIndex, arrayBuffer });
    this.playQueue();
  }

  private stopAudio() {
    if (this.stopped) return;

    this.sourceBuffer?.abort();
    this.sourceBuffer = null;

    if (this.mediaSource?.readyState === 'open') {
      this.mediaSource?.endOfStream();
    }
    this.mediaSource = null;

    URL.revokeObjectURL(this.audio.src);

    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.src = '';
  }

  private stopAudioDebounced = debounce(this.stopAudio, 500);

  private startAudio() {
    if (this.stopped || this.mediaSource) return Promise.resolve();

    return new Promise<void>((resolve) => {
      const mediaSource = new MediaSource();

      mediaSource.addEventListener(
        'sourceopen',
        () => {
          this.sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');

          resolve();
        },
        { once: true }
      );

      this.audio.src = URL.createObjectURL(mediaSource);

      this.audio.play();
      this.mediaSource = mediaSource;
    });
  }

  interrupt() {
    if (this.stopped) return;

    this.queue = [];
    this.activeItem = null;

    this.stopAudio();

    this.sendMark();

    this.startAudio();
  }

  stop() {
    this.stopAudio();

    this.queue = [];
    this.stopped = true;
    this.activeItem = null;
    this.lastMarkIndex = 0;
    this.lastSentMarkIndex = 0;
  }
}
