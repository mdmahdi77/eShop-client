import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import Paginator from 'react-hooks-paginator';
import Preloader from '../Preloader/Preloader'
import './Shop.css'

const Shop = () => {
    const pageLimit = 6;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([])
    const [currentData, setCurrentData] = useState([]);
    const [selected, setSelected] = useState("android")
    const [preloaderVisibility, setPreloaderVisibility] = useState("block")

    useEffect(() => {
        fetch('https://dry-woodland-65414.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setPreloaderVisibility("none")
            })
    }, [])

    const filterProduct = products.filter(product => product.category == selected)

    useEffect(() => {
        setCurrentData(filterProduct.slice(offset, offset + pageLimit));
    }, [offset, filterProduct]);
    // console.log(currentData)

    return (
        <div className="container-fluid my-5">
            <div className="row">
                <div className="col-md-3">
                    <h3 className="text-danger mb-4 text-center">Categories</h3>
                    <ul className="category bg-light rounded py-3 mb-5">
                        <li className="nav-item" onClick={() => setSelected("android")}>
                            <span className={selected === "android" ? "active nav-link" : "nav-link"}>Android</span>
                        </li>
                        <li className="nav-item" onClick={() => setSelected("laptop")}>
                            <span className={selected === "laptop" ? "active nav-link" : "nav-link"}>Laptop</span>
                        </li>
                        <li className="nav-item" onClick={() => setSelected("camera")}>
                            <span className={selected === "camera" ? "active nav-link" : "nav-link"}>Camera</span>
                        </li>
                    </ul>
                    <h5 className="text-warning text-center my-4">Coming Soon</h5>
                    <h6 className="text-center">More categories</h6>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        <Preloader visibility={preloaderVisibility} />
                        {
                            currentData.map(filPro => <ProductItem key={filPro._id} filPro={filPro} />)
                        }
                        <Paginator
                            totalRecords={filterProduct.length}
                            pageLimit={pageLimit}
                            pageNeighbours={2}
                            setOffset={setOffset}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;