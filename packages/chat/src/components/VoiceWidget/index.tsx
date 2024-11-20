import { Button } from '../Button';
import { ButtonVariant } from '../Button/constants';
import { controlSection, titleStyle, voiceWidgetContainer } from './VoiceWidget.css';

export const VoiceWidget = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={voiceWidgetContainer}>
      {children}
      <div className={controlSection}>
        <div className={titleStyle}>How can I help you?</div>
        <Button variant={ButtonVariant.PRIMARY}>Start</Button>
      </div>
    </div>
  );
};
