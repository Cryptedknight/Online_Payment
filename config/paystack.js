const paystack = (request)=>{
    const myseckey = 'Bearer sk_test_af54d3dc10f51cb7279e6aa0a5cfd554de303811';
    const initializePayment = (form,mycallback)=>{
        
        const options = {
            url: 'https://api.paystack.co/transaction/initialize',
            headers: {
                authorization : myseckey,
                'content-type' : 'application/json',
                'cache-control': 'no-cache'
            },
            form
        }
        
        const callback = (error,response,body)=>{
            return mycallback(error,body)
        }
        request.post(options,callback)
    }

const verifyPayment = (ref,mycallback)=>{
    const options = {
        url:  'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref),
        headers: {
            authorization : myseckey,
            'content-type' : 'application/json',
            'cache-control': 'no-cache'
            
        }
    }
    const callback = (error,response,body)=>{

        return mycallback(error,body)
    }
    request(options,callback)
}


return {initializePayment,verifyPayment};

}
module.exports = paystack;