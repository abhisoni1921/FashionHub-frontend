import ProductForm from './ProductForm';

const EditProductModal = ({ product, onClose, onUpdated }) => (
  <ProductForm
    product={product}
    onClose={onClose}
    mode="edit"
    onUpdated={onUpdated}
  />
);

export default EditProductModal;
