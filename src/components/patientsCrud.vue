<template>
    <div class="patients">
      <h1>{{ dashbourdcrud }}</h1>
      <div class="add-patient">
    <button @click="()=>showAddPopUp=true" class="btn add"> + Add new</button>
   </div>
<div class="dashboard">
    <div  class="sideber">
        <router-link to="/"><i class="fa-solid fa-users"></i></router-link> 
        <router-link to="/patientsCrud"><i class="fa-solid fa-hospital-user"></i></router-link>
    </div>
    <!-- add Popup -->
    <div class="popup" v-if="showAddPopUp">
        <div class="popupWapper">
            <div class="myform">
                <h3>Create new</h3>
                <span @click="()=>showAddPopUp=false" class="close">x</span>
                    <!-- cant be empty -->
                    <input type="text" v-model="patientName" placeholder="patient name">
                    <span class="error" v-show="nameerror">cant be empty</span>
                    <input type="text" v-model="lastName" placeholder="patient lastname">
                    <span class="error" v-show="lastNameError">cant be empty</span>
                    <input type="text" v-model="gender" placeholder="patient gender">
                    <span class="error" v-show="genderError">cant be empty</span>
                    <input type="text" v-model="patientAge" placeholder="patient age">
                    <span class="error" v-show="ageerror">cant be empty</span>
                    <input type="text" v-model="phoneNumber" placeholder="patient phone number">
                    <span class="error" v-show="PhoneError">cant be empty</span>
                    <button @click="addPatient" class="btn">{{ btnText }}</button>
                    
            </div> 
        </div> 
    </div>

    <!-- Edit -->
    <div class="popup" v-if="showEditPopUp">
        <div class="popupWapper">
            <div class="myform">
                <h3>Edit</h3>
                <span @click="()=>showEditPopUp=false" class="close">x</span>
                    <!-- cant be empty -->
                    <input type="text" v-model="editData.firstName" placeholder="employee name">
                    <span class="error" v-show="nameerror">cant be empty</span>
                    <input type="text" v-model="editData.lastName" placeholder="employee lastname">
                    <span class="error" v-show="lastNameError">cant be empty</span>
                    <input type="text" v-model="editData.gender" placeholder="employee gender">
                    <span class="error" v-show="genderError">cant be empty</span>
                    <input type="text" v-model="editData.age" placeholder="patient age">
                    <span class="error" v-show="ageerror">cant be empty</span>
                    <input type="text" v-model="editData.phone" placeholder="patient phone number">
                    <span class="error" v-show="PhoneError">cant be empty</span>
                    <button  @click="updatePatient" class="btn">Edit</button>
            </div> 
        </div> 
    </div>

   
    <!-- table list -->
<div class="thetable fix-width scroll-inner">
    <table class="table">
    <thead>
        <!-- row -->
        <tr> 
            <th>patient name</th>
            <th>last name</th>
            <th>gender</th>
            <th>age</th>
            <th>phone number</th>
            <th>operations</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(patient,index) in data" :key="index">
            <td>{{ patient.firstName }}</td>
            <td>{{ patient.lastName }}</td>
            <td>{{ patient.gender }}</td>
            <td>{{ patient.age }}</td>
            <td>{{ patient.phone }}</td>
            <td> <button class="btn" @click="updateit(patient)"><i class="fa-solid fa-pen"></i></button> <button class="btn delete" @click="deleteit(patient.id,index)"><i class="fa-solid fa-trash"></i></button></td>
            <!-- <td ></td> -->
        </tr>
    </tbody>
 </table>
</div>
</div>

  </div>
</template>
<script>
import axios from 'axios';
import swal from 'sweetalert2';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
export default {
    name:'homeCrud',
    data(){
        return{
            dashbourdcrud:"patients Crud Dashboard",
            btnText:"Add Patient",
            sucess:"",
            edit:false,
            added:false,
            data:[],
            patientName:"",
            lastName:"",
            gender:"",
            phoneNumber:"",
            patientAge:"",
            Patientid:"",
            nameerror:false,
            ageerror:false,
            lastNameError:false,
            genderError:false,
            PhoneError:false,
            showEditPopUp:false,
            showAddPopUp:false,
            showSideBar:false,
            editData:{},
            hover:false,
        }
    },
    methods:{
      async  addPatient(){
         //check if input is empty before submit
        if (!this.patientName) {
        this.nameerror=true;
      }
      else{
        this.nameerror=false;
      }
      if (!this.lastName) {
        this.lastNameError=true;
      } 
      else{
        this.lastNameError=false;
      }
      if(!this.gender){
        this.genderError=true;
      }
      else{
        this.genderError=false;
      }
      if(!this.patientAge){
        this.ageerror=true;
      }
      else{
        this.ageerror=false;
      }
      if(!this.phoneNumber){
        this.PhoneError=true;
      }
      else{
        this.PhoneError=false;
      }

      if(!this.nameerror&&!this.lastNameError&&!this.genderError&&!this.ageerror&&!this.PhoneError){
      axios.post("https://dummyjson.com/users/add",{
            firstName:this.patientName,
            lastName:this.lastName,
            gender:this.gender,
            age:Number(this.patientAge),
            phone:this.phoneNumber,
        })
        .then(({data})=>{
              //add to the begin of the list
            this.data.unshift({
                firstName:data.firstName,
                lastName: data.lastName,
                gender:data.gender,
                age:data.age,
                phone:data.phone
            })
            swal.fire("patient added successfully");   
            this.showAddPopUp=false;
        });
      
      }
        },
        async getemps(){
            //get 5 rows of data ,select firstName ,lastName,age,gender,phone form fake api https://dummyjson.com
            await axios.get('https://dummyjson.com/users?limit=5&select=firstName,lastName,gender,age,phone').then(({data:mydata})=>{
                    let res = mydata.users;
                    console.log(res);
                  this.data=res;
                  });            

        },
       async updateit(patient){
        this.showEditPopUp=true;
        this.editData=patient;
        
        
        },
       async deleteit(id,index){
          //delete from db and list
            swal.fire({
                    title: 'Are you sure?',
                    text: "You want to delete this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then(async(result) => {
                    if (result.isConfirmed) {
                        let res2=await axios.delete(`https://dummyjson.com/users/${id}`);
                        if(res2.status==200){
                            this.data.splice(index,1);
                            swal.fire(
                        'Deleted!',
                        'patient deleted sucessfully',
                        'success'
                        )
                        }    
                        else{
                        console.log("something went wrong");
       }  
                    }
                    })

              

              
        },
       async updatePatient(){
            //update data with obj which has the new data
            let result=await axios.put(`https://dummyjson.com/users/${(this.editData.id)}`,this.editData); 
        if(result.status==200){     
            swal.fire("patient updated successfully");   
             this.showEditPopUp=false;
        }
    }
    },
    created(){
       this.getemps();
    }

}
</script>

