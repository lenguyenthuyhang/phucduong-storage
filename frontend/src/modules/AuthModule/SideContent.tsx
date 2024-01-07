import { Layout, Typography, Flex } from 'antd';
import logo from '@/style/images/logo-icon.svg';
import { useThemeToken } from '@/style/hooks';

const { Content } = Layout;
const { Title } = Typography;

export default function SideContent() {
  const { colorPrimary } = useThemeToken();
  
  return (
    <Content className="h-[100%]">
      <Flex align="center" justify="center" vertical className="h-[100%]">
        <img
          src={logo}
          alt="Phúc Dương Storage"
          style={{ margin: '0 auto 40px', display: 'block' }}
          height={63}
          width={220}
        />
        <Title
          level={2}
          style={{
            color: colorPrimary,
            fontWeight: "700"
          }}
        >
          Phúc Dương Storage
        </Title>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        ></div>
      </Flex>
    </Content>
  );
}
