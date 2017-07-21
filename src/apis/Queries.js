
export const GET_MERCHANT = '{ user(email: {email}) { first_name last_name merchants { tname logo_url stores { id name sid address { line1 city_town } } } roles { id store_id name permissions } } } ';
export const LOGIN_MUTATION = `
    mutation ($user: LoginInput!){
        logIn(input: $user) {
            token_type, expires_in, access_token, refresh_token
            user { 
                id email first_name last_name mobile 
                merchants {
                    id mid tname phone logo_url business_type
                    stores {
                        id name sid region_id
                        address { line1 city_town }
                        region { id region_name }
                    }
                }
                roles { id name store_id merchant_id permissions }
            }
        }
    }
`;
export const REFRESH_TOKEN_MUTATION = `
    mutation ($input: RefreshTokenInput!){
        refreshToken(input: $input) {
            token_type, expires_in, access_token, refresh_token
        }
    }
`;
export const GET_PRODUCT_BY_BARCODE = `
    query getProductByCode($store_id: String!, $bar_code: String!) {
        products(store_id: $store_id, bar_code: $bar_code){
            id name bar_code category_id
            category { id name }
            prices { store_id click_price pos_price margin taxes { id name rate } } 
            stocks { id store_id stock minimum }
        }
    }
`;

export const UPDATE_PRODUCT_MUTATION = `
    mutation ($product: ProductInput!){
        updateProduct(input: $product) {
            id bar_code name
        }
    }
`;

export const GET_USER = `
    query getUser($email: String!){
        user(email: $email) {
            id email mobile
            first_name last_name 
            merchants {
                id mid tname phone logo_url business_type
                stores {
                    id name sid region_id
                    address { line1 city_town }
                    region { id region_name }
                }
            }
            roles { id name permissions } 
        } 
    }
`;

export const UPDATE_USER_MUTATION = `
    mutation ($user: UserInput!){
        updateUser(input: $user) { id }
    }
`;

// remove suppliers{ id name stock { id stock } }
export const GET_GLOBAL_INVENTORY_BY_CODE = `
    query getUser($bar_code: String!){ 
        globalInventory(bar_code: $bar_code) { 
            id name
            pack_item
            bar_code image_url rrp
            product_code
            category { id name } 
            taxes { id name rate } 
        }
    }
`;

export const GET_CATEGORIES = `
    query getCategories($store_id: String!){
        categories(store_id: $store_id){ id parent name }
    }
`;
export const GET_TAXES_BY_STORE_ID = `
    query getTaxes($store_id: String!){ store(id: $store_id){ taxes { id name rate } } }
`;

export const ADD_PRODUCT_MUTATION = `
    mutation ($product: ProductInput!){
        addProduct(input: $product) {
            id
        }
    }
`;

export const GET_LIST_ORDERS = `
    query getOrdersList($start: String!, $end: String!) {
         orders(start: $start, end: $end) {
             id
             order_no
             creation_time
             total_price {
                amount
                taxes{
                    amount
                }
             }
             payments {
                 id
                 payment_type
                 amount
             }
         }
}
`;

export const GET_ORDER_DETAIL = `
    query getOrderDetail($id: String!) {
          orders(id: $id) {
                id
                order_no
                creation_time
                user_id
                user_name
                device_id
                device_name
                store_id
                merchant_name
                store {
                      tax_references
                      phone
                      address {
                            id
                            line1
                            line2
                            county
                            postcode
                            city_town
                      }
                }
                order_items {
                      id
                      quantity
                      name
                      price {
                            amount
                            taxes {
                                  name
                                  amount
                                  rate
                            }
                            
                      }
                      product_id
                      order_item_addons {
                            name
                            price {
                                  amount
                                  taxes {
                                    id
                                  }
                            }
                      }
                     
                }
                total_price {
                    amount
                    taxes {
                        id
                        amount
                     }
                }
                payments {
                      payment_type
                      amount
                      id
                      change_due
                }
                
          }
}
`;

export const SEND_RESET_CODE_MUTATION = `
    mutation ($input: ResetCodeInput!){
        sendResetCode(input: $input)
    }
`;

export const RESET_PASSWORD_MUTATION = `
    mutation ($input: PasswordResetInput!){
        passwordReset(input: $input)
    }
`;

export const ADD_PROMOTION_MUTATION = `
    mutation ($promotion: PromotionInput!) {
      addPromotion(input: $promotion) {
        id
      }
    }
`;

export const GET_REPORTS_LIST = `
    query getReportsList($start: String!, $end: String!) {
          reports(start: $start, end: $end) {
                id
                start
                end
                type
                user {
                      first_name
                      last_name
                }
          }
    }
`;

export const GET_REPORT_DETAIL = `
    query getReportDetail($id: String!) {
          reports(id: $id) {
                id
                start
                end
                type
                user {
                      first_name
                      last_name
                }
                device_name
                sales_summary {
                      total_sales
                      cash_sales
                      card_sales
                      voucher_sales
                      account_payment
                      account_credit
                }
                cash_summary {
                      total_cash_sales
                      total_cash_payments
                      float
                      cash_balance
                      total_cash_refunded
                }
                product_summary{
                      category{
                            id
                            name
                      }
                      product_summary{
                            total_quantity
                            total_amount
                      }
                }
          }
}
`;

export const GET_EXPENSES_LIST = `
    query getExpensesList($filter: Filter!) {
          expenses(filter:$filter){
                id
                amount
                created_at
                updated_at
    }
}
`;
