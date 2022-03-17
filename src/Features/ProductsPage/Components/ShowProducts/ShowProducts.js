import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../../common/loading/Loading';
import { db } from '../../../../firebase/firebase-config';
import { getAllProduct } from '../../../../redux/actions/productAction';
import ShowProductCard from './ShowProductCard';

const ShowProducts = () => {

    const [cat, setCat] = useState([]);
    let [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const cats = useSelector((state) => state.cat.types);
    let products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();

    const productsCollectionRef = collection(db, "products");

    useEffect(() => {
        if (products.length > 0) {
            setData(products);
            setIsLoading(false);
        }
    }, [products]);

    useEffect(() => {
        if (cats.length > 0) {
            setCat(cats);
            setIsLoading(false);
        }
    }, [cats]);

    useEffect(() => {
        const getProducts = async () => {
            const data = await getDocs(productsCollectionRef);
            dispatch(getAllProduct(data.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }))));
        }

        getProducts();
    }, []);

    const ShowProductItem = (data) => {
        var result = null;
        if (data.length > 0) {
            result = data.map((product, index) => {
                return <ShowProductCard key={index} product={product} index={index} />
            })
        }
        return result;
    }

    const showFilterButton = (cat) => {
        var result = null;
        if (cat.length > 0) {
            result = cat.map((type, index) => {
                return <button key={index} className="btn btn-outline-dark me-2" onClick={() => filterProduct(`${type.type}`)}>{type.name}</button>
            })
        }
        return result;
    }

    const filterProduct = (type) => {
        const updatedList = products.filter((x) => x.type === type);
        setData(updatedList);
    }

    const render = () => {
        // filter
        if (search) {
            data = data.filter(product => {
                return product.name.toLowerCase().indexOf(search) !== -1;
            });
        }
    }
    render();

    const onSearch = (e) => {
        var target = e.target;
        var value = target.value;
        setSearch(value);
    }


    if (isLoading === true) {
        return <Loading />;
    }

    return (
        <>
            <div className="buttons d-flex justify-content-center mb-4 col-12">
                <button className="btn btn-outline-dark me-2" onClick={() => setData(products)}>Tất cả</button>
                {showFilterButton(cat)}
            </div>
            <div className="mb-5 text-center">
                <label htmlFor="search" className="form-label">Tìm kiếm</label>
                <input type="text" className="form-control w-25 m-auto" id="search" placeholder="Nhập ..." onChange={onSearch} />
            </div>
            {ShowProductItem(data)}
        </>
    );
};

export default ShowProducts;