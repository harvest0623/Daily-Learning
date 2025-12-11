import './movieItem.css'

export default function MovieItem(props) {
    console.log(props.data);
    return (
        <div className="itme">
            <div className="index">No.1</div>
            <div className="info">
                <div className="pic">
                    <img src={props.data.img} alt="" />
                </div>
                <div className="message">
                    <div>
                        <div className="name">疯狂动物城2</div>
                        <div className="score">评分:8.4</div>
                    </div>
                
                    <div className="msg">
                        2025 / 美国 /喜剧动画 悬疑犯罪 冒险/杰拉德•布什拜伦•
                        霍华德/ 金妮弗•古德温 杰森•
                        贝特曼
                    </div>
                </div>
                <div className="have-see">
                    看过
                </div>
            </div>
            <div className="desc">一个神秘爬行动物的到来，把温馨的动物城搅动得天翻地覆。面对全新的城市危机，警官兔朱迪与狐尼克将继续…</div>
        </div>
    )
}