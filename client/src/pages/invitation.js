import React, { useState, useEffect, useContext } from 'react';

import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Invitation = () => {

    const params = useParams()

    const { t } = useContext(AuthContext)

    useEffect(() => {
        createBuddy()
    }, []);


    const createBuddy = async (t, id) => {
        try {

        } catch (err) {
            console.log(err)
        }

    }



    return (
        <div>

        </div>
    );
};

export default Invitation;
