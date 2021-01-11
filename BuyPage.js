import React, {useState, useEffect} from "react";
import Axios from "axios";

import CartItem from "./CartItem";
import { random, commerce } from "faker";
import {Container, Col, Row} from "reactstrap"

const api_key = "INSET_YOUR_KEY_HERE" //"Insert your key here"

const url = "https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1";

const localurl = "https://jsonware.com/json/7f26bf2c0233a09ad8426b4e6ad9ccbd.json";

//jsonware = "https://jsonware.com/json/7f26bf2c0233a09ad8426b4e6ad9ccbd.json";
//000webhost= "https://hard-hit-dares.000webhostapp.com/sayalee"
const BuyPage = ({addInCart}) =>{

    const [product, setProduct] = useState([]);

//    const fetchPhotos = async () =>{
//        const response = await Axios.get(url, {
//            headers:{
//                Authorization : api_key
//            }
//        })
//    } 
    const fetchPhotos = async () =>{
        const { data } = await Axios.get(localurl, {})
    
        const { photos } = data;

        const allProduct = photos.map(photo => ({
            smallImage : photo.src.medium,
            tinyImage: photo.src.tiny,
            productName: random.word(),
            productPrice: commerce.price(),
            id: random.uuid() // faker provide random uuid no need to install uuid package
        }));


        setProduct(allProduct);
    };


    useEffect(()=>{
        fetchPhotos();
    }, [])


    return(
        <Container fluid>
            <h1 className = "text-success text-center">
                Buy Page
            </h1>
            <Row>
                {product.map(product => (
                    <Col md={4} key={product.id}>
                        <CartItem product={product} addInCart={addInCart} />
                    </Col>
                ))}
            </Row>
        </Container>
    )

};

export default BuyPage;

// https://jsonkeeper.com/b/1QRC