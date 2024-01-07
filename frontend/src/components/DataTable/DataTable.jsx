import React, { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { EyeOutlined, EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import {
  Dropdown,
  Table,
  Button,
  Flex,
  Typography,
  Layout,
  AutoComplete,
  Input,
  Tooltip,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import { Iconify } from '@/components/Icon';
import { useSelector, useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { selectListItems } from '@/redux/crud/selectors';
import useLanguage from '@/locale/useLanguage';
import { dataForTable } from '@/utils/dataStructure';
import { useMoney } from '@/settings';

import { generate as uniqueId } from 'shortid';

import { useCrudContext } from '@/context/crud';

const { Content } = Layout;

function AddNewItem({ config }) {
  const navigate = useNavigate();
  const { crudContextAction } = useCrudContext();
  const { collapsedBox, panel } = crudContextAction;
  const { ADD_NEW_ENTITY, entity } = config;

  // const handelClick = () => {
  //   panel.open();
  //   collapsedBox.close();
  // };

  const handleClick = () => {
    navigate(`/${entity.toLowerCase()}/create`);
  };

  return (
    <Button onClick={handleClick} type="primary" icon={<PlusOutlined />}>
      {ADD_NEW_ENTITY}
    </Button>
  );
}

export default function DataTable({ config, extra = [] }) {
  let { entity, dataTableColumns, DATATABLE_TITLE, fields } = config;
  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox, modal, readBox, editBox, advancedBox } = crudContextAction;
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const items = [
    {
      label: translate('Show'),
      key: 'read',
      icon: <Iconify icon="solar:eye-line-duotone" size={18} />,
    },
    {
      label: translate('Edit'),
      key: 'edit',
      icon: <Iconify icon="solar:pen-new-round-line-duotone" size={18} />,
    },
    ...extra,
    {
      label: translate('Delete'),
      key: 'delete',
      icon: <Iconify icon="solar:trash-bin-trash-line-duotone" size={18} />,
    },
  ];

  const handleRead = (record) => {
    dispatch(crud.currentItem({ data: record }));
    panel.open();
    collapsedBox.open();
    readBox.open();
  };
  function handleEdit(record) {
    dispatch(crud.currentItem({ data: record }));
    dispatch(crud.currentAction({ actionType: 'update', data: record }));
    editBox.open();
    panel.open();
    collapsedBox.open();
  }
  function handleDelete(record) {
    dispatch(crud.currentAction({ actionType: 'delete', data: record }));
    modal.open();
  }

  function handleUpdatePassword(record) {
    dispatch(crud.currentItem({ data: record }));
    dispatch(crud.currentAction({ actionType: 'update', data: record }));
    advancedBox.open();
    panel.open();
    collapsedBox.open();
  }

  let dispatchColumns = [];
  if (fields) {
    dispatchColumns = [...dataForTable({ fields, translate, moneyFormatter })];
  } else {
    dispatchColumns = [...dataTableColumns];
  }

  dataTableColumns = [
    ...dispatchColumns,
    {
      title: '',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Flex gap={10} justify="end">
          {items.map((item) => {
            return (
              <Tooltip key={`${uniqueId()}`} title={item.label}>
                <Button
                  danger={item.key === 'delete' ? true : false}
                  onClick={() => {
                    switch (item.key) {
                      case 'read':
                        handleRead(record);
                        break;
                      case 'edit':
                        handleEdit(record);
                        break;

                      case 'delete':
                        handleDelete(record);
                        break;
                      case 'updatePassword':
                        handleUpdatePassword(record);
                        break;

                      default:
                        break;
                    }
                  }}
                  icon={item.icon}
                ></Button>
              </Tooltip>
            );
          })}
        </Flex>
      ),
    },
  ];

  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);

  const { pagination, items: dataSource } = listResult;

  const dispatch = useDispatch();

  const handelDataTableLoad = useCallback((pagination) => {
    const options = { page: pagination.current || 1, items: pagination.pageSize || 10 };
    dispatch(crud.list({ entity, options }));
  }, []);

  const dispatcher = () => {
    dispatch(crud.list({ entity }));
  };

  useEffect(() => {
    const controller = new AbortController();
    dispatcher();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title={DATATABLE_TITLE}
        ghost={false}
        extra={[
          <Tooltip title={translate('Refresh')} key={`${uniqueId()}`}>
            <Button
              onClick={handelDataTableLoad}
              icon={<Iconify icon="solar:refresh-line-duotone" size={20} />}
            ></Button>
          </Tooltip>,
          <AddNewItem key={`${uniqueId()}`} config={config} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Content className="whiteBox">
        <Flex className="p-4">
          <Input
            placeholder={translate('search')}
            allowClear
            prefix={<Iconify icon="carbon:search" size={14} className="text-gray-400" />}
          />
        </Flex>
        <Table
          columns={dataTableColumns}
          rowKey={(item) => item._id}
          dataSource={dataSource}
          pagination={pagination}
          loading={listIsLoading}
          onChange={handelDataTableLoad}
          scroll={{ x: true }}
          locale={{
            emptyText: (
              <Flex align="center" justify="center" vertical gap={10} className="py-3">
                <Iconify icon="fluent-mdl2:search-data" size={36} className="text-gray-400" />
                <Typography.Text className="text-gray-400">
                  {translate('empty_text')}
                </Typography.Text>
              </Flex>
            ),
          }}
        />
      </Content>
    </>
  );
}
