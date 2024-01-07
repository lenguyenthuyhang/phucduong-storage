import { ErpLayout } from '@/layout';
import CreateItem from './CreateItem';
import CustomerForm from '@/modules/CustomerModule/Forms/CustomerForm';

export default function CreateModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={CustomerForm} />
    </ErpLayout>
  );
}
