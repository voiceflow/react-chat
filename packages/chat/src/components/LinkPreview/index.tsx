import { forwardRef, type PropsWithRef } from 'react';

import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import {
  linkPreviewContainer,
  linkPreviewDetails,
  linkPreviewImage,
  linkPreviewImageContainer,
  linkPreviewTitle,
  linkPreviewUrl,
} from './styles.css';

interface ILinkPreviewProps {
  image?: string;
  title: string;
  url: string;
  inline?: boolean;
}

const LinkPreview = forwardRef<HTMLDivElement, PropsWithRef<ILinkPreviewProps>>((props: any, ref) => {
  const { image, title, url, inline } = props;

  return (
    <div ref={ref} style={{ width: '256px' }} className={linkPreviewContainer({ inline })} {...props}>
      <div className={linkPreviewImageContainer({ loading: !image, inline })}>
        {!image && <LoadingSpinner size="medium" />}
        {image && <img className={linkPreviewImage} src={image} />}
      </div>
      <div className={linkPreviewDetails}>
        <div className={linkPreviewTitle({ inline })}>{title}</div>
        <div className={linkPreviewUrl({ loading: !image, inline })}>{url}</div>
      </div>
    </div>
  );
});

export default LinkPreview;
