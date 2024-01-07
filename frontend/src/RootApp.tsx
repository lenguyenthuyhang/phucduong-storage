// tailwind css
import './style/index.css';
import './style/app.scss';

import { Suspense } from 'react';
import {lazy} from "@loadable/component"
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import PageLoader from '@/components/PageLoader';

const App = lazy(() => import('./app'));

export default function RoutApp() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<PageLoader />}>
          <App />
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
}
