import { forwardRef, type PropsWithRef } from 'react';

import { Icon } from '../Icon';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import {
  linkPreviewContainer,
  linkPreviewDetails,
  linkPreviewImage,
  linkPreviewImageContainer,
  linkPreviewTitle,
  linkPreviewUrl,
} from './styles.css';
import { getImageTypeFromUrl } from './utils';

interface ILinkPreviewProps {
  image?: string;
  title: string;
  link: string;
  inline?: boolean;
}

export const LinkPreview = forwardRef<HTMLDivElement, PropsWithRef<ILinkPreviewProps>>((props: any, ref) => {
  const { image, title, link, inline } = props;
  const linkType = getImageTypeFromUrl(link);
  const shadow = linkType === 'custom' && !image;

  return (
    <div ref={ref} style={{ width: '256px' }} className={linkPreviewContainer({ inline })} {...props}>
      <div className={linkPreviewImageContainer({ shadow, inline })}>
        {linkType === 'pdf' && <Icon svg="documentPdf" />}
        {linkType === 'url' && <Icon svg="documentUrl" />}
        {linkType === 'custom' && !image && <LoadingSpinner size="medium" />}
        {linkType === 'custom' && image && <img className={linkPreviewImage} src={image} />}
      </div>
      <div className={linkPreviewDetails}>
        <div className={linkPreviewTitle({ inline })}>{title}</div>
        <div className={linkPreviewUrl({ loading: !image, inline })}>{link}</div>
      </div>
    </div>
  );
});
