import React from 'react'
import { RawDraftContentState } from 'draft-js'
import RichText from "../components/richtext";
import { NextPage } from 'next'
import {CurrentPrice} from '../modules/coindesk'
import Fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'

const Index: NextPage<Props> = (props: Props) => (
    <Layout>
        <div>
            <RichText initialData={initialData}/>
        </div>
    </Layout>
)

const initialData: RawDraftContentState = {
    blocks: [
        {
            key: '16d0k',
            text: 'You can edit this text.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 0, length: 23, style: 'BOLD' }],
            entityRanges: [],
            data: {},
        },
        {
            key: '98peq',
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
        },
        {
            key: 'ecmnc',
            text:
                'Luke Skywalker has vanished. In his absence, the sinister FIRST ORDER has risen from the ashes of the Empire and will not rest until Skywalker, the last Jedi, has been destroyed.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [
                { offset: 0, length: 14, style: 'BOLD' },
                { offset: 133, length: 9, style: 'BOLD' },
            ],
            entityRanges: [],
            data: {},
        },
        {
            key: 'fe2gn',
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
        },
        {
            key: '4481k',
            text:
                'With the support of the REPUBLIC, General Leia Organa leads a brave RESISTANCE. She is desperate to find her brother Luke and gain his help in restoring peace and justice to the galaxy.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [
                { offset: 34, length: 19, style: 'BOLD' },
                { offset: 117, length: 4, style: 'BOLD' },
                { offset: 68, length: 10, style: 'ITALIC' },
            ],
            entityRanges: [],
            data: {},
        },
    ],
    entityMap: {},
}

export default Index
