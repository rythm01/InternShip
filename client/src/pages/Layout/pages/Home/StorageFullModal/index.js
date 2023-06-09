import React from 'react'
import { Button, Column, Container, Row, Title, Paragraph } from '../../../../../components/common'
import { useModal } from '../../../../../context/modal-context'

const StorageFullModal = ({ navigate }) => {
    const { unSetModal } = useModal()
    return (
        <Column
            justifyContent="space-between"
            alignItems="center"
            height="100%"
        >

            <Title fontWeight="700" margin="16px 0">
                Reached free limit
            </Title>


            <Container
                margin='40px'
            >
                <Paragraph color='black'>Subscribe for more documents upload.</Paragraph>
            </Container>

            <Row margin='0px 60px 50px 60px' justifyContent="center">
                <Button
                    width="351px"
                    height="50px"
                    color="#00A652"
                    onClick={() => { navigate('/subscriptions'); unSetModal() }}
                >
                    View Subscription and Packages
                </Button>
            </Row>
        </Column>

    )
}

export default StorageFullModal