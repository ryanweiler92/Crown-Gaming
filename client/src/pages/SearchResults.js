import React, { useState, useEffect } from 'react';
import {Container, Nav, Navbar, Modal, Tab, Form, Col, Button} from 'react-bootstrap'

const SearchResults = (props) => {
    console.log(props)
    const myFunction = () => {
        console.log(props)
    }
    
    return (
        <>
        <Button className="btn-success" onClick={myFunction}>See Stuff</Button>
        </>
    )
}

export default SearchResults