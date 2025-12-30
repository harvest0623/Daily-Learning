import { useEffect } from 'react';
import { createPortal } from 'react-dom'

function getAttach(attach) {
    if(typeof attach === 'string') {
        return document.querySelector(attach);
    }
    if(typeof attach === 'object' && attach instanceof window.HTMLElement) {
        return attach;
    }
}

export default function Protal(pros) {
    const { children, attach = document.body } = pros;

    const container = () => {
        const el = document
    }

    useEffect(() => {
        const parentElement = getAttach(attach);
        parentElement?.appendChild?.(container);
    })
    return createPortal(children, getAttach(attach));
}
