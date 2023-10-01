# Repository

## Problem

Problem with mocking datastore mechanism in unit test sometimes a function calls datastore several times with different query. Mock them can be challenging hence repository pattern is introduced that more easier to be mocked. Additionally, grouping queries makes them sit next each other and more easier to manage the query such as checking existing query to avoid recreating queries.