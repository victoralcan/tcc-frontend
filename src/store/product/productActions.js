import axios from 'axios';
import {
	GET_PRODUCT_LIST,
    GET_PRODUCT,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    REMOVE_PRODUCT,
    ADD_VARIATION,
    REMOVE_VARIATION,
    UPDATE_VARIATION,
    ADD_IMAGE,
    REMOVE_IMAGE,
} from "./productActionTypes";

const API_URL = "http://localhost:8080/api";

export const getProductList = () => dispatch => {
    // dispatch(setItemsLoading());
    axios.get(API_URL + '/products', {headers: { 'Access-Control-Allow-Origin': true } })
        .then(res => dispatch({
            type: GET_PRODUCT_LIST,
            payload: res.data
        }))
        .catch (err => console.error(err));
        // .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const getProduct = (id) => dispatch => {
    // dispatch(setItemsLoading());
    axios.get(`http://localhost:8080/api/products/${id}`)
        .then(res => dispatch({
            type: GET_PRODUCT,
            payload: res.data
        }))
        .catch (err => console.log(err));
    //     // .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addProduct = (item, variations, images) => dispatch => {
    item.variations = variations;
    item.images = images;
    console.log(item);
    axios.post('http://localhost:8080/api/products/', item)
        .then(res => dispatch({
            type: ADD_PRODUCT,
            payload: res.data
        }))
        .catch (err => console.log(err));
}

export const updateProduct = (item, variations, images) => dispatch => {
    const id = item.id;
    item.variations = variations;
    item.images = images;
    console.log(item);
    axios.put(`http://localhost:8080/api/products/${id}`, item)
        .then(res => dispatch({
            type: UPDATE_PRODUCT,
            payload: res.data
        }))
        .catch (err => console.log(err));
}

export const addVariation = () => ({
        type: ADD_VARIATION,
        payload: [
            { skuItem: "newSku" + Date.now(),
            size: "",
            buyingPrice: 0,
            buyingDate: "",
            sellingPrice:  0,
            rentingPrice:  0,
            salePrice:  0,
            isSale:  'Não',
            localization:  "",
            lastRentingDate:  "",
            updateDate:  "",
            stockCheckDate:  "" }]
});

export const removeVariation = (variations, skuItem) => {
    const newVariations = variations.filter((item) => item.skuItem !== skuItem);
    return {
		type: REMOVE_VARIATION,
		payload: newVariations
	};
};

export const updateVariation = (variations, newVariation) => {
    const skuItem = newVariation.skuItem;
    const newVariations = variations.filter((item) => item.skuItem !== skuItem);
    return {
		type: UPDATE_VARIATION,
		payload: newVariations.concat(newVariation)
	};
};

export const addImage = (images) => {
    return {
		type: ADD_IMAGE,
		payload: images
	};
};

export const removeImage = (images, i) => {
    const newImages = images.filter((item) => item.name !== i);
    return {
		type: REMOVE_IMAGE,
		payload: newImages
	};
}