# numas.wasm

**numas.wasm** is numas - multiplatform numerical library compiled to WebAssembly module.

## Usage
To use this in your project import prebuilt module `numas.wasm` as WebAssembly module.

## Build
To build project into WebAssembly module you need to have Node, NPM, Cargo and Rust with target `wasm32-unknown-unknow`.

If you have all of these, you can run `npm run build` and script will output `numas.wasm` into root of the project (or in `target/` dir).

### Generating Rust code
This project is also tool for generating Rust code (as glue for compiler) which uses simple templating syntax.
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
