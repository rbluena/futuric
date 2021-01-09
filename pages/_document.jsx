import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap"
            rel="stylesheet"
          />
          <meta
            property="og:title"
            content="Discover what happening on the internet!"
          />
          <meta property="og:url" content="http://www.asteyo.com" />
          <meta
            property="og:image"
            content="http://sharethis.com/images/logo.jpg"
          />
          <meta
            property="og:description"
            content="Create a link for you future content, and discover what happening on the internet!"
          />
          <meta property="og:site_name" content="Asteyo" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
