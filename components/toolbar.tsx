import { EditorState } from 'draft-js'
import React, { SyntheticEvent } from 'react'
import { Component, MouseEventHandler } from 'react'

export interface ToolbarProps {
    onToggle: (arg0: string) => void
    style: string
    label: string
}

export class ToolbarButton extends Component<ToolbarProps, {}> {
    constructor(props: ToolbarProps) {
        super(props);
        this.state = {isChecked: false};
    
        this.onClick = this.onClick.bind(this);
      }
      
    onClick: MouseEventHandler<HTMLSpanElement> = (e: SyntheticEvent) => {
        e.preventDefault()
        this.props.onToggle(this.props.style)
    }

    render(): JSX.Element {
        const buttonStyle = {
            padding: 10,
        }
        return (
            <span onClick={this.onClick} style={buttonStyle}>
                {this.props.label}
            </span>
        )
    }
}

const toolbarItems: { label: string, style: string }[] = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Code', style: 'CODE' },
    { label: 'Surprise', style: 'ANYCUSTOMSTYLE' },
]

export const ToolBar = (props: { editorState: EditorState, onToggle: (arg0: string) => void }) => {
    const currentStyle = props.editorState.getCurrentInlineStyle()
    return (
        <div>
            {toolbarItems.map((toolbarItem) => (
                <ToolbarButton
                    key={toolbarItem.label}
                    label={toolbarItem.label}
                    onToggle={props.onToggle}
                    style={toolbarItem.style}
                />
            ))}
        </div>
    )
}
