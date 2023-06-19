import React, { useState, useEffect, useContext } from 'react';
import { S3 } from 'aws-sdk';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';

import { useParams } from 'react-router-dom';
import { getFile } from '../networks/files';
import { AuthContext } from '../context/AuthContext';
import { Toaster, toast } from 'react-hot-toast';

const PdfViewer = () => {
    const [url, setUrl] = useState('');
    const [ext, setExt] = useState('');

    const params = useParams()

    const { t } = useContext(AuthContext)

    useEffect(() => {
        getFileFromS3(t, params.id)
    }, []);


    const getFileFromS3 = async (t, id) => {
        try {
            const res = await getFile(t, id)

            if (!res.data.success) toast(res.data.message)

            const { url, ext } = res.data.data
            setUrl(url)
            setExt(ext)
            console.log(url, ext)
        } catch (err) {
            console.log(err)
        }

    }



    return (
        <div>
        <Toaster />
            <FileViewer
                fileType={ext.toLowerCase()}
                filePath={url}
            />
        </div>
    );
};

export default PdfViewer;
