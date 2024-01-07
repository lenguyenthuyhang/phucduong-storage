import { useState, useEffect } from 'react';

import { ConfigProvider, ThemeConfig, theme } from 'antd';

import { useSelector } from 'react-redux';

import { selectLangState } from '@/redux/translate/selectors';

import antdLocale from './antdLocale';

type Props = {
  children: React.ReactNode;
};

export default function Localization({ children }: Props) {
  const { langCode, langDirection } = useSelector(selectLangState);

  const [locale, setLocal] = useState();
  const [direction, setDirection] = useState();

  useEffect(() => {
    const lang = antdLocale[langCode];
    setDirection(langDirection);
    setLocal(lang);
  }, [langCode]);

  return (
    <ConfigProvider
      direction={direction}
      locale={locale}
      theme={{
        token: {
          colorPrimary: '#6a66e3',
          colorInfo: '#6a66e3',
          colorSuccess: '#22c55e',
          colorWarning: '#ffc82c',
          colorError: '#ff5630',
          colorBgBase: '#ffffff',
          wireframe: false,
          borderRadius: 4
        },
        components: {
          Progress: {
            algorithm: true,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
