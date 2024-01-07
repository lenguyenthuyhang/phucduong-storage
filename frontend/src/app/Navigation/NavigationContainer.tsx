import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Drawer, Layout, Menu, Typography, Flex, Tooltip } from 'antd';

import { useAppContext } from '@/context/appContext';

import useLanguage from '@/locale/useLanguage';
import logoIcon from '@/style/images/logo-icon.svg';
import { useNavigate } from 'react-router-dom';
import useResponsive from '@/hooks/useResponsive';

import { useThemeToken } from '@/style/hooks';

import {
  SettingOutlined,
  ContainerOutlined,
  FileSyncOutlined,
  TeamOutlined,
  UserOutlined,
  CreditCardOutlined,
  MenuOutlined,
  FileOutlined,
  ShopOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { Iconify } from '@/components/Icon';
import Scrollbar from '@/components/Scrollbar';

const { Sider } = Layout;

export default function Navigation() {
  const { isMobile } = useResponsive();

  return isMobile ? <MobileSidebar /> : <Sidebar collapsible={true} />;
}

const Sidebar = ({ collapsible = false }) => {
  // Existing code...
  const { colorPrimary } = useThemeToken();

  let location = useLocation();
  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));

  const translate = useLanguage();
  const navigate = useNavigate();

  const items = [
    {
      key: 'dashboard',
      icon: <Iconify icon="carbon:dashboard" size={20} />,
      label: <Link to={'/'}>{translate('dashboard')}</Link>,
    },
    {
      key: 'customer',
      icon: <Iconify icon="solar:user-check-line-duotone" size={20} />,
      label: <Link to={'/customer'}>{translate('customer')}</Link>,
    },
    {
      key: 'gallery',
      icon: <Iconify icon="solar:gallery-wide-line-duotone" size={20} />,
      label: <Link to={'/gallery'}>{translate('gallery')}</Link>,
    },
    {
      key: 'blog',
      icon: <Iconify icon="solar:document-add-line-duotone" size={20} />,
      label: <Link to={'/blog'}>{translate('blog')}</Link>,
    },
    {
      key: 'client',
      icon: <Iconify icon="solar:user-check-line-duotone" size={20} />,
      label: <Link to={'/client'}>{translate('client')}</Link>,
    },
    {
      key: 'people',
      icon: <UserOutlined />,
      label: <Link to={'/people'}>{translate('people')}</Link>,
    },
    {
      key: 'company',
      icon: <ShopOutlined />,
      label: <Link to={'/company'}>{translate('company')}</Link>,
    },
    {
      key: 'lead',
      icon: <FilterOutlined />,
      label: <Link to={'/lead'}>{translate('lead')}</Link>,
    },
    {
      key: 'offer',
      icon: <FileOutlined />,
      label: <Link to={'/offer'}>{translate('offer')}</Link>,
    },

    // { key: 'order', icon: <ShopOutlined />, label: <Link to={'/'}>Lead</Link> Order },
    // { key: 'inventory', icon: <InboxOutlined />, label: <Link to={'/'}>Lead</Link> Inventory },

    {
      key: 'invoice',
      icon: <ContainerOutlined />,
      label: <Link to={'/invoice'}>{translate('invoice')}</Link>,
    },
    {
      key: 'quote',
      icon: <FileSyncOutlined />,
      label: <Link to={'/quote'}>{translate('quote')}</Link>,
    },
    {
      key: 'payment',
      icon: <CreditCardOutlined />,
      label: <Link to={'/payment'}>{translate('payment')}</Link>,
    },
    // {
    //   key: 'employee',
    //   icon: <UserOutlined />,
    //   label: <Link to={'/employee'}>{translate('employee')}</Link>,
    // },
    {
      key: 'admin',
      icon: <TeamOutlined />,
      label: <Link to={'/admin'}>{translate('admin')}</Link>,
    },
    {
      label: translate('Settings'),
      key: 'settings',
      icon: <SettingOutlined />,
      children: [
        {
          key: 'generalSettings',
          label: <Link to={'/settings'}>{translate('general_settings')}</Link>,
        },
        // {
        //   key: 'emailTemplates',
        //   label: <Link to={'/email'}>{translate('email_templates')}</Link>,
        // },
        {
          key: 'paymentMode',
          label: <Link to={'/payment/mode'}>{translate('payment_mode')}</Link>,
        },
        {
          key: 'taxes',
          label: <Link to={'/taxes'}>{translate('taxes')}</Link>,
        },
        {
          key: 'about',
          label: <Link to={'/about'}>{translate('about')}</Link>,
        },
        // {
        //   key: 'advancedSettings',
        //   label: <Link to={'/settings/advanced'}>{translate('advanced_settings')}</Link>,
        // },
      ],
    },
  ];

  useEffect(() => {
    if (location)
      if (currentPath !== location.pathname) {
        if (location.pathname === '/') {
          setCurrentPath('dashboard');
        } else setCurrentPath(location.pathname.slice(1));
      }
  }, [location, currentPath]);
  
  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : collapsible}
      onCollapse={onCollapse}
      className="navigation shadow"
      style={{
        overflow: 'hidden',
        position: 'fixed',
        bottom: '0',
      }}
      theme={'light'}
      width={240}
      trigger={
        <Tooltip title={!isNavMenuClose ? translate('collapse') : translate('expand')}>
          <Flex align="center" justify="center" style={{ height: '100%' }}>
            <Iconify icon={!isNavMenuClose ? 'uiw:menu-fold' : 'uiw:menu-unfold'} size={18} />
          </Flex>
        </Tooltip>
      }
    >
      <Flex
        align="center"
        className="logo h-[64px] mx-6"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      >
        <img src={logoIcon} alt="Logo" className="h-[32px]" />

        <Typography.Text
          strong
          style={{
            opacity: showLogoApp ? 0 : 1,
            color: colorPrimary,
            fontSize: '15px',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.2s ease 0s',
            marginLeft: '10px',
          }}
        >
          Phúc Dương Storage
        </Typography.Text>
      </Flex>
      <Scrollbar
        style={{
          height: 'calc(100vh - 120px)',
        }}
      >
        <Menu items={items} mode="inline" theme={'light'} selectedKeys={[currentPath || "dashboard"]} />
      </Scrollbar>
    </Sider>
  );
};

const MobileSidebar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{ marginLeft: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <Drawer
        width={250}
        contentWrapperStyle={{
          boxShadow: 'none',
        }}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
        placement="left"
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <Sidebar collapsible={false} />
      </Drawer>
    </>
  );
};
