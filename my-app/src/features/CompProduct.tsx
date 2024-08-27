import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getDataAsync, selectProduct, addDataAsync, delDataAsync, updateDataAsync } from './productSlicer';

const CompProduct = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProduct);

    useEffect(() => {
        dispatch(getDataAsync());
    }, [dispatch]);

    const [desc, setdesc] = useState<string>('');
    const [price, setprice] = useState<number>(0);
    
    const handleUpdate = (productId: string) => {
        const updatedProd = { desc, price }; // Create updated product object
        dispatch(updateDataAsync({ prod: updatedProd, id: productId }));
    };
    

    return (
        <div>
            length: {products.length}
            <hr />
            Product desc: <input onChange={(e) => setdesc(e.target.value)} value={desc} /> | {' '}
            Product Price: <input onChange={(e) => setprice(+e.target.value)} value={price} /> | {' '}
            <button onClick={() => dispatch(addDataAsync({ desc, price }))}>+</button>
            {desc} {price}
            <hr />
            {products.map((product, ind) => (
                <div key={ind}>
                    {product.desc} - {'' + product.price} - 
                    <button 
                        onClick={() => {
                            if (product.id) {
                                dispatch(delDataAsync(product.id));
                            }
                        }}
                    >
                        DEL
                    </button>
                    <button 
                        onClick={() => {
                            if (product.id) {
                                handleUpdate(product.id); // Pass id and updated product
                            }
                        }}
                    >
                        UPDATE
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CompProduct;
