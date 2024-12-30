export class RecorderService {
  private mediaRecorder: MediaRecorder | null = null;

  private inputAudioStream: MediaStream | null = null;

  private createAudioStreamPromise: Promise<MediaStream> | null = null;

  constructor(private readonly onDataAvailable: (data: Blob) => void) {}

  private createAudioStream() {
    if (this.createAudioStreamPromise) {
      console.info('Returning existing input audio stream promise.');

      return this.createAudioStreamPromise;
    }

    if (this.inputAudioStream) {
      return Promise.resolve(this.inputAudioStream);
    }

    this.createAudioStreamPromise = navigator.mediaDevices
      .getUserMedia({ audio: true })
      .catch((err) => {
        console.error('Microphone access denied.', err);

        throw err;
      })
      .finally(() => {
        this.createAudioStreamPromise = null;
      });

    return this.createAudioStreamPromise;
  }

  private onMediaRecorderError = (event: ErrorEvent) => {
    console.error('MediaRecorder error:', event.error);
  };

  private onMediaRecorderDataAvailable = (event: BlobEvent) => {
    console.info('Got data:', event.data);

    if (event.data.size > 0) {
      this.onDataAvailable(event.data);
    }
  };

  async start() {
    if (this.inputAudioStream) {
      console.info('Audio stream already exists, reusing.');

      return;
    }

    this.inputAudioStream = await this.createAudioStream();

    console.info('Got audio stream:', this.inputAudioStream);

    this.mediaRecorder = new MediaRecorder(this.inputAudioStream);

    console.info('Got media recorder:', this.mediaRecorder);

    this.mediaRecorder.addEventListener('error', this.onMediaRecorderError);
    this.mediaRecorder.addEventListener('dataavailable', this.onMediaRecorderDataAvailable);

    this.mediaRecorder?.start(500);

    console.info('Started audio streaming...');
  }

  stop() {
    if (this.mediaRecorder?.state !== 'inactive') {
      this.mediaRecorder?.stop();
    }

    this.inputAudioStream?.getTracks().forEach((track) => track.stop());

    this.mediaRecorder?.removeEventListener('error', this.onMediaRecorderError);
    this.mediaRecorder?.removeEventListener('dataavailable', this.onMediaRecorderDataAvailable);

    this.mediaRecorder = null;
    this.inputAudioStream = null;

    console.info('Stopped audio streaming.');
  }
}
