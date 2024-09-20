import { PureComponent } from 'react';
import type { Options } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import { styled } from '@/styles';

import { schema, transformURL } from './schema';

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
  urlTransform: transformURL,
  rehypePlugins: [rehypeRaw, [rehypeSanitize, schema]],
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

class Markdown extends PureComponent<Options> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: Readonly<Options>): void {
    if (prevProps.children !== this.props.children) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <>Couldn't render markdown.</>;
    }

    return <MarkdownText {...this.props} />;
  }
}

export default Markdown;
