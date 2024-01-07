import { useState } from 'react';
import dayjs from 'dayjs';
import { Button,  Descriptions, Tag, Card } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { erp } from '@/redux/erp/actions';

import { generate as uniqueId } from 'shortid';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/store';


export default function ReadItem({ config, selectedItem }: { config: any; selectedItem: any }) {
  const translate = useLanguage();
  const { entity, ENTITY_NAME } = config;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const resetErp = {
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    dob: '',
  };

  const [currentErp, setCurrentErp] = useState(selectedItem ?? resetErp);

  const status = (status: string) => {
    let color = status === 'activated' ? 'cyan' : status === 'deactivated' ? 'magenta' : 'gold';

    return <Tag color={color}>{status && translate(status)}</Tag>;
  };

  return (
    <>
      <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`);
        }}
        title={`${translate('details')} ${ENTITY_NAME}`}
        ghost={false}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              navigate(`/${entity.toLowerCase()}`);
            }}
            icon={<CloseCircleOutlined />}
          >
            {translate('Close')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              dispatch(
                erp.currentAction({
                  actionType: 'update',
                  data: currentErp,
                })
              );
              navigate(`/${entity.toLowerCase()}/update/${currentErp._id}`);
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            {translate('Edit')}
          </Button>,
        ]}
        style={{
          padding: '20px 0px',
        }}
      />
      <Card>
        <Descriptions column={1}>
          <Descriptions.Item label={translate('lastname')}>{currentErp.lastname}</Descriptions.Item>
          <Descriptions.Item label={translate('firstname')}>
            {currentErp.firstname}
          </Descriptions.Item>
          <Descriptions.Item label={translate('phone')}>{currentErp.phone}</Descriptions.Item>
          <Descriptions.Item label={translate('email')}>{currentErp.email}</Descriptions.Item>
          <Descriptions.Item label={translate('dob')}>
            {dayjs(currentErp.dob).format('DD/MM/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label={translate('gender')}>
            {translate(currentErp.gender)}
          </Descriptions.Item>
          <Descriptions.Item label={translate('status')}>
            {status(currentErp.status)}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
}
