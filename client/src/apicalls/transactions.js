const {axiosInstance} = require('.');

// verify receiver account 

export const VerifyAccount = async(payload) => {
    try{
        const {data} = await axiosInstance.post(
            "/api/transactions/verify-account",
            payload
        );
        return data; 
    } catch(error){
        return error.response.data; 
    }
}

// transfer funds

export const TransferFunds = async(payload) => {
    try{
        const {data} = await axiosInstance.post(
            "/api/transactions/transfer-funds",
            payload
        );
        return data; 
    } catch(error){
        return error.response.data; 
    }
}

// get all transactions for a user 
export const GetAllTransactionsOfUser = async() =>{
    try{
        const {data} = await axiosInstance.post(
            "/api/transactions/get-all-transactions-by-user"
            )
        return data;
    } catch(error){
            return error.response.data;
    }
}

// deposit funds using strip 
export const DepositFunds = async (payload) => {
    try {
        const { data } = await axiosInstance.post("/api/transactions/deposit-funds", payload); 
        return data;
    } catch (error){
        return error.response.data; 
    }
}