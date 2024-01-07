import useLanguage from '@/locale/useLanguage';
import CreateCustomerModule from '@/modules/CustomerModule/CreateCustomerModule';

export default function CustomerCreate() {
  const entity = 'customer';
  const translate = useLanguage();
  const Labels = {
    PANEL_TITLE: translate('customer'),
    DATATABLE_TITLE: translate('customer_list'),
    ADD_NEW_ENTITY: translate('add_new_customer'),
    ENTITY_NAME: translate('customer'),

    RECORD_ENTITY: translate('record_payment'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <CreateCustomerModule config={configPage} />;
}
