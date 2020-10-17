# What is Redux?
Centralized data store for all application data. 
It's essentially using React's Context API 
# Actions
To modify the Redux state, you need to send out an action (takes arguments, forms payload, and sends over to Redux). 
The `types.js`, which is more so for interoperability than being a requirement, defines string constants for the action names. 
# Reducers 
Redux passes its current state to a reducer - modifies existing state and returns new state replacing current one, triggering reload of affected components. 

Most of the business logic lies here (`auth.js` ). Most common set up is with a switch statement handling case based on action type. 

`index.js` in reducers essentially passes in feature reducer: auth to create a single top-level reducer passed to store. 
# Components 
# Containers 

# Hocs 
