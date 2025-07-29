import React from 'react';
import { Link } from 'react-router-dom';
import categories from './data/categories';



export default function FrontPage() {

    return (
    <div className="front-page">
        <div className="gallery">
            <Link
                to = {`/allProducts`}
                className="card-link"
            >
                <div className="card">
                    <div className="square">
                        <div className ="front-page-text">
                            全部产品
                        </div>
                    </div>
                </div>

            </Link>
            {categories.map((item, index) => (
            <Link
                to={`/category/${encodeURIComponent(item)}`}
                key={item}
                className="card-link"
            >
                <div className="card">
                    <div className="square">
                        {item}
                    </div>
                </div>
            </Link>
            ))}
        </div>
    </div>
    );
}