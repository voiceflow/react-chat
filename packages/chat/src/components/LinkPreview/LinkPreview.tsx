import { forwardRef, type PropsWithRef } from 'react';

import { linkPreviewContainer } from './styles.css';

interface ILinkPreviewProps {
  image?: string;
  title: string;
  url: string;
  inline?: boolean;
}

const LinkPreview = forwardRef<HTMLDivElement, PropsWithRef<ILinkPreviewProps>>((props: any, ref) => {
  const { image, title, url, inline } = props;

  return (
    <div ref={ref} className={linkPreviewContainer({ inline })} {...props}>
      <div className={linkPreviewImage}>{image && <img url={image} />}</div>
      <div className={linkPreviewDetails}>
        <div className={linkPreviewTitle}>{title}</div>
        <div className={linkPreviewUrl}>{url}</div>
      </div>
    </div>
  );
});

export default LinkPreview;
