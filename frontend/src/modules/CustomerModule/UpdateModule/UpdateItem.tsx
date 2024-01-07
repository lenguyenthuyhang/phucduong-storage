import { useEffect } from 'react';
import { Form, Card } from 'antd';
import dayjs from 'dayjs';
import { Button } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import { useSelector } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { erp } from '@/redux/erp/actions';
import { generate as uniqueId } from 'shortid';
import { selectUpdatedItem } from '@/redux/erp/selectors';
import Loading from '@/components/Loading';

import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '@/redux/store';
// import { StatusTag } from '@/components/Tag';

function SaveForm({ form, translate }: { form: any; translate: any }) {
  const handelClick = () => {
    form.submit();
  };

  return (
    <Button onClick={handelClick} type="primary" icon={<PlusOutlined />}>
      {translate('update')}
    </Button>
  );
}

export default function UpdateItem({ config, UpdateForm }: { config: any; UpdateForm: any }) {
  const translate = useLanguage();
  let { entity } = config;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);
  const [form] = Form.useForm();

  const { id } = useParams();

  const onSubmit = (fieldsValue: {
    dob: string | number | Date | dayjs.Dayjs | null | undefined;
  }) => {
    let dataToUpdate = { ...fieldsValue };

    if (fieldsValue) {
      if (fieldsValue.dob) {
        dataToUpdate.dob = dayjs(fieldsValue.dob).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      }
    }

    dispatch(erp.update({ entity, id, jsonData: dataToUpdate } as any));
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(erp.resetAction({ actionType: 'update' }));
      navigate(`/${entity.toLowerCase()}/read/${id}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (current) {
      let formData = { ...current };

      if (formData.dob) {
        formData.dob = dayjs(formData.dob);
      }

      form.resetFields();
      form.setFieldsValue(formData);
    }
  }, [current]);

  return (
    <>
      <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`);
        }}
        title={translate('update')}
        ghost={false}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              navigate(`/${entity.toLowerCase()}`);
            }}
            icon={<CloseCircleOutlined />}
          >
            {translate('Cancel')}
          </Button>,
          <SaveForm translate={translate} form={form} key={`${uniqueId()}`} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Card>
        <Loading isLoading={isLoading}>
          <Form form={form} layout="vertical" onFinish={onSubmit}>
            <UpdateForm current={current} isUpdateForm />
          </Form>
        </Loading>
      </Card>
    </>
  );
}
