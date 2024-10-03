export const MARKDOWN_FIXTURE = `
 
# H1 Howdy Voiceflow  
## H2 Howdy Voiceflow
### H3 Howdy Voiceflow
#### H4 Howdy Voiceflow
##### H5 Howdy Voiceflow
###### H6 Howdy Voiceflow

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------

Howdy folks, how you doing? This is a normal, just standard string inside a markdown file. How does 
my line wrapping look? I hope it looks good. I'm going to keep typing until I hit the end of the

# Emphasis

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

# Lists
1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses

1. Make my changes
    1. Fix bug
    2. Improve formatting
        - Make the headings bigger
2. Push my commits to GitHub
3. Open a pull request
    * Describe my changes
    * Mention all the members of my team
        * Ask for feedback

# Task lists

- [x] Finish my changes
- [ ] Push my commits to GitHub
- [ ] Open a pull request

# Links

[I'm an inline-style link to Voiceflow](https://www.voiceflow.com)

# Images

Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

# Tables

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

# Blockquotes

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.


# Horizontal Rules

Via Dashes

---
Via Underscores
___
`;
