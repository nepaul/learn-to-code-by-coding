# 300 Seconds: Create a desktop  application

OS: macOS Monterey Version12.1

## Let’s go

1. Make sure that you have installed node.js and rust (rustc & Cargo) successfully.
[image:BE43CD3E-4DA3-4021-B7CE-2BA1BC055834-35762-0003A47E3E9FF237/55671B5E-E332-46F8-BE42-A270EA0FD6C7.png]
2. `git clone https://github.com/excalidraw/excalidraw.git`
3. Add Tauri to Existing Project (excalidraw)

``` shell
cd excalidraw
yarn add -D @tauri-apps/cli
```

4. Define a custom script to package.json:

``` json
{
  // This content is just a sample
  "scripts": {
    "tauri": "tauri"
  }
}
```

5. 👀 Check tauri info to Make Sure Everything Is Set up Properly: `yarn tauri info`
😭 But stucking in  `Downloading Rust CLI…`
[image:FB9DA751-1680-4716-AF15-66C0E21CB58E-35762-0003A57C820A0E64/02723E5D-9226-4593-978F-F5E8D721F42F.png]
🎉 Try to install tauri global, it worked.
[image:BE73F68F-62E6-4B41-8020-012960870B28-35762-0003A596284FD07B/956C8A18-4431-4624-BD00-AFEE575B70E2.png]
6. Build Excalidraw Web App: `yarn build`
7. `tauri init`
8. Replace `src-tauri/icons/icon.icns` to Excalidraw logo( Use [AnyConv](https://anyconv.com/png-to-icns-converter/) convert png files to icns online)
9. `tauri build`
10. Install App which one is in `excalidraw/src-tauri/target/release/bundle/dmg`
[image:2EC42A9A-8E2D-434D-AFB6-C30876DBD43A-35762-0003A73159B8F2F1/6EBB879E-0525-45C0-A444-36308837989F.png]
11. Enjoy Excalidraw. Everything is prefect but “import libraries” and “Browse libraries”.
[image:285F9C3D-605C-45D6-AC76-963B080E261A-35762-0003B2A99934E0D8/8CFE9356-3DAA-4A45-9542-AF8D45842165.png]

- Q: Browse libraries; A: 👇[image:1AA3AC84-8813-4C75-8DAE-91845CEF4538-35762-0003B791C16827B9/6B52A6E1-0C77-4B4B-9B16-A79596468061.png]
- Q: import libraries.
 A: ❗️**TODO**(maybe sth wrong about [browser-fs-access](https://www.npmjs.com/package/browser-fs-access))

## References

- [What is Tauri? | Tauri Studio](https://tauri.studio/docs/about/intro/)
- [excalidraw: Virtual whiteboard for sketching hand-drawn like diagrams](https://github.com/excalidraw/excalidraw)
- [Rust](https://www.rust-lang.org/)
- [Node.js](https://nodejs.org/en/)
- [electronjs-quick-start](https://www.electronjs.org/docs/latest/tutorial/quick-start)
