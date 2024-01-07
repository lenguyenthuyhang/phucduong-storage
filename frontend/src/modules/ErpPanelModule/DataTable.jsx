import { useEffect } from 'react';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  RedoOutlined,
  PlusOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { Dropdown, Table, Button, Flex, Layout, Input, Tooltip, Card } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { erp } from '@/redux/erp/actions';
import { selectListItems } from '@/redux/erp/selectors';
import { useErpContext } from '@/context/erp';
import { generate as uniqueId } from 'shortid';
import { useNavigate } from 'react-router-dom';
import { Iconify } from '@/components/Icon';

import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';

const { Content } = Layout;

function AddNewItem({ config }) {
  const navigate = useNavigate();
  const { ADD_NEW_ENTITY, entity } = config;

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
  const translate = useLanguage();
  let { entity, dataTableColumns, disableAdd = false } = config;

  const { DATATABLE_TITLE } = config;

  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);

  const { pagination, items: dataSource } = listResult;

  const { erpContextAction } = useErpContext();
  const { modal } = erpContextAction;

  const items = [
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

  const navigate = useNavigate();

  const handleRead = (record) => {
    dispatch(erp.currentItem({ data: record }));
    navigate(`/${entity}/read/${record._id}`);
  };
  const handleEdit = (record) => {
    const data = { ...record };
    dispatch(erp.currentAction({ actionType: 'update', data }));
    navigate(`/${entity}/update/${record._id}`);
  };

  const handleDelete = (record) => {
    dispatch(erp.currentAction({ actionType: 'delete', data: record }));
    modal.open();
  };

  dataTableColumns = [
    ...dataTableColumns,
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

  const dispatch = useDispatch();

  const handelDataTableLoad = (pagination) => {
    const options = { page: pagination.current || 1, items: pagination.pageSize || 10 };
    dispatch(erp.list({ entity, options }));
  };

  const dispatcher = () => {
    dispatch(erp.list({ entity }));
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
        title={DATATABLE_TITLE}
        ghost={true}
        extra={[
          <Tooltip title={translate('Refresh')} key={`${uniqueId()}`}>
            <Button
              onClick={handelDataTableLoad}
              icon={<Iconify icon="solar:refresh-line-duotone" size={20} />}
            ></Button>
          </Tooltip>,
          ,
          !disableAdd && <AddNewItem config={config} key={`${uniqueId()}`} />,
        ]}
        className="px-0 py-5"
      ></PageHeader>
      <Card bordered={false}>
        <Flex className="pb-6">
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
        />
      </Card>
    </>
  );
}
