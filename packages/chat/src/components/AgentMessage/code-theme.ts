import { COLORS } from '@/styles/colors';

export default {
  'code[class*="language-"]': {
    color: '#F1F2F2',
    textShadow: '0 1px rgba(0, 0, 0, 0.3)',
    fontFamily: "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#F1F2F2',
    textShadow: '0 1px rgba(0, 0, 0, 0.3)',
    fontFamily: "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    padding: '1em',
    margin: '.5em 0',
    overflow: 'auto',
    borderRadius: '0.3em',
    background: COLORS.NEUTRAL_DARK[600],
  },
  ':not(pre) > code[class*="language-"]': {
    background: '#1d1f21',
    padding: '.1em',
    borderRadius: '.3em',
  },
  comment: {
    color: '#F1F2F2',
  },
  prolog: {
    color: '#F1F2F2',
  },
  doctype: {
    color: '#F1F2F2',
  },
  cdata: {
    color: '#F1F2F2',
  },
  punctuation: {
    color: '#c5c8c6',
  },
  '.namespace': {
    Opacity: '.7',
  },
  property: {
    color: '#F1F2F2',
  },
  keyword: {
    color: '#96CBFE',
  },
  tag: {
    color: '#96CBFE',
  },
  'class-name': {
    color: '#FFFFB6',
    textDecoration: 'underline',
  },
  boolean: {
    color: '#99CC99',
  },
  constant: {
    color: '#99CC99',
  },
  symbol: {
    color: '#f92672',
  },
  deleted: {
    color: '#f92672',
  },
  number: {
    color: '#FF73FD',
  },
  selector: {
    color: '#A8FF60',
  },
  'attr-name': {
    color: '#A8FF60',
  },
  string: {
    color: '#B4D6E4',
  },
  char: {
    color: '#A8FF60',
  },
  builtin: {
    color: '#A8FF60',
  },
  inserted: {
    color: '#A8FF60',
  },
  variable: {
    color: '#C6C5FE',
  },
  operator: {
    color: '#EDEDED',
  },
  entity: {
    color: '#FFFFB6',
    cursor: 'help',
  },
  url: {
    color: '#96CBFE',
  },
  '.language-css .token.string': {
    color: '#87C38A',
  },
  '.style .token.string': {
    color: '#87C38A',
  },
  atrule: {
    color: '#F9EE98',
  },
  'attr-value': {
    color: '#F9EE98',
  },
  function: {
    color: '#8ACD6F',
  },
  regex: {
    color: '#E9C062',
  },
  important: {
    color: '#fd971f',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
} as {
  [key: string]: React.CSSProperties;
};
