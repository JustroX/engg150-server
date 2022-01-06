## Description

Engg150 - NFT trading server

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Environment Variables

Prepare a `.env` file in the root folder with the following values:

```.env
MONGODB_URI=<your mongodb uri>
JWT_SECRET=<passphrase for encrypting JWT session tokens>
```

# Api Reference

## Notes

Since this server is built for demo purposes, there are some limitations outlined below:

- Request validation is skipped. So, please follow this documentation properly as invalid requests will lead to undefined behaviour.
- Only the `Users` and the `Auth` endpoints are authentication-gated. `Offer` and `Transaction` endpoints are left ungated to make it easier to interact with the system during the demo.
- The `Offer`'s `seller_id` and `buyer_id` need not be registered in the `User` collection. You can send random strings during the demo.

## Users

### 1. Register

Registers a user

```
POST /users
```

#### Request Body

- username `string` - Username
- password `string` - Password
- name `string` - Name
- email `string` - Email
- walletID `string` - Wallet ID
- mobile_number `string` - Mobile number

#### Response

- \_id `string` - ID of the user
- username `string` - Username
- name `string` - Name
- email `string` - Email
- walletID `string` - Wallet ID
- mobile_number `string` - Mobile number

### 2. Get self

Gets the user information of the current user. User should login first.

```
GET /users/self
```

#### Request Params

None

#### Response

- \_id `string` - ID of the user
- username `string` - Username
- name `string` - Name
- email `string` - Email
- walletID `string` - Wallet ID
- mobile_number `string` - Mobile number

### 3. Get User by ID

Gets the user by ID.

```
GET /users/:userID
```

#### Request Params

- userID `string` - ID of the user

#### Response

- \_id `string` - ID of the user
- username `string` - Username
- name `string` - Name
- email `string` - Email
- walletID `string` - Wallet ID
- mobile_number `string` - Mobile number

---

## Auth

### 1. Login

Authenticates a user.

```
POST /auth/login
```

#### Request Body

- username `string` - Username
- password `string` - Password

#### Response

- access_token `string` - JWT token for the user

### 2. Logout

Logs out a user.

```
DELETE /auth/logout
```

#### Request Body

- none

#### Response

- none

## Offer

### 1. Create Offer

Generates an offer

```
POST /offers
```

#### Request Body

- nft_id `string` - The NFT id
- seller `string` - ID of the seller
- buyer `string` - ID of the buyer
- amount `number` - Price offer

#### Response

- \_id `string` - ID of the offer
- nft_id `string` - The NFT id
- seller `string` - ID of the seller
- buyer `string` - ID of the buyer
- amount `number` - Price offer
- createdAt `number` - Timestamp of when the offer is created

### 2. Get offer

Get offer by ID

```
GET /offers/:offerID
```

#### Request Params

- offerID `string` - ID of the offer

#### Response

- \_id `string` - ID of the offer
- nft_id `string` - The NFT id
- seller `string` - ID of the seller
- buyer `string` - ID of the buyer
- amount `number` - Price offer
- createdAt `number` - Timestamp of when the offer is created

### 3. List offers

List current active offers

```
GET /offers
```

#### Request Params

None

#### Response

Array of objects with following attributes

- \_id `string` - ID of the offer
- nft_id `string` - The NFT id
- seller `string` - ID of the seller
- buyer `string` - ID of the buyer
- amount `number` - Price offer
- createdAt `number` - Timestamp of when the offer is created

## Transaction

### 1. Accept offer

Accepts an offer (i.e. start a transaction).

```
POST /transactions/:offerID
```

#### Request Params

- offerID `string` - ID of the offer

#### Response

- \_id `string` - ID of the transaction
- offer `object`
  - \_id `string` - ID of the offer
  - nft_id `string` - The NFT id
  - seller `string` - ID of the seller
  - buyer `string` - ID of the buyer
  - amount `number` - Price offer
  - createdAt `number` - Timestamp of when the offer is created
- is_nft_received `boolean` - Whether the seller succesfully sent their nft to the system's NFT wallet.
- is_payment_received `boolean` - Whether the buyer succesfully sent their payment to the system's mobile number wallet.
- is_approved `boolean` - Whether the system successfully sent the NFT to the buyer and the payment to the seller.
- last_updated `number` - Timestamp of when this transaction is last updated.

### 2. Receive NFT

Called when the seller has sent their NFT to the system's crypto wallet.

```
POST /transactions/:transactionID/nft
```

#### Request Params

- transactionID `string` - ID of the transaction

#### Response

- \_id `string` - ID of the transaction
- offer `object`
  - \_id `string` - ID of the offer
  - nft_id `string` - The NFT id
  - seller `string` - ID of the seller
  - buyer `string` - ID of the buyer
  - amount `number` - Price offer
  - createdAt `number` - Timestamp of when the offer is created
- is_nft_received `boolean` - Whether the seller succesfully sent their nft to the system's NFT wallet.
- is_payment_received `boolean` - Whether the buyer succesfully sent their payment to the system's mobile number wallet.
- is_approved `boolean` - Whether the system successfully sent the NFT to the buyer and the payment to the seller.
- last_updated `number` - Timestamp of when this transaction is last updated.

### 3. Receive Payment

Called when the buyer has sent their payment to the system's mobile number wallet.

```
POST /transactions/:transactionID/payment
```

#### Request Params

- transactionID `string` - ID of the transaction

#### Response

- \_id `string` - ID of the transaction
- offer `object`
  - \_id `string` - ID of the offer
  - nft_id `string` - The NFT id
  - seller `string` - ID of the seller
  - buyer `string` - ID of the buyer
  - amount `number` - Price offer
  - createdAt `number` - Timestamp of when the offer is created
- is_nft_received `boolean` - Whether the seller succesfully sent their nft to the system's NFT wallet.
- is_payment_received `boolean` - Whether the buyer succesfully sent their payment to the system's mobile number wallet.
- is_approved `boolean` - Whether the system successfully sent the NFT to the buyer and the payment to the seller.
- last_updated `number` - Timestamp of when this transaction is last updated.

### 4. Approve transaction

Called when the system has sent the payment to the seller, and has sent the NFT to the buyer.

```
POST /transactions/:transactionID/approve
```

#### Request Params

- transactionID `string` - ID of the transaction

#### Response

- \_id `string` - ID of the transaction
- offer `object`
  - \_id `string` - ID of the offer
  - nft_id `string` - The NFT id
  - seller `string` - ID of the seller
  - buyer `string` - ID of the buyer
  - amount `number` - Price offer
  - createdAt `number` - Timestamp of when the offer is created
- is_nft_received `boolean` - Whether the seller succesfully sent their nft to the system's NFT wallet.
- is_payment_received `boolean` - Whether the buyer succesfully sent their payment to the system's mobile number wallet.
- is_approved `boolean` - Whether the system successfully sent the NFT to the buyer and the payment to the seller.
- last_updated `number` - Timestamp of when this transaction is last updated.
