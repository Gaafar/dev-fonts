import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import {
  Select, Checkbox, AutoComplete, Badge,
} from 'antd';
import Layout from '../components/layout';
import { languages } from '../data/languages';
import { fonts } from '../data/fonts';
import { themes } from '../data/themes';
import { code as codeSample } from '../data/code';
import './index.scss';
import { FontPreview } from '../components/FontPreview';

const { Option } = Select;

const config = {};

export default () => {
  const [code, setCode] = useState(codeSample);

  const [theme, setTheme] = useState('material-palenight');
  const onThemeChange = (value) => {
    setTheme(value);
  };

  const [language, setLanguage] = useState('JavaScript');
  const onLanguageChange = (value) => {
    setLanguage(value);
  };

  const [filters, setFilters] = useState({ free: false, ligatures: false, name: '' });

  const mode = languages.find((l) => l.name === language)?.mode!;

  const filteredFonts = fonts.filter((font) => {
    if (filters.free && font.price) {
      return false;
    }

    if (filters.ligatures && !font.ligatures) {
      return false;
    }

    if (filters.name && !font.displayName.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <>
      <Helmet>
        <script
          src={`https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/mode/${mode}/${mode}.min.js`}
          onLoad='document.dispatchEvent(new CustomEvent("mode-loaded"))'
        />

        <link
          rel="stylesheet"
          href={`https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/${theme}.css`}
        />
      </Helmet>
      <Layout>

        <div className="dropdown-wrapper">
          <div>
            <label htmlFor="theme-selector">Theme</label>
            <Select
              id="theme-selector"
              showSearch
              style={{ width: 200 }}
              value={theme}
              onChange={onThemeChange}
            >
              {themes.map(({ name }) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="language-selector">Language</label>
            <Select
              id="language-selector"
              showSearch
              style={{ width: 150 }}
              value={language}
              onChange={onLanguageChange}
            >
              {languages.map(({ name }) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="filter-wrapper">
          <div>

            <label>
              Filter fonts
            </label>
            <Badge count={filteredFonts.length} style={{ backgroundColor: '#52c41a' }} />

            <AutoComplete
              className="autocomplete"
              style={{ width: 200 }}
              options={fonts.map(({ displayName }) => ({ value: displayName }))}
              placeholder="type font name"
              filterOption={(inputValue, option) => option.value.toLowerCase().includes(inputValue.toLowerCase())}
              onSelect={(value, option) => { setFilters((current) => ({ ...current, name: value })); }}
              onChange={(value) => { if (!value) { setFilters((current) => ({ ...current, name: value })); } }}
            />

          </div>
          <div>
            <Checkbox
              checked={filters.free}
              onChange={(e) => { setFilters((current) => ({ ...current, free: e.target.checked })); }}
            >
              Free
            </Checkbox>

            <Checkbox
              checked={filters.ligatures}
              onChange={(e) => { setFilters((current) => ({ ...current, ligatures: e.target.checked })); }}
            >
              Ligatures
            </Checkbox>
          </div>
        </div>
        <style>
          {`
            .codemirror-container {
              height: auto;
            }

            .CodeMirror {
              height: auto;
              font-size: ${config.fontSize};
              line-height: ${config.lineHeight};
              font-variant-ligatures: contextual;
              padding-top: 6px;
              padding-bottom: 6px;
              border-radius: 6px;
            }
          `}
        </style>
        {filteredFonts.map((font) => (
          <FontPreview
            key={font.familyName}
            font={font}
            theme={theme}
            mode={mode}
            code={code}
            setCode={setCode}
          />
        ))}
      </Layout>
    </>
  );
};
