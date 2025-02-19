sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Accesses the SPA
    activate Browser
    Browser->>Server: Requests the SPA page
    activate Server
    Server-->>Browser: Returns the SPA page
    deactivate Server
    Browser-->>User: Displays the SPA page
    deactivate Browser
