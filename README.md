## Grootan-project-round-2 csv-to-db
The web application uses back-end using Express and Node js and Mongodb, Mongoose ORM, Bcrypt, csvtojson, express-fileupload. The front-end application is developed using HTML, CSS and Javascript. This web application allows users to upload .csv files to the server, where the csv file is converted to json file for easier working, then every single row is inserted to the data base. The application also encrypts the password credentials from the column named "password". The application's front-end is developed using HTML, CSS and Javascript. The front-end application makes api requests to the server end points for uploading data and also receiving informations about the uploads.

### Key aspects
    1.Displaying the progress of the upload to the database.
    2.Password column is encrypted using a library Bcrypt package.
    3.Prevents reuploading same csv file to the server.
    4.Error messages displayed in the UI in while encountering errors.
