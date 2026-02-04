import { useContext, useState, useEffect } from 'react'
import { PlaygroundContext } from '../../ReactPlayground/PlaygroundContext.tsx'
import FileNameItem from './FileNameItem.tsx'
import styles from './index.module.scss'

export default function FileNameList() {
    const { files, selectedFileName, setSelectedFileName, addFile, removeFile, updateFileName } = useContext(PlaygroundContext);
    const [tabs, setTabs] = useState<string[]>([]);
    useEffect(() => {
        setTabs(Object.keys(files));
    }, [files]);
    return (
        <div className={styles['tabs']}>
            {tabs.map((tab) => (
                <FileNameItem 
                    key={tab} 
                    value={tab}
                    active={selectedFileName === tab}
                    onClick={() => setSelectedFileName(tab)} 
                />
            ))}
        </div>
    )
}