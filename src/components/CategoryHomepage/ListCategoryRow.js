import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CategoryRow from './CategoryRow';

<<<<<<< HEAD
export default function ListCategoryRow({ isRoom, roomId }) {
=======
export default function ListCategoryRow() {
>>>>>>> 988778530d2f2f0d0c42f0fb326cdda533aededd
    const [listCategory, setListCategory] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(0);
    //
    const renderCategory = () => {
        let listCategorySlice = listCategory.slice(currentProduct, currentProduct + 6);
        return listCategorySlice.map((category) => <CategoryRow category={category} />);
    };
    //
    const handleClickBack = useCallback((currentProduct) => {
        if (currentProduct != 0) {
            document.getElementById('list-category-homepage').classList.add('go-out-back');
            setTimeout(() => {
                document.getElementById('list-category-homepage').classList.remove('go-out-back');
                setCurrentProduct((prev) => (prev -= 6));
            }, 500);
        } else {
            document.getElementById('list-category-homepage').classList.add('go-out-back');
            setTimeout(() => {
                document.getElementById('list-category-homepage').classList.remove('go-out-back');
                setCurrentProduct(24);
            }, 500);
        } else {
            document.getElementById('list-category-homepage').classList.add('go-out-back');
            setCurrentProduct(24);
            setTimeout(() => {
                document.getElementById('list-category-homepage').classList.remove('go-out-back');
            }, 500);
        }
    }, []);
    //
    const handleClickNext = useCallback((currentProduct) => {
<<<<<<< HEAD
        if (currentProduct < listCategory.length - 6) {
=======
        if (currentProduct < 24) {
>>>>>>> 988778530d2f2f0d0c42f0fb326cdda533aededd
            document.getElementById('list-category-homepage').classList.add('go-out-next');
            setTimeout(() => {
                document.getElementById('list-category-homepage').classList.remove('go-out-next');
                setCurrentProduct((prev) => (prev += 6));
            }, 500);
        } else {
            document.getElementById('list-category-homepage').classList.add('go-out-next');
            setTimeout(() => {
                document.getElementById('list-category-homepage').classList.remove('go-out-next');
                setCurrentProduct(0);
            }, 500);
        } else {
            document.getElementById('list-category-homepage').classList.add('go-out-next');
            setCurrentProduct(0);
            setTimeout(() => {
                document.getElementById('list-category-homepage').classList.remove('go-out-next');
            }, 500);
        }
    }, []);
    //
    //
    useEffect(() => {
        axios
            .get('/guest/category')
            .then((res) => setListCategory(res.data))
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div id="list-category-homepage" className="list-category-homepage">
            <div className="back">
                <svg
                    onClick={() => handleClickBack(currentProduct)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-arrow-left-circle-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                </svg>
            </div>

            {renderCategory()}
            <div className="next">
                {' '}
                <svg
                    onClick={() => handleClickNext(currentProduct)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-arrow-right-circle-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
            </div>
        </div>
    );
}
