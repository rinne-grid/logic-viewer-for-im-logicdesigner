# LogicViewer for IM-LogicDesigner

## 概要

[IM-LogicDesigner](https://www.intra-mart.jp/document/library/iap/public/im_logic/im_logic_user_guide/texts/summary/index.html)のエクスポートデータ(im_logicdesigner-data.zip)から  
JavaScriptやSQL、FreeMakerテンプレートといったユーザ定義情報を読み込み  
ツリービューでソースコードの確認ができるビューアです。 

ユーザ定義の数が膨大になってくると、調査時など一つ一つのWeb画面から定義を開いて  
確認するのが辛いので、Electron + Vue.jsの勉強がてら作成してみました。 


![LogicViewer操作イメージ](http://www.rinsymbol.sakura.ne.jp/github_images/logic-viewer/anim.gif)


## アプリのダウンロード・インストール

[リリースページ](https://github.com/rinne-grid/logic-viewer-for-im-logicdesigner/releases)よりlogic-viewer-for-im-logicdesigner.Setup.x.x.x-win.exeを見つけてダウンロードします

* 面倒な方は以下のリンクからダウンロードし、exeを起動してください。  
[logic-viewer-for-im-logicdesigner.Setup.0.1.0-win.exe](https://github.com/rinne-grid/logic-viewer-for-im-logicdesigner/releases/download/v0.1.0/logic-viewer-for-im-logicdesigner.Setup.0.1.0-win.exe)


## アプリ操作方法

1. アプリの左上のファイルアイコンをクリックします
2. IM-LogicDesignerからエクスポートしたzipファイル(im_logicdesigner-data.zip)を選択します
  - 【！注意！】エクスポートデータにユーザ定義が含まれている必要があります
3. zip内容を元に、アプリの左側にJavaScript、SQL等のソースコードが表示されます


## Tips

* アプリ右上のアイコン![クリップボードボタン](http://www.rinsymbol.sakura.ne.jp/github_images/logic-viewer/logic-viewer_clipboard.png)で表示中のソースコードをクリップボードにコピーできます。
* アプリ右上のアイコン![保存ボタン](http://www.rinsymbol.sakura.ne.jp/github_images/logic-viewer/logic-viewer_save.png)で表示中のソースコードを保存できます。

## License

MIT


## 開発する時

|ソフトウェア|バージョン|
|---|---|
|Node.js|v10.15.2|


### セットアップ

```
# Node.jsをインストールした上で実行
$ git clone https://github.com/rinne-grid/logic-viewer-for-im-logicdesigner
$ cd logic-viewer-for-im-logicdesigner
$ npm -g i yarn
$ yarn install
```

### 開発モードで実行
```
$ yarn run electron:serve
```

### アプリのビルド
```
yarn run electron:build
```

## 作者について

[@rinne_grid](https://twitter.com/rinne_grid)
