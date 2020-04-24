import React, { useRef, useEffect } from 'react';
import {
  Typography, Button, Tag, Tooltip, Row,
} from 'antd';
import { PlusOutlined, MinusOutlined, CopyOutlined } from '@ant-design/icons';
import { fonts } from '../data/fonts';
import './FontPreview.scss';

const { Title } = Typography;

type EditorProps = {
  font: (typeof fonts)[0];
  theme: string;
  mode: string;
  code: string;
  setCode: (code: string) => void;
  toggleCompare: (name: string) => void;
  isInCompare: boolean;
};

// 2 weeks in milliseconds
const newPeriod = 2 * 7 * 24 * 60 * 60 * 1000;

export const FontPreview = ({
  font, theme, mode, code, setCode, toggleCompare, isInCompare,
}: EditorProps) => {
  const editorElementRef = useRef<HTMLDivElement | null>(null);
  const codeMirrorRef = useRef<CodeMirror.Editor | null>(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;
  useEffect(() => {
    if (editorElementRef.current) {
      codeMirrorRef.current = window.CodeMirror(editorElementRef.current!, {
        value: code,
        mode,
        theme,
        lineNumbers: true,
        viewportMargin: Infinity,
        scrollbarStyle: 'null',
      });
    }
  }, []);

  useEffect(() => {
    const updateMode = () => {
      codeMirrorRef.current?.setOption('mode', modeRef.current);
    };
    const refreshEditor = () => {
      setTimeout(() => {
        codeMirrorRef.current?.refresh();
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
    codeMirrorRef.current?.setValue(code);
  }, [code]);

  useEffect(() => {
    codeMirrorRef.current?.setOption('theme', theme);
  }, [theme]);

  useEffect(() => {
    codeMirrorRef.current?.setOption('mode', mode);
  }, [mode]);

  const className = font.familyName.replace(/\s/g, '');
  const isFree = (font.price || 0) === 0;
  const isNew = font.dateAdded && (Date.now() - new Date(font.dateAdded).valueOf() < newPeriod);

  const applyCode = () => {
    const newCode = codeMirrorRef.current!.getValue();
    setCode(newCode);
  };

  return (
    <div className={className}>
      <link key={font.srcLink} rel="stylesheet" href={font.srcLink} />
      <style>
        {`
        .${className} .font-name, .${className} .CodeMirror {
          font-family: ${font.familyName}, Comic Sans MS !important;
        }
      `}
      </style>

      <div className="font-header">
        <Row align="middle">
          <Tooltip className="font-compare" title={isInCompare ? 'Remove from compare' : 'Add to compare'}>
            <Button shape="circle" icon={isInCompare ? <MinusOutlined /> : <PlusOutlined />} onClick={() => { toggleCompare(font.displayName); }} />
          </Tooltip>
          <Title className="font-name" level={4}>{font.displayName}</Title>
        </Row>
        <Row align="middle" justify="space-between">
          <Row className="font-labels" align="middle">
            {isFree ? (
              <Tag color="#87d068">
                <span role="img" aria-label="free">🎁</span>
                Free
              </Tag>
            ) : (
              <Tag color="#fa8c16">
                <span role="img" aria-label="paid">💰</span>
                {font.price}
              </Tag>
            )}
            {font.ligatures && (
              <Tag color="#108ee9">
                <span role="img" aria-label="ligatures">🔗</span>
                Ligatures
              </Tag>
            )}
            {isNew && (
              <Tag color="#ec407a">
                <span role="img" aria-label="new">🥳</span>
                New
              </Tag>
            )}
          </Row>
          <Button type="link" href={font.webPage} target="_blank" rel="noopener noreferrer">
            get font
          </Button>
        </Row>
      </div>
      <div className="codemirror-wrapper">

        <div className="codemirror-container" ref={editorElementRef} />
        <div className="codemirror-buttons">
          <Button shape="round" onClick={applyCode} icon={<CopyOutlined />}>
            Copy code to all
          </Button>
        </div>
      </div>
    </div>
  );
};
