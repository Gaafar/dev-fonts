import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import {
  Select, Checkbox, AutoComplete, Badge, Switch, Row, Col, Typography, Button,
} from 'antd';
import { GithubOutlined, TwitterOutlined } from '@ant-design/icons';
import Layout from '../components/layout';
import { languages } from '../data/languages';
import { fonts } from '../data/fonts';
import { themes } from '../data/themes';
import { code as codeSample } from '../data/code';
import './index.scss';
import { FontPreview } from '../components/FontPreview';

const { Option } = Select;
const { Title } = Typography;

const shareMessage = `List of the best coding fonts with live preview & themes 😍 https://devfonts.gafi.dev/
by @imGaafar`;

export default () => {
  const [code, setCode] = useState(codeSample);
  const [isCompareMode, setCompareMode] = useState(false);
  const [compareSet, setCompareSet] = useState(new Set<string>());

  const toggleCompare = (fontName: string) => {
    if (compareSet.has(fontName)) {
      compareSet.delete(fontName);
    } else {
      compareSet.add(fontName);
    }
    setCompareSet(new Set([...compareSet]));
  };

  const [theme, setTheme] = useState('material-palenight');
  const onThemeChange = (value: string) => {
    setTheme(value);
  };

  const [language, setLanguage] = useState('JavaScript');
  const onLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const [filters, setFilters] = useState({ free: false, ligatures: false, name: '' });

  const mode = languages.find((l) => l.name === language)?.mode!;

  const filteredFonts = fonts.filter((font) => {
    if (isCompareMode && !compareSet.has(font.displayName)) {
      return false;
    }

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
          // @ts-ignore
          onLoad='document.dispatchEvent(new CustomEvent("mode-loaded"))'
        />

        <link
          rel="stylesheet"
          href={`https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/${theme}.css`}
        />
      </Helmet>
      <Layout>
        <Row justify="space-between">
          <Row align="bottom">
            <Title level={2} style={{ fontFamily: 'Courier New, monospace', marginBottom: '1rem' }}>
              Dev Fonts
            </Title>
          </Row>
          <Row justify="end" className="links-row">
            <Button
              className="no-after"
              type="link"
              href="https://twitter.com/imGaafar"
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: 0 }}
            >
              by Gafi
            </Button>
            <Button
              className="no-after"
              type="link"
              icon={<GithubOutlined />}
              href="https://github.com/Gaafar/dev-fonts"
              target="_blank"
              rel="noopener noreferrer"
            />
            <Button
              className="no-after"
              type="link"
              icon={<TwitterOutlined />}
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
            />
            <iframe src="https://github.com/sponsors/Gaafar/button" title="Sponsor Gaafar" height="35" width="116" style={{ border: 0 }}></iframe>
          </Row>
        </Row>
        <Row align="middle">
          <Col span={24} md={12} className="row-spacer">
            <Row align="middle">
              <Col span={6}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="theme-selector">Theme</label>
              </Col>
              <Col>
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
              </Col>
            </Row>
          </Col>
          <Col span={24} md={12} className="row-spacer">
            <Row align="middle">
              <Col span={6}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="language-selector">Language</label>
              </Col>
              <Col>
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
              </Col>
            </Row>
          </Col>
        </Row>

        <Row align="middle" className="filter-wrapper row-spacer">
          <Col span={9} md={5}>
            <span>
              Filter fonts
            </span>
            <Badge count={filteredFonts.length} style={{ backgroundColor: '#52c41a' }} />
          </Col>
          <Col span={14} md={8}>
            <AutoComplete
              className="autocomplete"
              style={{ width: '100%', maxWidth: 200 }}
              options={fonts.map(({ displayName }) => ({ value: displayName }))}
              placeholder="search by name"
              filterOption={(inputValue, option) => option?.value
                .toLowerCase().includes(inputValue.toLowerCase())}
              onSelect={(value) => {
                setFilters((current) => ({ ...current, name: value }));
              }}
              onChange={(value) => {
                if (!value) { setFilters((current) => ({ ...current, name: value })); }
              }}
            />
          </Col>

          <Col span={9} md={1} />
          <Col>
            <Checkbox
              checked={filters.free}
              onChange={(e) => {
                setFilters((current) => ({ ...current, free: e.target.checked }));
              }}
            >
              Free
            </Checkbox>
            <Checkbox
              checked={filters.ligatures}
              onChange={(e) => {
                setFilters((current) => ({ ...current, ligatures: e.target.checked }));
              }}
            >
              Ligatures
            </Checkbox>
          </Col>
        </Row>

        <Row align="middle" className="row-spacer">
          Compare
          {' '}
          <Switch className="compare-switch" checked={isCompareMode} onChange={(value) => { setCompareMode(value); }} />
          {' '}
          { compareSet.size > 0 ? [...compareSet].join(', ') : 'add fonts to compare'}
        </Row>
        <style>
          {`
            .codemirror-container {
              height: auto;
            }

            .CodeMirror {
              height: auto;
              font-variant-ligatures: contextual;
              padding-top: 6px;
              padding-bottom: 6px;
              border-radius: 6px;
              font-size: 1.3em;
            }
          `}
        </style>
        <div>
          {filteredFonts.map((font) => (
            <FontPreview
              key={font.familyName}
              font={font}
              theme={theme}
              mode={mode}
              code={code}
              setCode={setCode}
              toggleCompare={toggleCompare}
              isInCompare={compareSet.has(font.displayName)}
            />
          ))}
        </div>
      </Layout>
    </>
  );
};
