import clsx from 'clsx';

import { extraLinkStyles, footerLinksContainer, footerNote, separator, voiceflowLink } from './BottomLinks.css';

const VOICEFLOW_URL = 'https://www.voiceflow.com/';

interface IBottomLinks {
  isSmall?: boolean;
  className?: string;
  extraLinkUrl?: string;
  showPoweredBy?: boolean;
  extraLinkText?: string;
}

export const BottomLinks: React.FC<IBottomLinks> = ({
  isSmall = false,
  className,
  extraLinkUrl,
  extraLinkText,
  showPoweredBy,
}) => {
  const showExtraLink = !!extraLinkText && !!extraLinkUrl;
  const showExtraText = !!extraLinkText && !extraLinkUrl;

  const showSeparator = showPoweredBy && (showExtraLink || showExtraText);

  return (
    <div className={clsx(footerLinksContainer({ small: isSmall }), className)}>
      {showPoweredBy && (
        <div>
          <a href={VOICEFLOW_URL} target="_blank" rel="noreferrer" className={voiceflowLink}>
            Powered by Voiceflow
          </a>
        </div>
      )}

      {showSeparator && <div className={separator} />}

      {showExtraText && <div className={footerNote}>{extraLinkText}</div>}

      {showExtraLink && (
        <a href={extraLinkUrl} target="_blank" className={extraLinkStyles}>
          {extraLinkText}
        </a>
      )}
    </div>
  );
};
