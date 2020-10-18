import React from 'react'
import MyEditor from "../components/myeditor";
import { NextPage } from 'next'
import Layout from '../components/layout'

const Page2: NextPage = () => (
    <Layout>
        <div>
            <MyEditor />
        </div>
    </Layout>
)

export default Page2
