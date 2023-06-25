// eslint-disable-next-line import/named
import { CodeComponent } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// TODO: 枠が2重になってしまう部分の調査
const CodeBlockComponent: CodeComponent = ({ inline, className, children }) => {
  if (inline) {
    return <code className={className}>{children}</code>;
  }
  const match = /language-(\w+)/.exec(className || '');
  const language = match && match[1] ? match[1] : '';
  return <SyntaxHighlighter language={language}>{String(children).replace(/\n$/, '')}</SyntaxHighlighter>;
};

export default CodeBlockComponent;
