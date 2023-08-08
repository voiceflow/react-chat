import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';

import { styled } from '@/styles';

const MarkdownText = styled(Markdown, {
  '*': {
    whiteSpace: 'pre-wrap',
  },
  blockquote: {
    marginLeft: 0,
    paddingLeft: '$4',
    borderLeft: '3px solid $medGrey',
  },
  code: {
    color: '#e83e8c',
  },
  p: {
    marginTop: 0,
  },
  'img,video': {
    maxWidth: '100%',
    borderRadius: '$2',
    marginBottom: '$4',
  },
  'ol,ul': {
    paddingInlineStart: '$4',
  },
  '> *:last-child': {
    marginBottom: 0,
  },
  '> *:first-child': {
    marginTop: 0,
  },
});

const options: MarkdownToJSX.Options = {
  forceWrapper: true,
  overrides: {
    a: ({ children, ...props }) => (
      <a {...props} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

MarkdownText.defaultProps = {
  options,
};

export default MarkdownText;
