import React from 'react';

interface AaaProps {
    name: string,
    age?: number,
    content: React.ReactNode
}

function Aaa(props: AaaProps) {
    return (
        <div>aaa {props.name} {props.content}</div>
    )
}

const content: React.ReactElement = <div>aaa</div>;

const Aaa2: React.FunctionComponent<AaaProps> = (props) => {
    return (
        <div>aaa2, {props.name} {props.content}</div>
    )
}

export default function App() {
    return (
        <div>
            <Aaa name="Trae" content={null}></Aaa>
        </div>
    )
}