sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Accesses the Single Page Application (SPA)
    activate Browser
    Browser->>Server: Requests application data
    activate Server
    Server-->>Browser: Sends application data
    deactivate Server
    Browser-->>User: Displays application interface
    User->>Browser: Enters new note data
    Browser-->>User: Displays entered note data
    User->>Browser: Clicks "Save" button
    Browser->>Server: Sends new note data
    activate Server
    Server-->>Browser: Confirms successful note creation
    deactivate Server
    Browser-->>User: Indicates successful note creation
    deactivate Browser