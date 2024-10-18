import { poweredByStyles, separator } from './PoweredBy.css';

export const PoweredBy = () => {
  return (
    <div className={poweredByStyles}>
      <div>Powered by Voiceflow</div>
      <div className={separator} />
      <div>Privacy</div>
    </div>
  );
};
