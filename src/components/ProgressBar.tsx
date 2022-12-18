import * as React from 'react';

export interface IProgressBarProps {
  state: number
  maxValue: number
}

export function ProgressBar(props: IProgressBarProps) {

  if (props.maxValue === 0)
    return <div></div>

  return (
    <div>
      <progress id="fileProgress" value={props.state} max={props.maxValue}></progress>
    </div>
  );
}
