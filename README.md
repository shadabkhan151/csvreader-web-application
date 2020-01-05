**Vue application to read data from csv file and store it to database**

You can run this application with following 3 avaialble methods -

**1. Running on local using npm command**

#Installation <I'm using homebrew package manager>
> brew install node
> node -v          // to check node version, should be > 6.10
> npm -v           // to check npm version, should be > v13

Above command will install node with npm. For reference - https://nodejs.org/en/download/package-manager/#macos

#Run npm install to download node_modules
> npm install --save

#Run application 
> npm run serve


Url for application : http://localhost:<port>/

Here, port=8080, if available else another port in sequence of 8080 for example - http://localhost:8081/


**2. Build and Run with docker**

#Run following docker command to access the application 

> docker build -t csvreaderapp:v1 .
> docker run -d -p <target port>:<internal port> csvreaderapp:v1

Here, 'target port' = 8081 and 'internal port' = 8080

You can use any available port in place of target port

Application url : http://localhost:8081/

Note: Please install docker desktop in your local machine before executing above command, for reference - https://hub.docker.com/editions/community/docker-ce-desktop-mac


**3. Run with available docker image in docker hub**

# I have stored tags in docker hub 

> docker run -d -p 8081:8080 shadabkhan1407/shkhan:csvreaderapp_v1

Make sure to run another docker image as given below (Backend service to store csv data in database)

> docker run -d -p 8080:8080 shadabkhan1407/shkhan:csvservice_v1

**Urls -**

a. swagger url -> http://localhost:8080/readnstore/swagger-ui.html#/ <br/>
b. H2 database url -> http://localhost:8080/readnstore/h2/ <br/>
c. backend service urls :  <br/>
    c.1 :  getall()   - http://localhost:8080/readnstore/v1/data <br/>
    c.2 :  getbyid()  - http://localhost:8080/readnstore/v1/data/{id} <br/>
    c.3 :  postdata() - http://localhost:8080/readnstore/v1/store/csv <br/>
