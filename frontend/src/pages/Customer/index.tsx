import { useNavigate } from 'react-router-dom';
import { Tag, Button } from 'antd';
import useLanguage from '@/locale/useLanguage';
import DataTableModule from '@/modules/CustomerModule/DataTableModule';
import { ICustomer } from '@/models/Customer';
import { TableColumnType } from 'antd/lib';

export default function Customer() {
  const navigate = useNavigate();
  const translate = useLanguage();
  const entity = 'customer';

  const searchConfig = {
    displayLabels: ['firstname'],
    searchFields: 'firstname',
  };
  const deleteModalLabels = ['lastname', 'firstname'];
  const dataTableColumns: TableColumnType<ICustomer>[] = [
    {
      title: translate('fullname'),
      render: (_fullname: any, record: ICustomer) => {
        return (
          <Button
            type="link"
            className="p-0"
            onClick={() => navigate(`/${entity.toLowerCase()}/read/${record?._id}`)}
          >
            {`${record?.lastname} ${record?.firstname}`}
          </Button>
        );
      },
    },
    {
      title: translate('gender'),
      dataIndex: ['gender'],
      render: (gender: string) => {
        return translate(gender);
      },
    },
    {
      title: translate('email'),
      dataIndex: ['email'],
      render: (email: string) => {
        return (
          <Button type="link" className="p-0" href={`mailto:${email}`}>
            {email}
          </Button>
        );
      },
    },
    {
      title: translate('status'),
      dataIndex: ['status'],
      render: (status: string) => {
        let color = status === 'activated' ? 'cyan' : status === 'deactivated' ? 'magenta' : 'gold';

        return <Tag color={color}>{status && translate(status)}</Tag>;
      },
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('customer'),
    DATATABLE_TITLE: translate('customer_list'),
    ADD_NEW_ENTITY: translate('add_new_customer'),
    ENTITY_NAME: translate('customer'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  };

  return <DataTableModule config={config} />;
}
