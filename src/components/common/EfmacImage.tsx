import type { ImgHTMLAttributes } from 'react';
import { EFMAC_SITE_ORIGIN } from '../../data/officialAssets';
import { resolveEfmacImageSrc } from '../../utils/efmacMedia';

type EfmacImageProps = ImgHTMLAttributes<HTMLImageElement>;

export default function EfmacImage({ src, alt = '', ...rest }: EfmacImageProps) {
  return (
    <img
      src={resolveEfmacImageSrc(src)}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      data-efmac-origin={EFMAC_SITE_ORIGIN}
      {...rest}
    />
  );
}
