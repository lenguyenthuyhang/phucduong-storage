import dayjs from 'dayjs';
import { Switch, Tag } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { countryList } from '@/utils/countryList';
import { generate as uniqueId } from 'shortid';

export const dataForRead = ({ fields, translate }: { fields: any; translate: any }) => {
  let columns: { title: any; dataIndex: any; isDate: boolean }[] = [];

  Object.keys(fields).forEach((key) => {
    let field = fields[key];
    columns.push({
      title: field.label ? translate(field.label) : translate(key),
      dataIndex: field.dataIndex ? field.dataIndex.join('.') : key,
      isDate: field.type === 'date',
    });
  });

  return columns;
};

export function dataForTable({
  fields,
  translate,
  moneyFormatter,
}: {
  fields: any;
  translate: any;
  moneyFormatter: any;
}) {
  let columns: { title: any; dataIndex: any }[] = [];

  Object.keys(fields).forEach((key) => {
    let field = fields[key];
    const keyIndex = field.dataIndex ? field.dataIndex : [key];

    const component = {
      boolean: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        onCell: () => ({
          props: {
            style: {
              width: '60px',
            },
          },
        }),
        render: (_: any, record: { [x: string]: boolean | undefined }) => (
          <Switch
            checked={record[key]}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        ),
      },
      date: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (
          _: any,
          record: { [x: string]: string | number | Date | dayjs.Dayjs | null | undefined }
        ) => {
          const date = dayjs(record[key]).format('DD/MM/YYYY');
          return (
            <Tag bordered={false} color={field.color || getRandomColor()}>
              {date}
            </Tag>
          );
        },
      },
      currency: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        onCell: () => {
          return {
            style: {
              textAlign: 'right',
              whiteSpace: 'nowrap',
            },
          };
        },
        render: (_: any, record: { [x: string]: any }) => moneyFormatter({ amount: record[key] }),
      },
      tag: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_: any, record: { [x: string]: any }) => {
          return (
            <Tag bordered={false} color={field.color}>
              {record[key] && translate(record[key])}
            </Tag>
          );
        },
      },
      array: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_: any, record: { [x: string]: any[] }) => {
          return record[key].map((x) => (
            <Tag bordered={false} key={`${uniqueId()}`} color={field.colors[x]}>
              {translate(x)}
            </Tag>
          ));
        },
      },
      country: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_: any, record: { [x: string]: string }) => {
          const selectedCountry = countryList.find((obj) => obj.value === record[key]);

          return (
            <Tag bordered={false} color={field.color || getRandomColor()}>
              {selectedCountry?.label && translate(selectedCountry.label)}
            </Tag>
          );
        },
      },
    };

    const defaultComponent = {
      title: field.label ? translate(field.label) : translate(key),
      dataIndex: keyIndex,
    };

    const type = field.type.toLowerCase();

    if (!field.disableForTable) {
      Object.keys(component).includes(type)
        ? columns.push(component[type])
        : columns.push(defaultComponent);
    }
  });

  return columns;
}

function getRandomColor() {
  const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ];

  // Generate a random index between 0 and the length of the colors array
  const randomIndex = Math.floor(Math.random() * colors.length);

  // Return the color at the randomly generated index
  return colors[randomIndex];
}
