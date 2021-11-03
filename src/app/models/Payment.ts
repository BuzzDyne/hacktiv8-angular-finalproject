export interface Payment {
    id            : number
    cardOwnerName : string
    cardNumber    : string
    expirationDate: Date
    securityCode  : string
    sumOfPayment  : number
}

export interface PaymentCreate {
    cardOwnerName : string
    cardNumber    : string
    expirationDate: Date
    securityCode  : string
}