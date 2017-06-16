# TurboScript
[![Build Status](https://travis-ci.org/01alchemist/TurboScript.svg?branch=master)](https://travis-ci.org/01alchemist/TurboScript) [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/01alchemist/TurboScript?branch=master&svg=true)]() [![Stories in Ready](https://badge.waffle.io/01alchemist/TurboScript.png?label=ready&title=Ready)](https://waffle.io/01alchemist/TurboScript) [![Greenkeeper badge](https://badges.greenkeeper.io/01alchemist/TurboScript.svg)](https://greenkeeper.io/)

Super charged JavaScript for parallel programming and WebAssembly

[![Throughput Graph](https://graphs.waffle.io/01alchemist/TurboScript/throughput.svg)](https://waffle.io/01alchemist/TurboScript/metrics/throughput)

<pre>
    @             _________
     \____       /         \
     /    \     /   ____    \
     \_    \   /   /    \    \
       \    \ (    \__/  )    )          ________  _____  ___  ____
        \    \_\ \______/    /          /_  __/ / / / _ \/ _ )/ __ \
         \      \           /___         / / / /_/ / , _/ _  / /_/ /
          \______\_________/____"-_____ /_/  \____/_/|_/____/\____/
</pre>

TurboScript is an experimental programming language for parallel programming for web which compiles to JavaScript ~~(asm.js)~~ and WebAssembly (targeting post-MVP). The syntax is similar to TypeScript ~~(Hardly trying to fill the gaps)~~ and the compiler is open source and written in TypeScript. TurboScript has zero dependencies.

This is still an experiment and isn't intended for real use yet but we are working towards an MVP release. Please feel free to open issues if it stop working or need a new feature.

## Install
`npm install -g turboscript`

## Syntax

### variables
```typescript
var myGlobal:int32 = 1;
let evaluatedVar:int32 = myGlobal + 1;
// let is same as var.
```

### function
```typescript
// add.tbs
export function add(a:int32, b:int32):int32 {
    return a + b;
}
```

### class
```typescript
// vector3D.tbs
export class Vector3D {
    x:float32;
    y:float32;
    z:float32;

    constructor(x:float32, y:float32, z:float32){
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
```

### Generic
```typescript
class Foo<T> {
    value:T;
    constructor(value:T){
        this.value = value;
    }
    getValue():T {
        return this.value;
    }
}

export function testI32(value:int32):int32 {
    let instance = new Foo<int32>(value);
    return instance.getValue();
}

export function testI64(value:int32):int32 {
    let value2 = value as int64;
    let instance = new Foo<int64>(value2);
    return instance.getValue() as int32;
}

export function testF32(value:float32):float32 {
    let instance = new Foo<float32>(value);
    return instance.getValue();
}

export function testF64(value:float64):float64 {
    let instance = new Foo<float64>(value);
    return instance.getValue();
}
```

### Operator overload
```typescript
class Array<T> {

    bytesLength: int32;
    elementSize: int32;

    constructor(bytesLength: int32, elementSize: int32) {
        this.bytesLength = bytesLength;
        this.elementSize = elementSize;
    }

    operator [] (index: int32): T {
        let stripe = index * this.elementSize;
        if (stripe >= 0 && stripe < this.bytesLength) {
            return *((this as *uint8 + 8 + stripe) as *T);
        }
        return null as T;
    }

    operator []= (index: int32, value: T): void {
        let stripe = index * this.elementSize;
        if (stripe >= 0 && stripe < this.bytesLength) {
            *((this as *uint8 + 8 + stripe) as *T) = value;
        }
    }

    get length(): int32 {
        return this.bytesLength / this.elementSize;
    }
}
```

### Array
```typescript
// f64-array.tbs
var a: Array<float64> = null;

export function test(num:int32): Array<float64> {
    a = new Array<float64>(num);
    let i:int32 = 0;
    while (i < num) {
        a[i] = 0.0;
        i = i + 1;
    }
    return a;
}

export function getArrayByteLength(value:Array<float64>):int32 {
    return value.bytesLength;
}
export function getArrayElementSize(value:Array<float64>):int32 {
    return value.elementSize;
}

export function getArray(): Array<float64> {
    return a;
}
export function getData(index:int32):float64 {
    return a[index];
}
export function setData(index:int32, value:float64):void {
    a[index] = value;
}

```

#### Compile to wasm
`tc add.tbs --wasm --out add.wasm`

## Join ![Slack](https://01alchemist.com/images/slack-logo-small.png)
You need an invitation to join slack. open a ticket with your email address. I will make it happen.

# Roadmap

* ~~Parallel JavaScript~~
* ~~WebAssembly Emitter~~
* ~~Basic malloc and free~~
* ~~ASM.JS Emitter~~
* ~~Import external functions with namespace~~
* ~~Array Data Type~~
* Parallel WebAssembly (post-MVP)

# Wiki
Documentations can be found at [wiki](../../wiki) (under construction :construction:)

# Useful links
* [Future WebHPC & Parallel Programming with JavaScript](https://dump.01alchemist.com/2016/12/31/future-webhpc-parallel-programming-with-javascript-the-new-era-about-to-begin/)
* [TurboScript playground](https://01alchemist.com/projects/turboscript/playground/)
* [Assembleash playground](https://github.com/MaxGraey/Assembleash/#TurboScript)


# Credit
Lexical analysis, Parsing, Checking codes are borrowed from Evan Wallace's thinscript

# Now enjoy - Wow! this snail is fast
<a href="http://www.youtube.com/watch?feature=player_embedded&v=w-SDeBoDLTg
" target="_blank"><img src="https://01alchemist.com/images/Turbo-630x354.jpg"
alt="Wow! this snail is fast" width="630" height="354" border="10" /></a>
