import React, { Component, useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { Logo } from './Logo';

import {
    Card, CardImg, CardBody,
    CardTitle,  Container, Row, Col, Input, Button, Navbar
} from 'reactstrap';
import { render } from '@testing-library/react';
import { green } from '@mui/material/colors';

function App() {
    App.displayName = App.name;
    const [wtha, setWthArray] = useState([]);
    const [wthoa, setWthoArray] = useState([]);
    const [wth, setWith] = useState(true);
    const [inputText, setInputText] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoad] = useState(true);

    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    useEffect(() => {
        if (ingredients.length == 0 || ingredients.length == 1) {
            populateData();
        }
    });

    const addingredient = (id) => {
        const itemstr = ingredients.find(x => x.id == id).ingredientName;
        if (wth) {
            setWthArray(oldarray => [...oldarray, itemstr]);
        }
        else {
            setWthoArray(oldarray => [...oldarray, itemstr]);
        }
    }
    const removeingredient = (id) => {
        const itemstr = ingredients.find(x => x.id == id).ingredientName;
        if (wtha.includes(itemstr)) {
            setWthArray(wtha.filter(a => a !== itemstr));
        }
        if (wthoa.includes(itemstr)) {
            setWthoArray(wtha.filter(a => a !== itemstr));
        }
    }
    const withwithout = (v) => {
        if (v == true) {
            return (
                <span className="w">Olsun</span>
            );
        }
        else {
            return (
                <span className="wo">Olmasın</span>
                )
        }
    }
    App.renderpage = (ingredients)=> {
        return (
            <div className="main">
                <div className="searchandlist">
                    <div className="search">
                        <h1>Yemeğimde</h1>
                        <Input className="searchbar" type="text" name="search" id="srch" placeholder="Malzeme Ekle Çıkar" onChange={inputHandler} />
                        <span className="wwo" onClick={() => setWith(!wth)}>
                            {withwithout(wth)}
                            <span className="ad"><i className='fas fa-angle-down'></i></span>
                        </span>
                    </div>
                    <div className="wwlists">
                        <p>Olsun</p>
                        <ul className="listwwo">
                            {wtha.map((item) => {
                                return (<li><i class='fas fa-angle-right'></i>{item}</li>)
                            })}
                        </ul>
                        <p>Olmasın</p>
                        <ul className="listwwo">
                            {wthoa.map((item) => {
                                return (<li><i class='fas fa-angle-right'></i>{item}</li>)
                            })}
                        </ul>
                    </div>
                </div>
                <List parentaddCallback={addingredient} parentremoveCallback={removeingredient} input={inputText} wtha={wtha} wthoa={wthoa} data={ingredients} with={wth} />
            </div>
        );
    }

    const renderc=()=> {// eslint-disable-line
        let page = loading
            ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
            : App.renderpage(ingredients);

        return (
            <div className="page">
                <Logo />
                <Navigation />
                {page}
            </div>
        );
    }

    const populateData = async () => {// eslint-disable-line
        const response = await fetch('https://localhost:7186/api/Ingredients');
        const data = await response.json();
        setIngredients(data.ingredients);
        setLoad(false);
    }
    return renderc();

} // eslint-disable-line

function List(props) {
    const renderbycolor = (item) => {
        if (props.wtha.includes(item.ingredientName)) {
            return (
                <Card className="itemcard" style={{ backgroundColor: 'green' }} id={"ing" + item.id} key={item.id} onClick={() => changecolor(item.id)}>
                    <CardBody>
                        <CardImg variant="top" src={item.pictureUrlName} />
                        <CardTitle style={{ color: 'white' }} tag="h5">{item.ingredientName}</CardTitle>
                    </CardBody>
                </Card>
            )
        }
        else if (props.wthoa.includes(item.ingredientName)) {
            return (
                <Card className="itemcard" style={{ backgroundColor: 'darkred' }} id={"ing" + item.id} key={item.id} onClick={() => changecolor(item.id)}>
                    <CardBody>
                        <CardImg variant="top" src={item.pictureUrlName} />
                        <CardTitle style={{ color: 'white' }} tag="h5">{item.ingredientName}</CardTitle>
                    </CardBody>
                </Card>
            )
        }
        else {
            return (
                <Card className="itemcard" id={"ing" + item.id} key={item.id} onClick={() => changecolor(item.id)}>
                    <CardBody>
                        <CardImg variant="top" src={item.pictureUrlName} />
                        <CardTitle tag="h5">{item.ingredientName}</CardTitle>
                    </CardBody>
                </Card>
            )
        }
    }
    const changecolor = (itemid) => {
        const id = "ing" + itemid;
        const a = document.getElementById(id);
        if (a.style.backgroundColor != "green" && a.style.backgroundColor != "darkred") {
            if (props.with == true) {
                a.style.backgroundColor = "green";
            }
            else {
                a.style.backgroundColor = "darkred";
            }
            props.parentaddCallback(itemid);

        }
        else {
            a.style.backgroundColor = "white";
            props.parentremoveCallback(itemid);
        }
    }
    //create a new array by filtering the original array
    var i = 0;
    const filteredData = props.data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el.ingredientName;
        }
        //return the item which contains the user input
        else {
            return el.ingredientName.toLowerCase().includes(props.input)
        }
    })
    return (
        <Container className="inggrid overflow-auto">
            <Row>
                {filteredData.map((item, i) => {
                    return (
                        <Col className="cl">
                            {renderbycolor(item) }
                        </Col>
                    )
                })}
            </Row>

        </Container>
    )
}
export default App;
