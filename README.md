The inner circles should not depend on anything on the outer circle

services
└── authService
    ├── src
    │   ├── adpters - 4
    │   │   ├── schema
    │   │   ├── repositories  
    │   │   └── routes //res.send and express functions
    │   ├── app - 1
    │   │   ├── entities 
    │   │   ├── errors
    │   │   ├── interfaces
    │   │   └── utils
    │   ├── controllers - 3
    │   ├── usecases - 2
    │   ├── infrastructure - 4
    │   │   ├── mongodb
    │   │   │   ├── dbconnection.ts
    │   │   │   └── driverConnection.ts
    │   │   └── rabbitmq
    │   └── main.ts
    └── ...

1. Entities
2. Usecases
3. Controllers
4. Adapters and infrastructure


Arcitecture 1

services
└── authService
    ├── src
    │   ├── adpters
    │   │   ├── database
    │   │   │   └── mongoose
    │   │   ├── controllers
    │   │   ├── middlewares
    │   │   └── routes
    │   ├── app
    │   │   ├── entities
    │   │   ├── errors
    │   │   ├── interfaces
    │   │   ├── usecases
    │   │   └── utils
    │   ├── infrastructure
    │   │   ├── mongodb
    │   │   └── rabbitmq
    │   └── main.ts
    └── ...


Arcitecture 2

    services
└── authService
    ├── src
    │   ├── adpters
    │   │   ├── schema
    │   │   ├── repositories  
    │   │   └── routes
    │   ├── app
    │   │   ├── entities 
    │   │   ├── errors
    │   │   ├── interfaces
    │   │   └── utils
    │   ├── controllers
    │   ├── usecases
    │   ├── infrastructure
    │   │   ├── mongodb
    │   │   │   ├── dbconnection.ts
    │   │   │   └── driverConnection.ts
    │   │   └── rabbitmq
    │   └── main.ts
    └── ...