<h1 align="center">
<span style="color:rgb(8, 126, 164)">useReact</span>
<br>
Collection of React Hooks
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@dedalik/use-react" target="__blank"><img src="https://img.shields.io/npm/v/%40dedalik%2Fuse-react" alt="NPM version"></a>
<a href="https://usereact.org" target="__blank"><img src="https://img.shields.io/badge/documents%20&%20demos-8A2BE2" alt="Docs & Demos"></a>
<img alt="Code size" src="https://img.shields.io/github/languages/code-size/dedalik/use-react">
<br />
<img alt="License" src="https://img.shields.io/github/license/dedalik/use-react">

</p>

## Features

- [**Engaging Documentation & Live Demos**](https://usereact.org)
- **React Support**: Compatible with React.js 17 and above
- **Robust Typing**: Crafted in [TypeScript](https://www.typescriptlang.org/) with comprehensive [TS Docs](https://github.com/microsoft/tsdoc)
- **Server-Side Rendering (SSR) Compatible**
- **Adaptable**: Customizable event filters and targets for various needs

## Usage

```tsx
import React from 'react'
import { useTextareaAutoSize } from '@dedalik/use-react'

const TextareaAutoSize: React.FC = () => {
  const [text, setText] = useState('')
  const { textareaRef } = useTextareaAutoSize({ input: text })

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value
    setText(newValue)
  }

  return <textarea ref={textareaRef} value={text} onChange={handleChange} style={{ resize: 'none' }} />
}

export default TextareaAutoSize
```

Refer to [functions list](https://usereact.org/functions) or [documentations](https://usereact.org/) for more details.

## Install

```bash
npm i @dedalik/use-react
```

## Thanks

This project is heavily inspired by the following awesome projects.

- [streamich/react-use](https://github.com/streamich/react-use)
- [@uidotdev/usehooks](https://usehooks.com/)
- [@vueuse/core](https://vueuse.org/)
- [kripod/react-hooks](https://github.com/kripod/react-hooks)

## 📄 License

[MIT License](https://github.com/dedalik/use-react/blob/main/LICENSE) © 2023-PRESENT [dedalik](https://github.com/dedalik)
