import useLanguage from '@/locale/useLanguage';
import ReadModule from '@/modules/CustomerModule/ReadModule';

export default function CustomerRead() {
  const entity = 'customer';
  const translate = useLanguage();
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
  return <ReadModule config={configPage} />;
}
