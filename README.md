# react-minimap

[![NPM](https://img.shields.io/npm/v/react-minimap.svg?style=flat-square)](https://www.npmjs.com/package/react-minimap)

A minimap for React based on [jquery-minimap](https://github.com/john-bai/jquery-minimap)

## Demo

[react-minimap](https://jeremy-carbonne.github.io/react-minimap/)

## Installation

`npm i --save react-minimap`

## Usage
```js
import Minimap from 'react-minimap';
```

```html
<Minimap selector=".card">
	<div className="card">
		<h1>Title</h1>
	</div>
	<div className="card">
		<h1>Title 2</h1>
		<div className="card">
			<h1>Titles are never rendered by the Minimap</h1>
		</div>
	</div>
</Minimap>
```