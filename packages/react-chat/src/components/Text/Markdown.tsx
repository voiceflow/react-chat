import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { styled } from '@/styles';

const MarkdownText = styled(ReactMarkdown, {
  blockquote: {
    marginLeft: 0,
    paddingLeft: '$4',
    borderLeft: '3px solid $medGrey',
  },
  code: {
    color: '#e83e8c',
    whiteSpace: 'pre-wrap',
  },
  p: {
    marginTop: 0,
    whiteSpace: 'pre-wrap',
  },
  'img,video': {
    maxWidth: '100%',
    borderRadius: '$2',
    marginBottom: '$4',
  },
  'ol,ul': {
    paddingInlineStart: '$5',
  },
  '> *:first-child, blockquote>:first-child': {
    marginTop: 0,
  },
  '> *:last-child, blockquote>:last-child': {
    marginBottom: 0,
  },
});

MarkdownText.defaultProps = {
  remarkPlugins: [remarkGfm],
  components: {
    a: ({ node, href, children, ...props }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
  },
  remarkRehypeOptions: {
    handlers: {
      break: () => [{ type: 'text', value: '\n' }],
    },
  },
};

export default MarkdownText;
