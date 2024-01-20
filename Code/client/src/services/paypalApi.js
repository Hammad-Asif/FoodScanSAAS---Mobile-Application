// let baseUrl = 'https://api-m.sandbox.paypal.com';  // --- For Sand Box
let baseUrl = 'https://api-m.paypal.com'  // --- For Live
const base64 = require('base-64');

// let clientId = 'AbZA6yfCFnQbFbnsgz-FRthp1QN_tPGrZAMBq93LWVL9FxbpVk2Qr6bwMdIDn7E7kHEpJsUJNlNd-UV4';  // --- For Sand Box
// let secretKey = 'ELMBM8XqfeqU5oW6sE_i4H-MOGnpAddsrtjXFg7q0CJQ4ncroMAeGCB4-e-2MK_vURr1rR-NOIquIltN';  // --- For Sand Box

let clientId = 'AZKKpjrlNHY1hgnGPNxTsqWUwMJC-q1GHMO7TYp9o7mIUNuJkXOqnOe9QQzAoF9m5F-F9TACnR8aMEYx';  // --- For Live
let secretKey = 'EIe3xxOvgXmF6cIbDGHL5UkM9RVjJspD39ed4txmurapVOkEDWm5jjn7jmFVudVccIvn0vlut6a5Zsn0';  // --- For Live

let orderDetail = (plan, amount) => {
    return {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "items": [
                    {
                        "name": plan,
                        "description": "Fooo App Subscription",
                        "quantity": "1",
                        "unit_amount": {
                            "currency_code": "USD",
                            "value": amount
                        }
                    }
                ],
                "amount": {
                    "currency_code": "USD",
                    "value": amount,
                    "breakdown": {
                        "item_total": {
                            "currency_code": "USD",
                            "value": amount
                        }
                    }
                }
            }
        ],
        "application_context": {
            "return_url": "https://example.com/return",
            "cancel_url": "https://example.com/cancel"
        }
    }
}


const generateToken = () => {
    var headers = new Headers()
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic " + base64.encode(`${clientId}:${secretKey}`));

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: 'grant_type=client_credentials',
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/v1/oauth2/token', requestOptions).then(response => response.text()).then(result => {
            console.log("result print generate token ", result)
            const { access_token } = JSON.parse(result)
            resolve(access_token)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}

const createOrder = (token = '', plan, amount) => {
    let data = orderDetail(plan, amount)
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(data)
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/v2/checkout/orders', requestOptions).then(response => response.text()).then(result => {
            console.log("result print created order", result)
            const res = JSON.parse(result)
            resolve(res)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}

const capturePayment = (id, token = '') => {
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions).then(response => response.text()).then(result => {
            // console.log("result print", result)
            const res = JSON.parse(result)
            resolve(result)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}

export default {
    generateToken,
    createOrder,
    capturePayment
}