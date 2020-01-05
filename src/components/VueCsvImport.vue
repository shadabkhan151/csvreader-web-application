<template>
    <div class="vue-csv-uploader">
            <div class="child-div">
                <label class="text-reader">
                    <span class="span1">CSV File to uplaod :</span>
                    <input type="file" class="fileType" @change="loadTextFromFile($event)" v-on:click="cleardata" onclick="this.value=null;">
                    <br>
                    <br>
                    <b-spinner v-if="loading" style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
                    <span class="success">{{successMessage}}</span>
                    <br>
                    <p v-if="isValidFileMimeType" class="csv">Invalid file type. Please choose .csv file to upload.</p>
                    <p v-if="isError" class="csv">{{errormessage}}</p>
                    <br>
                    <br>
                    <p v-if="isInvalidDataPresent" class="para1">Rejected rows</p>
                    <textarea v-if="isInvalidDataPresent" :value="rejectedRows" rows="2" cols="35" class="textArea"></textarea>
                    <p v-if="isInvalidDataPresent" class="para2">Note: Row(s) must match header count (5)</p>
                </label>
            </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import mimeTypes from "mime-types";
    import Api from '@/utils/API';

    export default {
        name:'textreader',
        data: () => ({
            loading: false,
            isValidFileMimeType: false,
            isError: false,
            csvDTOS: [],
            splitdata:[],
            errormessage: '',
            rejectedRows: [],
            isInvalidDataPresent: false,
            successMessage: '',
            csvheader:['id','lastName','location','outletName','outletType'],  
        }),
        created() {
           this.cleardata();
        },
        methods: {
            //method to load csv data in DB
            loadTextFromFile(ev) {
            if(ev.target.files[0] != null){ 
                if(this.validFileMimeType(ev)){
                    //reset values
                    this.cleardata();
                    //read file
                    const file = ev.target.files[0];
                    const reader = new FileReader();
                    reader.onload = e => {
                        let jsonResult = e.target.result;
                        //split by new line / rows
                        this.splitdata = jsonResult.split(/\r\n|\r|\n/);
                        var header = this.splitdata[0].split(',');
                        //check if valid header
                        if(this.validateHeader(header)){
                        for( var i=1; i<this.splitdata.length; i++) { 
                             // create array by splitting values with comma
                             var data = this.splitdata[i].split(',');  
                             // if row values matches header count (5), add to data list (for storing in DB)
                             if(data.length == 5) {
                                this.csvDTOS.push({
                                "id": data[0],
                                "lastName": data[1],
                                "location": data[2],
                                "outletName":data[3],
                                "outletType":data[4]
                               });
                             }// Rejected rows
                             else{
                                 this.isInvalidDataPresent = true;
                                 this.rejectedRows.push(this.splitdata[i]+'\n');
                             }
                        }  
                        //call service to store data
                        if(this.rejectedRows.length != this.splitdata.length -1 ){
                        //set spinner value 
                        this.loading = true;
                        //call service to store in db
                        Api.storeCsv(this.csvDTOS)
                         .then(response => { 
                            this.successMessage = 'Data ingestion completed.';
                            this.loading = false;
                            console.log('Response :' + response.data.statusCode);
                        })
                        .catch(error => {
                             this.loading = false;
                             this.isError = true;
                             this.errormessage = ('Network Error.');
                        });
                        } else {
                            this.loading = false;
                            this.isError = true;
                            this.errormessage = 'All rows rejected.'
                            this.successMessage = '';
                        }
                       }else {
                            this.isError = true;
                            this.errormessage = 'Invalid header. It should be : id,lastName,location,outletName,outletType'
                            this.successMessage = '';
                       }
                     }
                  reader.readAsText(file);
                }
              }else {
                  //reset values
                  this.cleardata();
              }
            },
            // method to check mime type of file
            validFileMimeType(ev) {
                let file = ev.target.files[0];
                let fileType = file.type;
                if (fileType === 'text/csv') {
                    this.isValidFileMimeType = false;
                    return true;
                } else {
                   //reset values
                    this.cleardata();
                    this.isValidFileMimeType = true;
                    return false;
                }
            },
            //validate header
            validateHeader(header){
                var matched = false;
                let count = 0;
                if(header.length == 5){
                header.forEach(e1 => { 
                    this.csvheader.forEach(e2 => {
                            if(e1 == e2){
                                count = count + 1;
                            }
                        });
                });
                if(count == 5){
                    matched = true;
                }
                return matched;
               }
            },
             cleardata(){
                this.csvDTOS = [],
                this.splitdata = [],
                this.isError = false;
                this.isValidFileMimeType = false;
                this.isInvalidDataPresent = false;
                this.successMessage = '';
                this.errormessage = '';
                this.rejectedRows = [];
                this.loading = false;
            }
        },
    };
</script>
<style scoped>
.csv {
    color: red;
}
.fileType{
    color:#007bff;
}
.para1{
    color:red;
}
.para2{
    color:#007bff;;
    font-size: 15px;
}
.textArea{
    color:#007bff;;
}
.success{
    color:darkcyan;
}
.vue-csv-uploader{
    border: 1px solid black;
}
.child-div{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 380px;
}
.span1{
    font-weight: bold;
    padding-right: 10px;
}
</style>