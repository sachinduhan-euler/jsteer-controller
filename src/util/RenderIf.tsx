import React from 'react';

type RenderIfProps = {
    showComponent: boolean,
    component: JSX.Element
}

function RenderIf(props: RenderIfProps): JSX.Element {
    const {showComponent, component} = props;
    return (
        showComponent ? component : <></>
    )
}

export default RenderIf