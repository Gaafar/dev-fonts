import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import { Select } from 'antd';
import Layout from '../components/layout';
import { languages } from '../data/languages';
import { fonts } from '../data/fonts';
import { themes } from '../data/themes';
import './index.scss';
import { FontPreview } from '../components/FontPreview';

const { Option } = Select;

const config = {};

export default () => {
  const [theme, setTheme] = useState('material-palenight');
  const onThemeChange = (value) => {
    setTheme(value);
  };

  const [language, setLanguage] = useState('JavaScript');
  const onLanguageChange = (value) => {
    setLanguage(value);
  };

  const mode = languages.find((l) => l.name === language)?.mode!;

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
        {fonts.map((font) => (
          <FontPreview
            key={font.familyName}
            font={font}
            theme={theme}
            mode={mode}
          />
        ))}
      </Layout>
    </>
  );
};
