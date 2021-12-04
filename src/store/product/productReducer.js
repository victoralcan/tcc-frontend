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

const INIT_STATE = {
	loading: false,
	items: { 
		category : [ ],
		sku : "",
    	title : "",
    	description : "",
    	brand : "",
    	color : "",
	},
	variations: [],
	images: []
};

const ProductReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_PRODUCT_LIST:
			return {
				...state,
				loading: false,
				items: action.payload
			};
		case GET_PRODUCT:
			return {
				...state,
				items: action.payload,
				variations: action.payload.variations
			};		
		case ADD_PRODUCT:
			return {
				...state,
				items: action.payload.items,
			};
		case UPDATE_PRODUCT:
			return {
				...state,
				items: action.payload.items,
			};
		case REMOVE_PRODUCT:
			return {
				...state,
				leftSideBarType: action.payload.sidebarType
			};
		case ADD_VARIATION:
			return {
				...state,
				variations: state.variations.concat(action.payload)
			};
		case REMOVE_VARIATION:
			return {
				...state,
				variations: action.payload
			};
		case UPDATE_VARIATION:
			return {
				...state,
				variations: action.payload
			};
		case ADD_IMAGE:
			return {
				...state,
				images: state.images.concat(action.payload)
			};
		case REMOVE_IMAGE:
			return {
				...state,
				images: action.payload
			};
		default:
			return state;
	}
};

export default ProductReducer;
