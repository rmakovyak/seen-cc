# seen-cc

## Installation

```bash
npm install
```

## Usage

Use following commands to run or test app

```bash
npm start
npm dev
npm test
```

## Endpoints

- `GET http://localhost:3000/v1/:customerId/transations` - get customer transactions
- `GET http://localhost:3000/v1/:customerId/relations` - get all customer relations

## Requirements

- Node.js
- Express

## Notes

Hi, i was happy to complete this challenge, here are my notes, assumptions and explanation for decisions i did here.

### Improvements

I only used tools that satisfies current requirements. There are a lot of things that can be improved here:

- Implement authorization using JWT with RBAC, as the API is exposed to an end-user application.
- Improve routing to accommodate a growing application.
- Enhance tests by generating test data from OpenAPI schemas, instead of relying on static data samples, which can be cumbersome to maintain as the codebase evolves.
- Add pagination and time frames to endpoints.
- Introduce caching, as the data does not change frequently, making it an ideal use case for caching.

### Assumptions

- I assumed that json data with transactions is not static and has to be requested on the fly. Otherwise, lookup strategies will be different, utilizing maps.

### Findings

- Transactions 5 and 6 have different amounts, i assume it's not a bug or issue.
- Transactions 33 and 34 have related transactions to 8 and 9, which are payments from Amazon. I assumed it's just mistake in data sample (let me know if i am wrong!)
