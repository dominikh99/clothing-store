import ProductCard from '../product-card/product-card.component';

import { Link } from 'react-router-dom';

import { CategoryPreviewContainer, Preview } from './category-preview.styles';

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Link className="title" to={title}>{title.toUpperCase()}</Link>
            </h2>

            <Preview>
                {
                    products
                        .filter((_, index) => index < 4)
                        .map(product => {
                            return <ProductCard key={product.id} product={product} />
                        })
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}   

export default CategoryPreview;