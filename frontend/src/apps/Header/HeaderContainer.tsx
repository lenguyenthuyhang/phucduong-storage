import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Breadcrumb, Dropdown, Layout } from 'antd';

import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';

import { checkImage } from '@/request';

import { selectCurrentAdmin } from '@/redux/auth/selectors';

import { useNavigate } from 'react-router-dom';

import { BASE_URL } from '@/config/serverApiConfig';

import useLanguage from '@/locale/useLanguage';
import SelectLanguage from '@/components/SelectLanguage';
import { ItemType } from 'antd/es/menu/hooks/useItems';

export default function HeaderContent() {
  const currentAdmin = useSelector(selectCurrentAdmin);
  const { Header } = Layout;

  const translate = useLanguage();

  const [hasPhotoprofile, setHasPhotoprofile] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (currentAdmin?.photo) {
        const result = await checkImage(BASE_URL + currentAdmin?.photo);
        setHasPhotoprofile(result);
      }
    }
    fetchData();
    return () => {
      false;
    };
  }, []);

  const ProfileDropdown = () => {
    const navigate = useNavigate();
    return (
      <div className="profileDropdown" onClick={() => navigate('/profile')}>
        <Avatar
          size="large"
          className="last"
          src={hasPhotoprofile ? BASE_URL + currentAdmin?.photo : null}
          style={{ color: '#f56a00', backgroundColor: !hasPhotoprofile ? '#fde3cf' : '#f9fafc' }}
        >
          {currentAdmin?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <div className="profileDropdownInfo">
          <p>
            {currentAdmin?.name} {currentAdmin?.surname}
          </p>
          <p>{currentAdmin?.email}</p>
        </div>
      </div>
    );
  };

  const DropdownMenu = ({ text }: { text: string }) => {
    return <span style={{}}>{text}</span>;
  };

  const items = [
    {
      label: <ProfileDropdown />,
      key: 'ProfileDropdown',
    },
    {
      type: 'divider',
    },
    {
      icon: <SettingOutlined />,
      key: 'settingProfile',
      label: (
        <Link to={'/profile'}>
          <DropdownMenu text={translate('profile_settings')} />
        </Link>
      ),
    },
    {
      icon: <SettingOutlined />,
      key: 'settingApp',
      label: <Link to={'/settings'}>{translate('app_settings')}</Link>,
    },
    {
      type: 'divider',
    },
    {
      icon: <LogoutOutlined />,
      key: 'logout',
      label: <Link to={'/logout'}>{translate('logout')}</Link>,
    },
  ] as ItemType[];
  return (
    <Header
      style={{
        padding: '0 20px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'flex-end',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        gap: '15px',
      }}
      className="shadow"
    >
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
        placement="bottomRight"
      >
        {/* <Badge dot> */}
        <Avatar
          className="last"
          src={hasPhotoprofile ? BASE_URL + currentAdmin?.photo : null}
          style={{
            color: '#f56a00',
            backgroundColor: !hasPhotoprofile ? '#fde3cf' : '#f9fafc',
            float: 'right',
            cursor: 'pointer',
          }}
          size="large"
        >
          {currentAdmin?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        {/* </Badge> */}
      </Dropdown>
      <SelectLanguage />
    </Header>
  );
}

//  console.log(
//    '🚀 Welcome to IDURAR ERP CRM! Did you know that we also offer commercial customization services? Contact us at hello@idurarapp.com for more information.'
//  );