<style lang="scss">
$main-color:#5F9EA0;
.patients{
    height: 100vh;
    position: relative;
    h1{
        font-size: 25px;
        text-transform: uppercase;
        color: #605f5f;
        letter-spacing: 1px;
        
    }
 .add-patient{
    text-align: right;
    .add{
        padding:10px;
        border: none;
        color: white;
        font-size: 20px;
        background-color: #5F9EA0;
        border-radius: 5px;
        margin-right: 50px;
        cursor: pointer;
    }
 }
.dashboard{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .sideber{
        position: fixed;
        top: 20%;
        left: 0;
        width: 110px;
        box-shadow:0px 4px 5px rgba(0, 0, 0, 0.75);
        background:rgba(0, 0, 0, 0.75);
        color: white;
        border-radius:5px ;
        height: 200px;
       display: flex;
       justify-content: center;
       align-items: center;
       flex-direction: column;
       gap: 20px;
        a{
            text-decoration: none;
            color: white;
        }
        i{
            text-align: center;
            display: block;
            font-size: 25px;
            color: white;
            margin-bottom: 10px;
            &:hover{
                color: $main-color;
            }
        }
        span.info{
            color: white;
            margin: 10px;
            text-transform: uppercase;
        }
    }

    .popup
    {
            position: absolute;
            inset: 0px;
             top: -20%;
            background-color: #2b28274d;
            height: 100%;
            z-index: 20;
            .popupWapper{
                display: flex;
                align-items: center;
                justify-content: center;
            }
    }

.myform{
    margin-top:100px ;
    background-color:white ;
    padding: 30px;
    @media (max-width:768px) {
        padding: 20px;
    }
    border-radius: 5px;
    position: relative;
    .close{
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background-color: #5F9EA0;
        color: white;
        width: 40px;
        height: 40px;
        font-size: 22px;
        border-radius: 50%;
        position: absolute;
        top: 15px;
        right: 15px;
        &:hover{
            color: red;
        }
    }
    input{
        width: 420px;
        height: 2.3rem;
        font-size: 20px;
        background-color: rgb(225, 223, 223);
        border:0;
        outline: 0;
        border-radius: 10px;
        margin: 20px;
        display: block;
        padding-left: 20px;
      @media (max-width:768px) {
            width: 300px;
          }
          &:focus{
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 11px 0px;
          }


    }
    .btn{
        text-align: left;
        display: block;
        padding:10px 20px;
        width: 200px;
        text-align: center;
        text-transform: uppercase;
        background-color: $main-color;
        box-shadow: rgba(77, 77, 85, 0.414) 0px 7px 29px 0px;
        color: white;
        font-size: 16px;
        cursor: pointer;
        border: 0;
        border-radius: 15px; 
        &:hover{
            color: $main-color;
            background-color: white;
        }
    }
    .sucess{
        color: $main-color;
        text-align: center;
    }
    
}
.thetable{
    margin:40px 30px;
    border-radius:5px;
    width: 800px;
    &.fix-width {
        @media (max-width:1100px) {
          width: 700px;
          
      }
      @media (max-width:768px) {
          width: 340px;
          
      }
	overflow-y: hidden;
	overflow-x: auto;
	-webkit-overflow-scrolling: touch;
}
&.scroll-inner {
	&::-webkit-scrollbar {
		width: 10px;
	}
	&::-webkit-scrollbar:horizontal {
		height: 10px;
	}
	&::-webkit-scrollbar-track {
		background-color: transparentize(#ccc, 0.7);
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: transparentize($main-color, 0.5);
		box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
	}
}
    .table{
    width: 800px;
    border-collapse: separate;
  border-spacing: 0 10px;
    text-align: center;
    border-radius: 5px;
    th,td{
        padding:10px;
          
    }
    td:first-child,
th:first-child {
  border-radius: 10px 0 0 10px;
}
td:last-child,
th:last-child {
  border-radius: 0 10px 10px 0;
}
   thead{
    border-radius: 5px;
    color: white;
    background-color: $main-color;
        text-transform: uppercase;    
        height: 40px;   
   }
   tbody{
    tr{
        border-radius: 10px;
            background-color: rgb(232, 230, 230);
        }
   } 
   .btn{
        width: 50px;
        height: 50px;
        border-radius: 50%; 
        text-align: center;
        text-transform: uppercase;
        background-color: $main-color;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        color: white;
        font-size: 16px;
        border: 0;      
        cursor: pointer;
        &:hover{
            color: $main-color;
            background-color: white;
        }
        &.delete{
            background-color: rgb(206, 23, 23);
        }
    }
}
}
}
}
</style>