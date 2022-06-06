import React, { useContext, useEffect } from 'react'
import { withEmotionCache } from '@emotion/react'
import { ChakraProvider } from '@chakra-ui/react'
import type { MetaFunction, LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { ServerStyleContext, ClientStyleContext } from './context'
import { theme } from './theme';
import { Header } from './components/header';
import { Footer } from './components/footer';
import styles from "~/styles/global.css";


export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'New Remix App',
    viewport: 'width=device-width,initial-scale=1',
});

export function links() {
    return [
        { rel: "stylesheet", href: styles },
        {
            rel: "icon",
            href: "/favicon.png",
            type: "image/png",
        },
        {
            rel: "preconnect",
            href: "https://fonts.googleapis.com"
        },
        {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "",
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
        },
    ]
}

interface DocumentProps {
    children: React.ReactNode;
}

const Document = withEmotionCache(
    ({ children }: DocumentProps, emotionCache) => {
        const serverStyleData = useContext(ServerStyleContext);
        const clientStyleData = useContext(ClientStyleContext);

        // Only executed on client
        useEffect(() => {
            // re-link sheet container
            emotionCache.sheet.container = document.head;
            // re-inject tags
            const tags = emotionCache.sheet.tags;
            emotionCache.sheet.flush();
            tags.forEach((tag) => {
                (emotionCache.sheet as any)._insertTag(tag);
            });
            // reset cache to reapply global styles
            clientStyleData?.reset();
        }, []);

        return (
            <html lang="en">
                <head>
                    <Meta />
                    <Links />
                    {serverStyleData?.map(({ key, ids, css }) => (
                        <style
                            key={key}
                            data-emotion={`${key} ${ids.join(' ')}`}
                            dangerouslySetInnerHTML={{ __html: css }}
                        />
                    ))}
                </head>
                <body className="site-bg">
                    {children}
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </body>
            </html>
        );
    })


export default function App() {
    return (
        <Document>
            <ChakraProvider theme={theme}>
                <div className="content">
                    <Header />
                    <Outlet />
                </div>
                <Footer />
            </ChakraProvider>
        </Document>
    )
}

