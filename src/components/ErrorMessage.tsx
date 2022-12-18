import * as React from 'react';

export interface IErrorMessageProps {
    message: string | undefined
}

export function ErrorMessage(props: IErrorMessageProps) {

    if (!props.message)
        return <div></div>

    return (
        <div>
            <label style={{color: 'red'}}>{props.message}</label>
        </div>
    );
}
