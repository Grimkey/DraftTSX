import React, { Component, CSSProperties} from 'react'
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    convertFromRaw,
    RawDraftContentState,
    DraftStyleMap,
    DraftHandleValue,
} from 'draft-js'
import { ToolBar } from './toolbar'

interface RichTextProps {
    initialData: RawDraftContentState
}

interface BoxMeasure {
    w: number
    h: number
}

interface PointMeasure {
    x: number
    y: number
}

interface AppState {
    editorState: EditorState
    showToolbar: boolean
    windowWidth: number
    toolbarMeasures: BoxMeasure
    selectionMeasures: BoxMeasure
    selectionCoordinates: PointMeasure
    toolbarCoordinates: PointMeasure
    showRawData: boolean
}

class RichText extends Component<RichTextProps, AppState> {
    focus: () =>void
    onChange: (state: EditorState) => void
    editor: Editor | null = null
    elemWidth: number = 0
    elemHeight: number = 0

    constructor(props: RichTextProps) {
        super(props)

        this.state = {
            editorState: EditorState.createWithContent(convertFromRaw(props.initialData)),
            showToolbar: false,
            windowWidth: 0,
            toolbarMeasures: {
                w: 0,
                h: 0,
            },
            selectionMeasures: {
                w: 0,
                h: 0,
            },
            selectionCoordinates: {
                x: 0,
                y: 0,
            },
            toolbarCoordinates: {
                x: 0,
                y: 0,
            },
            showRawData: false,
        }

        this.focus = () => this.editor?.focus()
        this.onChange = (editorState) => this.setState({ editorState })
    }

    onClickEditor = () => {
        this.focus()
        this.checkSelectedText()
    }

    // 1- Check if some text is selected
    checkSelectedText = () => {
        if (typeof window !== 'undefined') {
            const text = window.getSelection()?.toString() ?? ''
            if (text !== '') {
                // 1-a Define the selection coordinates
                this.setSelectionXY()
            } else {
                // Hide the toolbar if nothing is selected
                this.setState({
                    showToolbar: false,
                })
            }
        }
    }

    // 2- Identify the selection coordinates
    setSelectionXY = () => {
        const r = window.getSelection()?.getRangeAt(0).getBoundingClientRect() ?? new DOMRect()
        const relative = document.body.getBoundingClientRect()

        // 2-a Set the selection coordinates in the state
        this.setState(
            {
                selectionCoordinates: r,
                windowWidth: relative.width,
                selectionMeasures: {
                    w: r.width,
                    h: r.height,
                },
            },
            () => this.showToolbar()
        )
    }

    // 3- Show the toolbar
    showToolbar = () => {
        this.setState(
            {
                showToolbar: true,
            },
            () => this.measureToolbar()
        )
    }

    // 4- The toolbar was hidden until now
    measureToolbar = () => {
        // 4-a Define the toolbar width and height, as it is now visible
        this.setState(
            {
                toolbarMeasures:  {
                    w: this.elemWidth,
                    h: this.elemHeight,
                },
            },
            () => this.setToolbarXY()
        )
    }

    // 5- Now that we have all measures, define toolbar coordinates
    setToolbarXY = () => {
        const {
            selectionMeasures,
            selectionCoordinates,
            toolbarMeasures,
            windowWidth,
        } = this.state

        const hiddenTop = selectionCoordinates.y < toolbarMeasures.h
        const hiddenRight =
            windowWidth - selectionCoordinates.x < toolbarMeasures.w / 2
        const hiddenLeft = selectionCoordinates.x < toolbarMeasures.w / 2

        const normalX =
            selectionCoordinates.x - toolbarMeasures.w / 2 + selectionMeasures.w / 2
        const normalY = selectionCoordinates.y - toolbarMeasures.h

        const invertedY = selectionCoordinates.y + selectionMeasures.h
        const moveXToLeft = windowWidth - toolbarMeasures.w
        const moveXToRight = 0

        let coordinates = {
            x: normalX,
            y: normalY,
        }

        if (hiddenTop) {
            coordinates.y = invertedY
        }

        if (hiddenRight) {
            coordinates.x = moveXToLeft
        }

        if (hiddenLeft) {
            coordinates.x = moveXToRight
        }

        this.setState({
            toolbarCoordinates: coordinates,
        })
    }

    handleKeyCommand = (command: string, editorState: EditorState): DraftHandleValue => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            this.onChange(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    toggleToolbar = (inlineStyle: string) => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
        )
    }

    render() {
        const { editorState } = this.state
        // Make sure we're not on the ssr
        if (typeof window !== 'undefined') {
            // Let's stick the toolbar to the selection
            // when the window is resized
            window.addEventListener('resize', this.checkSelectedText)
        }

        const toolbarStyle: CSSProperties = {
            display: this.state.showToolbar ? 'block' : 'none',
            backgroundColor: 'black',
            color: 'white',
            position: 'absolute',
            left: this.state.toolbarCoordinates.x,
            top: this.state.toolbarCoordinates.y,
            zIndex: 999,
            padding: 10,
        }
        return (
            <div>
                <div
                    ref={(elem) => {
                        this.elemWidth = elem ? elem.clientWidth : 0
                        this.elemHeight = elem ? elem.clientHeight : 0
                    }}
                    style={toolbarStyle}
                >
                    <ToolBar editorState={editorState} onToggle={this.toggleToolbar} />
                </div>
                <div onClick={this.onClickEditor} onBlur={this.checkSelectedText}>
                    <Editor
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        placeholder="Tell a story..."
                        editorKey="foobar"
                        spellCheck={false}
                        ref={(element) => {
                            this.editor = element
                        }}
                    />
                </div>
                <div style={{ marginTop: 40 }}>
                    <button
                        onClick={() =>
                            this.setState({ showRawData: !this.state.showRawData })
                        }
                    >
                        {!this.state.showRawData ? 'Show' : 'Hide'} Raw Data
                    </button>
                    <br />
                    {this.state.showRawData &&
                    JSON.stringify(convertToRaw(editorState.getCurrentContent()))}
                </div>
            </div>
        )
    }
}

// Custom overrides for each style
const styleMap: DraftStyleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 4,
    },
    BOLD: {
        color: '#395296',
        fontWeight: 'bold',
    },
    ANYCUSTOMSTYLE: {
        color: '#00e400',
    },
}

export default RichText