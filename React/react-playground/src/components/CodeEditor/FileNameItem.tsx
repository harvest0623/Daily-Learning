import styles from './index.module.scss'

interface FileNameItemProps {
    value: string;
    active: boolean;
    onClick: (value: string) => void;
}

export default function FileNameItem(props: FileNameItemProps) {
    const { value, active, onClick } = props;
    const onClickHandler = () => {
        onClick(value);
    }
    return (
        <div className={`${styles['tab-item']} ${active ? styles['actived'] : ''}`} onClick={onClickHandler}>
            <span>{value}</span>
        </div>
    )
}