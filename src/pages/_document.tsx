import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;800&family=Rubik&display=swap'
                        rel="stylesheet"
                    />
                </Head>
                <body className={"font-rubik bg-hero-bank-note bg-secondary"}>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
