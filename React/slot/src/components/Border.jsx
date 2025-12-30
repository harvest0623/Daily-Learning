import bdImg from '../bd.webp'

export default function Border(pros) {
    console.log(pros);
    const style = {
        border: '10px solid transparent',
        borderStyle: 'solid',
        borderImage: `url(${bdImg})`,
        borderImageSlice: '30%'
    }
    return (
        <div className="bd_box" style={style}>
            {/* 插槽 */}
            {pros.children}
        </div>
    )
}
