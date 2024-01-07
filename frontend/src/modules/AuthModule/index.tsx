import useLanguage from '@/locale/useLanguage';

import { Layout, Col, Divider, Typography, Flex } from 'antd';

import AuthLayout from '@/layout/AuthLayout';
import SideContent from './SideContent';
import SelectLanguage from '@/components/SelectLanguage';

import logo from '@/style/images/logo-icon.svg';
import { ReactElement } from 'react';
import { calc } from 'antd/es/theme/internal';

const { Content } = Layout;
const { Title } = Typography;

const AuthModule = ({
  authContent,
  AUTH_TITLE,
}: {
  authContent: ReactElement;
  AUTH_TITLE: string;
}) => {
  const translate = useLanguage();

  return (
    <AuthLayout sideContent={<SideContent />}>
      <Flex align="center" className="h-[56px] px-3">
        <SelectLanguage />
      </Flex>
      <Flex
        align="center"
        justify="center"
        style={{
          height: `calc(100% - 56px)`,
        }}
      >
        <Content className="max-w-[400px]">
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }} span={0}>
            <img
              src={logo}
              alt="Logo"
              style={{
                margin: '-70px auto 40px',
                display: 'block',
              }}
              height={63}
              width={220}
            />
            <div className="space20" />
          </Col>
          <Title level={1}>{translate(AUTH_TITLE)}</Title>

          <Divider />
          <div className="site-layout-content">{authContent}</div>
        </Content>
      </Flex>
    </AuthLayout>
  );
};

export default AuthModule;
