import * as React from 'react';

export interface ICollapsedTextBoxProps {
    content: string
    buttonText: string
}

export function CollapsedTextBox(props: ICollapsedTextBoxProps) {
    return (
        <details>
            <summary>Klucz</summary>
            <p >{props.content}</p>
        </details>
    );
}
