import * as React from 'react';

export interface ICollapsedTextBoxProps {
    content: string
    buttonText: string
}

const collapsible = {
    'background-color': '#777',
    'width': '100%',
    'border': 'none',
    'text-align': 'left',
};

const content = {
    'padding': '0 18px',
    'max-height': '0',
    'overflow': 'hidden',
}

export function CollapsedTextBox(props: ICollapsedTextBoxProps) {

    const pContent = React.createRef<HTMLParagraphElement>()

    const show = () => {
        if (!pContent.current)
            return

            const heigh = pContent.current?.style.maxHeight

        if (heigh === "0px") {
            pContent.current.style.maxHeight = pContent.current?.scrollHeight + "px";
        } else {
            pContent.current.style.maxHeight = "0px";
        }
    }

    return (
        <div>
            <button style={collapsible} onClick={show}>{props.buttonText}</button>
            <div style={content} ref={pContent}>
                <p >{props.content}</p>
            </div>
        </div>
    );
}
