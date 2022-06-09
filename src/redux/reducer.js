const intialState = {
    provider: null,
    connected: false,
    selectedAccount: {
        address: null,
        balance: null,
    },
    contract: null,
    publicContract: null,
    stakerContract: null,
    tokenContract: null,
    nfts: [],
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case "SET_PROVIDER":
            return { ...state, provider: action.payload }
        case "SET_CONNECTED":
            return { ...state, connected: action.payload }
        case "STORE_NFTS":
            return { ...state, nfts: state.nfts.concat(action.payload) }
        case "SET_ACCOUNT_ADDRESS":
            return { ...state, selectedAccount: { ...state.selectedAccount, address: action.payload } }
        case "SET_ACCOUNT_BALANCE":
            return { ...state, selectedAccount: { ...state.selectedAccount, balance: action.payload } }
        case "SET_PUBLIC_CONTRACT":
            return { ...state, publicContract: action.payload }
        case "SET_STAKER_CONTRACT":
            return { ...state, stakerContract: action.payload }
        case "SET_TOKEN_CONTRACT":
            return { ...state, tokenContract: action.payload }
        case "SET_CONTRACT":
            return { ...state, contract: action.payload }
        case "RESET": 
            return {...intialState, publicContract: state.publicContract }
        default:
            return state
    }
}

export default reducer;