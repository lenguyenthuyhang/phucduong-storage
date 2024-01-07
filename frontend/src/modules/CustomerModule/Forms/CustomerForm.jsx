import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { DatePicker } from 'antd';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';

import ItemRow from '@/modules/ErpPanelModule/ItemRow';

import MoneyInputFormItem from '@/components/MoneyInputFormItem';
import { selectFinanceSettings } from '@/redux/settings/selectors';
import useLanguage from '@/locale/useLanguage';

import calculate from '@/utils/calculate';
import { useSelector } from 'react-redux';
import SelectAsync from '@/components/SelectAsync';

export default function CustomerForm({ isUpdateForm = false }) {
  const { last_invoice_number } = useSelector(selectFinanceSettings);

  if (!last_invoice_number) {
    return <></>;
  }

  return <LoadCustomerForm isUpdateForm={isUpdateForm} />;
}

function LoadCustomerForm({ isUpdateForm }) {
  const translate = useLanguage();

  return (
    <>
      <Row gutter={[24, 10]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label={translate('lastname')}
            name="lastname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label={translate('firstname')}
            name="firstname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={12}>
          <Form.Item
            label={translate('phone')}
            name="phone"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label={translate('Email')} name="email">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="dob"
            label={translate('dob')}
            rules={[
              {
                type: 'object',
              },
            ]}
            initialValue={dayjs().subtract(18, 'years')}
          >
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label={translate('gender')}
            name="gender"
            rules={[
              {
                required: false,
              },
            ]}
            initialValue={'male'}
          >
            <Select
              options={[
                { value: 'male', label: translate('Male') },
                { value: 'female', label: translate('Female') },
              ]}
            ></Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={5}>
          <Form.Item
            label={translate('status')}
            name="status"
            rules={[
              {
                required: false,
              },
            ]}
            initialValue={'not activated'}
          >
            <Select
              options={[
                { value: 'not activated', label: translate('not activated') },
                { value: 'activated', label: translate('activated') },
                { value: 'deactivated', label: translate('deactivated') },
              ]}
            ></Select>
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />
    </>
  );
}
