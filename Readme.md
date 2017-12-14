# combined-stream

A stream that emits multiple other streams one after another.
一个能流向一个接一个其他流的流。

**NB** Currently `combined-stream` works with streams version 1 only. There is ongoing effort to switch this library to streams version 2. Any help is welcome. :) Meanwhile you can explore other libraries that provide streams2 support with more or less compatibility with `combined-stream`.
NB在目前的版本1中只运用了combined-stream。目前正努力的将此库转化为流。（欢迎提出对版本2.0有帮助的意见）。与此同时，你也能够探索其他流对combined-stream的兼容性。

- [combined-stream2](https://www.npmjs.com/package/combined-stream2): A drop-in streams2-compatible replacement for the combined-stream module.
combined-stream2: 一个降低两个流的兼容性来代替 combined-stream 模块。

- [multistream](https://www.npmjs.com/package/multistream): A stream that emits multiple other streams one after another.
multistream: 一个能相继的发出多个流的流

## Installation

``` bash
npm install combined-stream
```

## Usage

Here is a simple example that shows how you can use combined-stream to combine
two files into one:
这个简单的例子用来说明怎样运用combined-stream将两个文件连接成一个文件:

``` javascript
var CombinedStream = require('combined-stream');
var fs = require('fs');

var combinedStream = CombinedStream.create();
combinedStream.append(fs.createReadStream('file1.txt'));
combinedStream.append(fs.createReadStream('file2.txt'));

combinedStream.pipe(fs.createWriteStream('combined.txt'));
```

While the example above works great, it will pause all source streams until
they are needed. If you don't want that to happen, you can set `pauseStreams`
to `false`:
虽然上面的例子很好，但它将暂停所有流的资源直到这些流被使用。如果你不想流被暂停，你可以将 pausestreams 设为false：

``` javascript
var CombinedStream = require('combined-stream');
var fs = require('fs');

var combinedStream = CombinedStream.create({pauseStreams: false});
combinedStream.append(fs.createReadStream('file1.txt'));
combinedStream.append(fs.createReadStream('file2.txt'));

combinedStream.pipe(fs.createWriteStream('combined.txt'));
```

However, what if you don't have all the source streams yet, or you don't want
to allocate the resources (file descriptors, memory, etc.) for them right away?
Well, in that case you can simply provide a callback that supplies the stream
by calling a `next()` function:
然而，你如果现在没有所有流的源代码或者你不想立刻分配流的资源给它们（如文件描述，内存等）。你可以运用一个简单的next（）
回调函数来提供这个流：

``` javascript
var CombinedStream = require('combined-stream');
var fs = require('fs');

var combinedStream = CombinedStream.create();
combinedStream.append(function(next) {
  next(fs.createReadStream('file1.txt'));
});
combinedStream.append(function(next) {
  next(fs.createReadStream('file2.txt'));
});

combinedStream.pipe(fs.createWriteStream('combined.txt'));
```

## API

### CombinedStream.create([options])

Returns a new combined stream object. Available options are:
运用这两个选项来返回一个新结合的流对象。

* `maxDataSize`
* `pauseStreams`

The effect of those options is described below.
这些选项用来描述以下的内容

### combinedStream.pauseStreams = `true`

Whether to apply back pressure to the underlaying streams. If set to `false`,
the underlaying streams will never be paused. If set to `true`, the
underlaying streams will be paused right after being appended, as well as when
`delayedStream.pipe()` wants to throttle.
如果设置为false ，基础流将永远不会被暂停；如果设置为 true ，基础流在添加之后立刻暂停，当delayedStream.pipe()想节流时

### combinedStream.maxDataSize = `2 * 1024 * 1024`

The maximum amount of bytes (or characters) to buffer for all source streams.
If this value is exceeded, `combinedStream` emits an `'error'` event.
这是所有基础流能利用的最大缓存，如果超出，combinedStream 将会发出一个 ‘error’ 事件。

### combinedStream.dataSize = `0`

The amount of bytes (or characters) currently buffered by `combinedStream`.
这是combinedstream 当前的缓存大小

### combinedStream.append(stream)

Appends the given `stream` to the combinedStream object. If `pauseStreams` is
set to `true, this stream will also be paused right away.

`streams` can also be a function that takes one parameter called `next`. `next`
is a function that must be invoked in order to provide the `next` stream, see
example above.

Regardless of how the `stream` is appended, combined-stream always attaches an
`'error'` listener to it, so you don't have to do that manually.

Special case: `stream` can also be a String or Buffer.
把一个给定的 stream连接到combinedStream 对象上，如果 pauseStreams 设为 ‘true’ ，这个流也将被立刻暂停。
Streams 也可以是一个函数，通过一个参数来调用 next ，next是为了提供下一个 stream 的 函数 详细情况，请看上面的例子。
不管怎样去连接stream ，combined-stream 一直有一个监听者去监听错误，因此你无需手动的去添加这个事件。
特殊注意：stream 也是一个 sting 或者 buffer。

### combinedStream.write(data)

You should not call this, `combinedStream` takes care of piping the appended
streams into itself for you.
你没有必要这样调用， combined-stream 利用管道来连接其他的流。

### combinedStream.resume()

Causes `combinedStream` to start drain the streams it manages. The function is
idempotent, and also emits a `'resume'` event each time which usually goes to
the stream that is currently being drained.
由于 combinedStream 是利用这个API来传递流。这个函数是幂等元，并且会发出一个 ‘resume’事件当每次发出一个流后。

### combinedStream.pause();

If `combinedStream.pauseStreams` is set to `false`, this does nothing.
Otherwise a `'pause'` event is emitted, this goes to the stream that is
currently being drained, so you can use it to apply back pressure.
如果 combinedStream.pauseStream 设置为 ‘false’ ，它将不起作用。否则 一个 ‘pause’ 事件被发出，它将在将要流干的流上起作用，因此你可以利用它来调用回压。

### combinedStream.end();

Sets `combinedStream.writable` to false, emits an `'end'` event, and removes
all streams from the queue.
设置 combinedStream.writable 为 false ，并发出 ‘end’ 事件 并且移除队列中所用的流。

### combinedStream.destroy();

Same as `combinedStream.end()`, except it emits a `'close'` event instead of
`'end'`.
设置和 combinedStream.end() ，除了将 ‘end’ 事件 改为 ‘close’ 事件.

## License

combined-stream is licensed under the MIT license.
Combined-stream 在麻省利用获得许可。
