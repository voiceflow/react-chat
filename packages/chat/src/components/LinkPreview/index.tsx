import { forwardRef, type PropsWithRef } from 'react';

import {
  linkPreviewContainer,
  linkPreviewDetails,
  linkPreviewImage,
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
      <div className={linkPreviewImage()}>{image && <img src={image} />}</div>
      <div className={linkPreviewDetails}>
        <div className={linkPreviewTitle}>{title}</div>
        <div className={linkPreviewUrl}>{url}</div>
      </div>
    </div>
  );
});

export default LinkPreview;
