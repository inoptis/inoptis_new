import React from 'react';
import cl from './MoreInfoBlocks.module.css'
import download from '../../../Assets/Pictures/download-icon.svg'
import file from '../../../Assets/Pictures/file-icon.svg'
const MoreDocumentation = ({content}) => {
    const baseurl = 'http://alexaksa.beget.tech/'
    return (
        <div className={cl.documentationBlock}>
            <div className={cl.titleDocumentation}>Файлы</div>
                <a href={baseurl + content}
                   download="Техническое описание.pdf"
                   className={cl.documentation}
                   style={{ textDecoration: 'none'}}
                >
                    <div>
                        <img src={file} alt="file"/>
                        <span>Техническое описание</span>
                    </div>
                    <img src={download} alt="download"/>
                </a>
        </div>
    );
};

export default MoreDocumentation;