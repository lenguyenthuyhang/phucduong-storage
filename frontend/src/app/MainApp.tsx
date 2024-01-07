import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
import { selectAppSettings } from '@/redux/settings/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'antd';

import { useAppContext } from '@/context/appContext';

import Navigation from '@/app/Navigation/NavigationContainer';
import HeaderContent from '@/app/Header/HeaderContainer';

import { settingsAction } from '@/redux/settings/actions';
import { translateAction } from '@/redux/translate/actions';

import AppRouter from '@/router/AppRouter';

import useResponsive from '@/hooks/useResponsive';

import storePersist from '@/redux/storePersist';
import { useAppDispatch } from '@/redux/store';

export default function MainApp() {
  const { Content } = Layout;

  const { state: stateApp } = useAppContext();
  const { isNavMenuClose } = stateApp;

  const { isMobile } = useResponsive();

  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    dispatch(settingsAction.list({ entity: 'setting' }));
  }, []);

  const defaultLang = useSelector(selectAppSettings);

  useEffect(() => {
    const { idurar_app_language } = defaultLang;
    const { loadDefaultLang } = storePersist.get('firstLogin');
    if (idurar_app_language && !loadDefaultLang) {
      dispatch(translateAction.translate(idurar_app_language));
      window.localStorage.setItem('firstLogin', JSON.stringify({ loadDefaultLang: true }));
    }
  }, [defaultLang]);

  return (
    <Layout hasSider>
      <Navigation />

      {isMobile ? (
        <Layout style={{ marginLeft: 0 }}>
          <HeaderContent />
          <Content
            style={{
              margin: '40px auto 30px',
              overflow: 'initial',
              width: '100%',
              padding: '0 25px',
              maxWidth: 'none',
            }}
          >
            <AppRouter />
          </Content>
        </Layout>
      ) : (
        <Layout style={{ marginLeft: isNavMenuClose ? 80 : 240 }} className="bg-gray-200">
          <HeaderContent />
          <Content
            style={{
              margin: '30px auto 30px',
              overflow: 'initial',
              width: '100%',
              padding: '0 25px',
              // maxWidth: 1200,
            }}
          >
            <AppRouter />
          </Content>
        </Layout>
      )}
    </Layout>
  );
}
