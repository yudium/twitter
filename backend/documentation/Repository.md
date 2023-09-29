# Repository

## Problem

One problem with mocking datastore mechanism in unit test sometime a function calls datastore several times with different query. Mocking them become complex and need conditional logic inside the mock. Hence the codebase uses repository pattern to hide complexity of fetching and storing data to datastore behind an abstraction that can be easier to be mocked. Other than that, it is good for us to see all queries next each other so we can reuse them easily avoiding recreating same query.