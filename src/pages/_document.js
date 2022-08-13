import { Html, Head, Main, NextScript } from "next/document";
function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="shortcut icon"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.png`}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
