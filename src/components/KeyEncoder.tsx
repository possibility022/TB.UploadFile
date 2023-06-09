import * as React from 'react';
import { useState } from 'react';
import { Buffer } from 'buffer'

export function KeyEncoder() {

    const [generateLinkInput, setGenerateLinkInput] = useState<string>('')
    const [generateLinkOutput, setGenerateLinkOutput] = useState<string>('')

    const handleChange = (event: any ) => { //todo remove that any
        setGenerateLinkInput(event.target.value);
    };

    React.useEffect(() => {

        const base64 = Buffer.from(generateLinkInput, 'binary').toString('base64');
        const link = `${window.location.host}/?accessString=${base64}`

        setGenerateLinkOutput(link)
    }, [generateLinkInput])

    return (

        <details>
            <summary>Wygeneruj link</summary>
            <textarea name="textarea" value={generateLinkInput} onChange={handleChange} />
            <p>{generateLinkOutput}</p>
        </details>

    );
}
