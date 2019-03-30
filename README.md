# numas.wasm

**numas.wasm** is simple tool to generate WebAssembly module from **numas** written in Rust.

## How it works
This tool uses simple syntax to handle generics types used in Rust code. 
```
{{generate}}
pub fn test_function_{{T}}(x: {{T}}) -> () {
}
{{/generate}}
```
Example above generates this output (for configuration generic types `i32`, `f32`)
```
pub fn test_function_i32(x: i32) -> () {
}
pub fn test_function_f32(x: f32) -> () {
}
```
Basically it repeats parts between tokens `{{generate}}` and `{{/generate}}` and replaces token `{{T}}` with specific type.
