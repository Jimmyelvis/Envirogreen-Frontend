// pages/_document.js

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/react-quill/0.4.1/quill.snow.css"
          />
          <link rel="stylesheet" href="/static/css/styles.css" />
        </Head>
        <body>
          <Main />
          <div id="root_modal" />
          <div id="alerts" />
          <NextScript />
          <script
            src="https://widget.cloudinary.com/v2.0/global/all.js"
            type="text/javascript"
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
