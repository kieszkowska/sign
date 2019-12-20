import React, { Component } from 'react'

import ReactSign from 'sign'

export default class App extends Component {
  render () {
    return (
      <div>
        <ReactSign width={600}
                   height={200}
                   strokeStyle={'black'}
                   lineWith={1}
        />
      </div>
    )
  }
}
