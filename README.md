# numas.wasm

**numas.wasm** is numas compiled to WebAssembly module.

## Build
To build wasm module you need to have node, npm, rust and cargo installed. If you have all of these, you can run `npm run build`
and script will output `numas.wasm`.

### Generating Rust code
This tool also generates Rust code (as glue for compiler) which uses simple templating syntax.
```
{{generate}}
pub fn test_function_{{T}}(x: {{T}}) -> () {
}
{{/generate}}
```
Example above generates this output (for configuration generic types `i32`, `f32`)
```rust
pub fn test_function_i32(x: i32) -> () {
}
pub fn test_function_f32(x: f32) -> () {
}
```
Basically it repeats parts between tokens `{{generate}}` and `{{/generate}}` and replaces token `{{T}}` with specific type. Nested `{{generate}}` tokens are not supported.
