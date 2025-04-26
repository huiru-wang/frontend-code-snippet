import { getProductList } from "@/data";
import "@/style.css";
import PenguinImg from "@/assets/penguin.jpg";

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