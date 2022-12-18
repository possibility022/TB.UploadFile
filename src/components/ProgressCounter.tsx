import * as React from 'react';

export interface IProgressCounterProps {
    currentState: number
    maxState: number
}

export function ProgressCounter (props: IProgressCounterProps) {

    if (props.maxState === 0)
        return <div></div>

  return (
    <div>
        <label>Wysyłanie {props.currentState}/{props.maxState}</label>
    </div>
  );
}
