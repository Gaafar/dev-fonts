import { Helmet } from 'react-helmet';
import React, {
  useRef, useEffect, useState,
} from 'react';
import { Select, Typography } from 'antd';
import Layout from '../components/layout';
import { languages } from '../data/languages';
import { code } from '../data/code';
import { fonts } from '../data/fonts';
import { themes } from '../data/themes';

const { Title } = Typography;
const { Option } = Select;

const config = {};

type EditorProps = { font: (typeof fonts)[0], theme:string, mode: string };
const Editor = ({ font, theme, mode }: EditorProps) => {
  const editorElementRef = useRef(null);
  const codemirrorRef = useRef(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    if (editorElementRef.current) {
      codemirrorRef.current = window.CodeMirror(editorElementRef.current, {
        value: code,
        mode,
        theme,
        matchBrackets: true,
        lineNumbers: true,
        viewportMargin: Infinity,
        scrollBarStyle: null,
      });
    }
  }, []);

  useEffect(() => {
    const updateMode = () => {
      codemirrorRef.current.setOption('mode', modeRef.current);
    };

    const refreshEditor = () => {
      setTimeout(() => {
        console.log('refresh');
        codemirrorRef.current.refresh();
      }, 100);
    };

    document.addEventListener('mode-loaded', updateMode, false);
    document.addEventListener('DOMContentLoaded', refreshEditor, false);
    // document.addEventListener(`font-loaded-${font.familyName}`, refreshEditor, false);

    return () => {
      document.removeEventListener('mode-loaded', updateMode);
      document.removeEventListener('DOMContentLoaded', refreshEditor);

      // document.removeEventListener(`font-loaded-${font.familyName}`, refreshEditor);
    };
  }, []);

  useEffect(() => {
    codemirrorRef.current.setOption('theme', theme);
  }, [theme]);

  useEffect(() => {
    codemirrorRef.current.setOption('mode', mode);
  }, [mode]);

  const className = font.familyName.replace(/\s/g, '');

  return (
    <div className={className}>
      {font.srcLinks.map((srcLink) => (
        <link key={srcLink} rel="stylesheet" href={srcLink} onLoad={() => { document.dispatchEvent(new CustomEvent(`font-loaded-${font.familyName}`)); }} />
      ))}
      <style>
        {`
        .${className} .CodeMirror {
          font-family: ${font.familyName}, Comic Sans MS !important;
        }
      `}
      </style>

      <Title level={2} style={{ marginTop: 20 }}>{font.displayName}</Title>
      <a target="_blank" rel="noopener noreferrer" href={font.webPage}>
        get this font
      </a>
      <div className="codemirror-container" ref={editorElementRef} />
    </div>
  );
};

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

        {/* <label htmlFor="theme-selector">Theme</label>
        <select id="theme-selector" value={theme} onChange={onThemeChange}>
          {themes.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select> */}

        {/* <label htmlFor="theme-selector">Theme</label>
        <select id="theme-selector" value={theme} onChange={onThemeChange}>
          {themes.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      */}

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

        <label htmlFor="language-selector">Language</label>
        <Select
          id="language-selector"
          showSearch
          style={{ width: 200 }}
          value={language}
          onChange={onLanguageChange}
        >
          {languages.map(({ name }) => (
            <Option key={name} value={name}>
              {name}
            </Option>
          ))}
        </Select>

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
          <Editor
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
