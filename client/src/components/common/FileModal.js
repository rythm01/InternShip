import React, { useState, useEffect, useContext } from 'react';

import styled from "styled-components"
import { useModal } from "../../context/modal-context"
import {
    Button,
    Column,
    Row,
    Title
} from "."
import FileViewer from 'react-file-viewer';


import { AuthContext } from "../../context/AuthContext"
import { getFile } from "../../networks/files"
import { Toaster, toast } from 'react-hot-toast';

const Container = styled.div`
  width: 621px;
  background: #f5f5f5;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0;
  padding: 20px;
`

export default function FileModal({ id, buttonText = 'OK', onSubmit }) {
    const { unSetModal } = useModal()

    const { t } = useContext(AuthContext)

    const [url, setUrl] = useState('');
    const [ext, setExt] = useState('');


    const handleSubmit = () => {
        unSetModal();
        if (onSubmit) {
            onSubmit();
        }
    }
    useEffect(() => {
        getFileFromS3(t, id)
    }, []);


    const getFileFromS3 = async (t, id) => {
        try {
            const res = await getFile(t, id)

            if (!res.data.success) toast.error(res.data.message)

            const { url, ext } = res.data.data
            setUrl(url)
            setExt(ext)
            console.log(url, ext)
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <>
            <Toaster />
            <Column
                width="100%"
                justifyContent="space-between"
                alignItems="center"
                height=""
            >
                <Container>
                    <FileViewer
                        fileType={ext.toLowerCase()}
                        filePath={url}
                    />
                </Container>
            </Column>
        </>
    )
}
