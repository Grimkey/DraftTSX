import Head from 'next/head'
import Navbar from './NavBar'
import React from "react";

const Layout = (props: React.PropsWithChildren<{}>) => (
    <div>
        <Head>
            <title>DraftTS Demo</title>
            <link rel="stylesheet" href="https://bootswatch.com/4/cerulean/bootstrap.min.css" />
        </Head>
        <Navbar/>
        <div className="container">
            {props.children}
        </div>
    </div>
)

export default Layout