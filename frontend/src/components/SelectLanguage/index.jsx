import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import languages from '@/locale/languages';
import { selectLangCode } from '@/redux/translate/selectors';
import { translateAction } from '@/redux/translate/actions';
import useLanguage from '@/locale/useLanguage';

const SelectLanguage = () => {
  const translate = useLanguage();
  const dispatch = useDispatch();
  const langCode = useSelector(selectLangCode);

  return (
    <>
      <Select
        showSearch
        style={{ width: 130 }}
        placeholder={translate('select language')}
        value={langCode}
        defaultOpen={false}
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input.toLowerCase())}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().startsWith((optionB?.label ?? '').toLowerCase())
        }
        onSelect={(value) => {
          dispatch(translateAction.translate(value));
        }}
      >
        {languages.map((language) => (
          <Select.Option
            key={language.value}
            value={language.value}
            label={language.label.toLowerCase()}
            disabled={language.disabled}
          >
            <div className="demo-option-label-item">
              <span role="img" aria-label={language.label}>
                {language.icon}
              </span>
              {language.label}
            </div>
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

export default SelectLanguage;
