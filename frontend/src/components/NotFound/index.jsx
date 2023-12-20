import { Result, Button, Typography } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { useNavigate } from 'react-router-dom';

export default function NotFound({ entity = '' }) {
  const translate = useLanguage();

  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title={<Typography.Title level={2}>{translate('error_404')}</Typography.Title>}
      subTitle={translate('Sorry the Page you requested does not exist')}
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate(`/${entity?.toLowerCase()}`);
          }}
        >
          {translate('Back')}
        </Button>
      }
    />
  );
}
