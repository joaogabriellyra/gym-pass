# App

GymPass style app.

# FRs (Functional Requirements)

- [x] It must be possible to register;
- [x] It must be possible to authenticate;
- [x] It must be possible to retrieve the profile of a logged-in user;
- [x] It must be possible to retrieve the number of check-ins performed by the logged-in user;
- [x] It must be possible for the user to retrieve their check-in history;
- [ ] It must be possible for the user to search for nearby gyms;
- [ ] It must be possible for the user to search for gyms by name;
- [x] It must be possible for the user to check in at a gym;
- [ ] It must be possible to validate a user's check-in;
- [x] It must be possible to register a gym;

# BRs (Business Rules)

- [x] A user cannot register using an already registered email;
- [x] A user cannot perform two check-ins on the same day;
- [x] A user cannot check in if they are not within 100 meters of the gym;
- [ ] A user cannot check in if they are not within 100 meters of the gym;
- [ ] A check-in can only be validated 20 minutes after it is created;
- [ ] A check-in can only be validated by administrators;
- [ ] A gym can only be registered by administrators;

# NFRs (Non-Functional Requirements)

- [x] The user's password must be encrypted;
- [x] Application data must be stored in a PostgreSQL database;
- [x] All data lists must be paginated with 20 items per page;
- [ ] The user must be identified using a JWT (Json Web Token);
