import React, { useRef, useEffect } from 'react';
import { Typography, Button, Tag } from 'antd';
import { code } from '../data/code';
import { fonts } from '../data/fonts';
import './FontPreview.scss';


const { Title } = Typography;

type EditorProps = {
  font: (typeof fonts)[0];
  theme: string;
  mode: string;
};

export const FontPreview = ({ font, theme, mode }: EditorProps) => {
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
  const isFree = (font.price || 0) === 0;
  return (
    <div className={className}>
      {font.srcLinks.map((srcLink) => (<link key={srcLink} rel="stylesheet" href={srcLink} />))}
      <style>
        {`
        .${className} .CodeMirror {
          font-family: ${font.familyName}, Comic Sans MS !important;
        }
      `}
      </style>

      <div className="font-header">
        <div className="font-labels">
          <Title className="font-name" level={2}>{font.displayName}</Title>
          {isFree && <Tag color="#87d068">💵free</Tag>}
          {font.ligatures && <Tag color="#fa8c16">🔗ligatures</Tag>}
        </div>

        <Button type="link" href={font.webPage} target="_blank" rel="noopener noreferrer">
          get this font
        </Button>
      </div>

      <div className="codemirror-container" ref={editorElementRef} />
    </div>
  );
};
