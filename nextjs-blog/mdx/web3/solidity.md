---
title: solidity keyword
keywords: [ethereum, solidity]
date: 2022-01-01
description: This is a description.
---

# Visibility

| Visibility | Within Contract | Outside Contracts | Child Contracts | External Contracts |
| ---------- | --------------- | ----------------- | --------------- | ------------------ |
| public     | Yes             | Yes               | Yes             | Yes                |
| private    | Yes             | No                | No              | No                 |
| internal   | Yes             | No                | Yes             | No                 |
| external   | No              | Yes               | No              | Yes                |

# memory & calldata & storage

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract HelloWorld {

    string message = "hello world";

    function getMessage() public view returns(string memory) {
        return message;
    }

    function setMessage(string calldata text) public {
	    // calldata：保证text不可被修改
        message = text;
    }
    
    function setMoreMessage(string memory text) public {
	    // memory：允许text被修改
        text = string.concat(text, " From External");
        message = text;
    }
}
```

memory & calldata & storage：显式告知编译器所修饰的对象存储在哪、是否可变；
- `memory` ：内存存储、可变；
- `calldata`：内存存储、不可变；
- `storage`：持久化存储

# view & pure



# payable

