
Nodejs出现之前，前端开发没有统一的依赖管理工具，需要通过在html中引入大量JavaScript、CSS文件；
```js
<script src="./jquery.js"></script>  
<script src="./index.js"></script>  
<script src="./home.js"></script>
```

Nodejs出现后，前段开始在nodejs环境下开发，基于npm管理依赖，webpack则是将开发完成的代码转换为浏览器可执行代码，并解决一系列性能、兼容性等问题。
# webpack

webpack：依托于Nodejs生态，高度可配置性的JavaScript的静态模块打包工具，按照项目的依赖，将项目每一个模块组合成一个或多个bundles；

webpack目标：
- 管理大型项目依赖关系；
- 支持现代化的模块化开发；
- 提高加载性能：将多文件打包成少数文件，减少HTTP资源请求数量，提高页面加载效率；
- 统一资源处理：通过webpack的loader统一处理各种类型的资源；

## 构建项目

1. 创建简单项目
```shell
mkdir webpack-demo
pnpm init
pnpm add webpack webpack-cli -D
```

文件结构：
```shell
webpack-demo/
	│
	├── src/ 
	│   ├── index.js    # 程序主入口
	│   ├── data.js
	│ 
	├── index.html      # 入口hrml
	├── package.json    # 项目配置文件
```

index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=<device-width>, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello, webpack</h1>
</body>
</html>
```

2. 构建`data.js`，从`index.js`导入函数，模拟外部导入
```js
// -------- src/data.js --------
export function getProductList() {
    return ['Apple', 'Banana', 'Orange']
}

// -------- src/index.js --------
import { getProductList } from "./data";

const productList = getProductList();
console.log(productList);

// 操作dom
const ul = document.createElement("ul");
productList.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item;
    ul.appendChild(li);
})

document.body.appendChild(ul);
```

3. 执行`npx webpacl`即可打包，得到`dist/`目录，有一个`main.js`：一个压缩后的浏览器可执行js文件；
```js
(()=>{"use strict";const e=["Apple","Banana","Orange"];console.log(e);const n=document.createElement("ul");e.forEach((e=>{const t=document.createElement("li");t.innerText=e,n.appendChild(t)})),document.body.appendChild(n)})();
```

4. 将`main.js`引入到入口`index.html`中：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=<device-width>, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello, webpack</h1>
    <script src="./dist/main.js"></script>
</body>
</html>
```

5. 使用`live server`插件打开`index.html`
![](/images/webpack-demo-init.png)

## 使用loader加载静态资源

webpack 只能理解`JavaScript`和`JSON`文件。**loader** 让 webpack 能够去处理其他类型的文件，并转换为有效的模块；

在webpack中，一切都是模块，一个`css`文件、一个图片也是通过`import`将其导入使用；

1. 需要创建一个`**webpack.config.js**`来配置webpack，下面是最基础的配置，开启开发者模式：
```js
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    }
}
```

2. 安装loader：`pnpm add style-loader css-loader -D`

3. 配置loader：
```js
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]

    }
}
```

4. 使用静态资源：
	1. 创建一个图片元素到`index.js`
	2. 创建`style.css`
```shell
webpack-demo/
	│
	├── src/ 
	│   ├── assets/
	│          ├── penguin.jpg   # 新增静态资源
	│   ├── index.js
	│   ├── data.js
	│   ├── style.css    # 新增css文件
	│ 
	├── index.html
	├── package.json
```

5. 引入`css`和`图片`到`index.js`：
```js
import { getProductList } from "./data";
import "./style.css";
import PenguinImg from "./assets/penguin.jpg";

// 创建图片元素
const img = document.createElement("img");
img.src = PenguinImg;
document.body.appendChild(img);

// 获取数据，创建列表
const productList = getProductList();
console.log(productList);

const ul = document.createElement("ul");
productList.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item;
    ul.appendChild(li);
})

document.body.appendChild(ul);
```

6. 执行`npx webpack`打包，然后查看index.html：
![](/images/webpack-demo-static.png)


## 使用插件自动生成入口html

1. 导入plugin：`pnpm add html-webpack-plugin -D`
2. 配置`webpack.config.js`：
```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'hello webpack'  // 配置插件
        })
    ]
}
```

3. 执行打包：`npx webpack`
4. 使用`live server`打开`/dist/index.html`：http://127.0.0.1:5500/dist/index.html

## 浏览器JS兼容：ES6转ES5

使用`babel-loader`兼容低版本浏览器：

1. 引入loader：`pnpm add babel-loader @babel/core @babel/preset-env -D`
2. 配置loader：将`js`文件通过`babel-loader`进行转换：
	1. exclude：指定哪些代码不转译；
	2. use：指定配置哪些loader；
	3. loader：指定loader名称；
	4. options：loader的配置参数
```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'hello webpack'   // 配置插件
        })
    ]
}
```
3. 执行打包：`npx webpack`
4. 查看`dist/index.js`，搜索`foreach`可以看到箭头函数转换为了ES5写法：
```js
// 转译前代码：
productList.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item;
    ul.appendChild(li);
})

// 转译后代码：
productList.forEach(function (item) {\n  var li = document.createElement(\"li\");\n  li.innerText = item;\n  ul.appendChild(li);\n});
// ....
```

## 压缩代码

插件：terser-webpack-plugin

引入：`pnpm add terser-webpack-plugin -D`

```js
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
	// ... 
	// 增加配置：
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
}
```

打包之后，代码的空白都被删去，变量都被简化；

## 开发服务器

依赖：`pnpm add webpack-dev-server -D`

```js
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    },
    devServer: {
        static: './dist',  // 开发服务器：指定打包后的目录
    },
    // .....
}
```

在`package.json`中加入启动脚本，指定使用webpack dev server：

```js
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve --open"
  },
  // .....
}
```

启动服务器：`pnpm start`


## 路径别名

将一个符号直接绑定到`src`目录

```js
const path = require('path');

module.exports = {
    // 其他配置项...
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
};
```