import { ErpLayout } from '@/layout';
import ErpPanel from '@/modules/ErpPanelModule';

export default function DataTableModule({ config }: { config: any }) {
  return (
    <ErpLayout>
      <ErpPanel config={config} extra={undefined}></ErpPanel>
    </ErpLayout>
  );
}
