import { useNavigate } from 'react-router-dom';
import { SERVICE_CENTER_APPLY, SERVICE_CENTER_MAIN } from '../../data/homeData';
import { navigateLink } from '../../utils/legacyRoutes';
import EfmacImage from '../common/EfmacImage';

export default function ServiceCenter() {
  const navigate = useNavigate();

  const renderCell = (item: (typeof SERVICE_CENTER_MAIN)[number]) => (
    <button
      key={item.id}
      type="button"
      className="service-center-cell"
      onClick={() => navigateLink(item.link, navigate)}
    >
      {item.logo ? (
        <EfmacImage className="service-center-logo" src={item.logo} alt="" />
      ) : null}
      <span className="service-center-label">{item.title}</span>
    </button>
  );

  return (
    <section className="service-center-module" aria-label="服务中心">
      <div className="service-center-head">服务中心</div>
      <div className="service-center-grid">
        {SERVICE_CENTER_MAIN.map(renderCell)}
        <button
          type="button"
          className="service-center-cell service-center-cell--apply"
          onClick={() => navigateLink(SERVICE_CENTER_APPLY.link, navigate)}
        >
          {SERVICE_CENTER_APPLY.logo ? (
            <EfmacImage className="service-center-logo" src={SERVICE_CENTER_APPLY.logo} alt="" />
          ) : null}
          <span className="service-center-label">{SERVICE_CENTER_APPLY.title}</span>
        </button>
      </div>
    </section>
  );
}
