import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import data from './data.js';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Permission() {
    return (
        <>
            <Container>
                <div className='container'>
                    <div className='permissionForm'>
                        <div className='backButton'>
                            <ArrowBackIcon color="success" style={{ 'cursor': 'pointer' }} />
                        </div>
                        <div className='permission'>
                            <h1 className='heading'>Permissions</h1>
                        </div>
                        <div className='main'>
                            <h4 className='heading'>The file has been shared with</h4>
                            <Divider />
                            {
                                data.length !== 0 ? data.map((d) => {
                                    return (
                                        <div className='buddy' style={{ position: "relative" }}>
                                            <ul className='info'>
                                                <li className='buddyName'>{d.username}</li>
                                                <li className='email'>{d.email}</li>
                                                <li className='share'>{d.share}</li>
                                                <DeleteOutlineIcon sx={{
                                                    position: "absolute",
                                                    top: "4px",
                                                    right: "15px",
                                                    // color:"green"
                                                }} />
                                            </ul>
                                            <Divider/>
                                        </div>
                                    )
                                })
                                    : <AddCircleOutlineIcon sx={{ fontSize: 150 }} style={{ 'margin': '110px' }} color="success" />
                            }
                        </div>
                        <div class="subbutton">
                            <button type="submit">Add new permission</button>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Permission

const Container = styled.div`
  .container{
    max-width: 900px;
    margin: 10px auto;
    padding: 10px 20px;
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    .permissionForm{
        max-width: 500px;
        width:50%;
        height:85vh;
        margin: 10px auto;
        padding: 10px 20px;
        border-radius: 8px;
        .subbutton{
            display:flex;
            justify-content:center;
            align-items:center;
            button {
                padding: 19px 39px 18px 39px;
                color: #FFF;
                background-color: #00A652;
                font-size: 18px;
                font-style: normal;
                text-align: center;
                border-radius: 5px;
                width: 18rem;
                border: 1px solid #00A652;
                border-width: 1px 1px 3px;
                border-radius: 10px;
                box-shadow: 0 -1px 0 rgba(255,255,255,0.1) inset;
                margin-bottom: 10px;
                font-weight:600;
                cursor: pointer;
                position:absolute;
                bottom:0;
              }      
          }
        .backButton{
            width:2rem;
            height:1.8rem;
            background:#fff;
            box-shadow:2px 2px 26px -1px grey;
            display:flex;
            align-items:center;
            justify-content:center;
            border-radius:5px;
            margin:4px 10px;
        }
        .permission{
            .heading{
                margin:30px 0 15px 33px;
            }
        }
        .main{
            height:63vh;
            width:95%;
            margin:0 0 0 12px;
            position:relative;
            overflow:auto;
            &.main::-webkit-scrollbar { width: 5px; }
            &.main::-webkit-scrollbar-thumb { background-color:black};
            &.main::-webkit-scrollbar-thumb { border-radius:20px};
            .buddy{
                li{
                    list-style:none;
                }
                li.buddyName{
                    font-size:17px;
                    font-weight:700;
                    margin-bottom:10px;
                    text-transform:capitalize;
                }
                li.email,li.share{
                    font-size:14px;
                }
            }
        }
        .heading{
            margin:10px 0px 8px 19px;
        }
      }
   }
`
