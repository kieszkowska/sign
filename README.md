# sign

>

[![NPM](https://img.shields.io/npm/v/sign.svg)](https://www.npmjs.com/package/sign) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save sign
```

## Usage

```jsx
import React, { Component } from 'react'

import ReactSign from 'sign'

class Example extends Component {
  render () {
    return (
        <ReactSign width={600}
                   height={200}
                   strokeStyle={'black'}
                   lineWith={1}
        />
    )
  }
}
```

## Configuration

| Prop               | Type               | Default value        | Description                 |
| ------------------ | ------------------ | -------------------- | --------------------------- |
| width              | *number*           | *300*                | Width of sign container     |
| height             | *number*           | *100*                | Height of sign container    |
| strokeStyle        | *string*           | *"rgb(13, 71, 161)"* | Line color                  |
| lineWith           | *number*           | *2*                  | Line width                  |

## License

MIT © [kieszkowska](https://github.com/kieszkowska)
