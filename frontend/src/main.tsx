import { createRoot } from 'react-dom/client';

import RootApp from './RootApp';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<RootApp />);
