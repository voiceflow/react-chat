import { extraLinkStyles, footerLinksContainer, separator, voiceflowLink } from './BottomLinks.css';

const VOICEFLOW_URL = 'https://www.voiceflow.com/';

interface IBottomLinks {
  showPoweredBy?: boolean;
  extraLinkText?: string;
  extraLinkUrl?: string;
}

export const BottomLinks: React.FC<IBottomLinks> = ({ showPoweredBy, extraLinkText, extraLinkUrl }) => {
  const showExtraLink = extraLinkText && extraLinkUrl;

  return (
    <div className={footerLinksContainer}>
      {showPoweredBy && (
        <div>
          <a href={VOICEFLOW_URL} target="_blank" rel="noreferrer" className={voiceflowLink}>
            Powered by Voiceflow
          </a>
        </div>
      )}
      {showPoweredBy && showExtraLink && <div className={separator} />}
      {showExtraLink && (
        <a href={extraLinkUrl} target="_blank" className={extraLinkStyles}>
          {extraLinkText}
        </a>
      )}
    </div>
  );
};
