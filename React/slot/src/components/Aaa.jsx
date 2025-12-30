import { Children } from "react";

export default function Aaa({ children }) {
    console.log(children);
    return (
        <div>
            {
                // children.map((item, index) => {
                //     return <div key={index}>{item}</div>
                // })
                Children.map(children, (item, index) => {
                    return <div key={index}>{item}</div>
                })
            }
        </div>
    )
}
