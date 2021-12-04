import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import axios from 'axios';

// Products Redux States
import GET_PRODUCT_LIST from './actionTypes';

function* getProductList(){

    const productList = [{
        codigo: "5110003",
        descricao: "Short de couro com zíper",
        cor: "Preta",
        marca: "Zara",
        categoria: "Short",
      },
      {
          codigo: "5110006",
          descricao: "Short de linho",
          cor: "Azul",
          marca: "Forever 21",
          categoria: "Short",
        },
    ]
    put(productList);
}

export function* watchProductList() {
    yield takeEvery(GET_PRODUCT_LIST, getProductList)
}


