<template>
  <div class="newhome">
    <h1>{{ dashbourdcrud }}</h1>
   <div class="addEmp">
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
                    <input type="text" v-model="empname" placeholder="employee name">
                    <span class="error" v-show="nameerror">cant be empty</span>
                    <input type="text" v-model="emplastname" placeholder="employee lastname">
                    <span class="error" v-show="lastNameError">cant be empty</span>
                    <input type="text" v-model="empage" placeholder="employee age">
                    <span class="error" v-show="ageerror">cant be empty</span>
                    <button @click="addemployee" class="btn">{{ btnText }}</button>
                    
            </div> 
        </div> 
    </div>

    <!-- Edit Popup-->
    <div class="popup" v-if="showEditPopUp">
        <div class="popupWapper">
            <div class="myform">
                <h3> Edit</h3>
                <span @click="()=>showEditPopUp=false" class="close">x</span>
                    <!-- cant be empty -->
                    <input type="text" v-model="editData.firstName" placeholder="employee name">
                    <span class="error" v-show="nameerror">cant be empty</span>
                    <input type="text" v-model="editData.lastName" placeholder="employee lastname">
                    <span class="error" v-show="lastNameError">cant be empty</span>
                    <input type="text" v-model="editData.age" placeholder="employee age">
                    <span class="error" v-show="ageerror">cant be empty</span>
                    <!-- <button @click="addemployee" class="btn">{{ btnText }}</button> -->
                    <button  @click="updateemployee" class="btn">Edit</button>
            </div> 
        </div> 
    </div>

   
    <!-- table List -->
<div class="thetable fix-width scroll-inner">
    <table class="table">
    <thead>
        <!-- row -->
        <tr> 
            <th>employee name</th>
            <th>last name</th>
            <th>age</th>
            <th>operations</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(emp,index) in data" :key="index">
            <td>{{ emp.firstName }}</td>
            <td>{{ emp.lastName }}</td>
            <td>{{ emp.age }}</td>
            <td> <button class="btn" @click="updateit(emp)"><i class="fa-solid fa-pen"></i></button> <button class="btn delete" @click="deleteit(emp.id,index)"><i class="fa-solid fa-trash"></i></button></td>
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
            dashbourdcrud:"Employees Crud Dashboard",
            btnText:"Add Employee",
            sucess:"",
            edit:false,
            added:false,
            data:[],
            empname:"",
            emplastname:"",
            empage:"",
            empid:"",
            nameerror:false,
            ageerror:false,
            lastNameError:false,
            showEditPopUp:false,
            showAddPopUp:false,
            showSideBar:false,
            editData:{},
            hover:false,
        }
    },
    methods:{
      async  addemployee(){
        //check if input is empty before submit
        if (!this.empname) {
        this.nameerror=true;
      }
      else{
        this.nameerror=false;
      }
      if (!this.emplastname) {
        this.lastNameError=true;
      } 
      else{
        this.lastNameError=false;
      }
      if(!this.empage){
        this.ageerror=true;
      }
      else{
        this.ageerror=false;
      }

      if(!this.nameerror&&!this.ageerror&&!this.lastNameError){
      axios.post("https://dummyjson.com/users/add",{
            firstName:this.empname,
            lastName:this.emplastname,
            age:Number(this.empage),
        })
        .then(({data})=>{
            //add to the begin of the list
            this.data.unshift({
                firstName:data.firstName,
                lastName: data.lastName,
                age:data.age
            })
            swal.fire("employee added successfully");   
            this.showAddPopUp=false;
        });
      
      }
        },
        async getemps(){
            //get 5 rows of data ,select firstName ,lastName,age form fake api https://dummyjson.com
            await axios.get('https://dummyjson.com/users?limit=5&select=firstName,lastName,age').then(({data:mydata})=>{
                    let res = mydata.users;
                    console.log(res);
                  this.data=res;
                  });            

        },
       async updateit(emp){
        this.showEditPopUp=true;
        this.editData=emp;
        
        
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
                        'employee deleted sucessfully',
                        'success'
                        )
                        }    
                        else{
                        console.log("something went wrong");
       }  
                    }
                    })

              

              
        },
       async updateemployee(){
           //update data with obj which has the new data
            let result=await axios.put(`https://dummyjson.com/users/${(this.editData.id)}`,this.editData); 
        if(result.status==200){     
            swal.fire("employee updated successfully");   
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
.newhome{
    height: 100vh;
    position: relative;
    h1{
        font-size: 25px;
        text-transform: uppercase;
        color: #605f5f;
        letter-spacing: 1px;
        
    }
 .addEmp{
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
        width: 80px;
        box-shadow:0px 4px 5px rgba(0, 0, 0, 0.75);
        background:rgba(0, 0, 0, 0.75);
        color: white;
        border-radius:5px ;
        height: 150px;
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
    border-radius: 5px;
    position: relative;
    @media (max-width:768px) {
        padding: 20px;
    }
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
        padding-left: 20px;
        display: block;

      @media (max-width:768px) {
            width: 300px;
          }
          &:focus{
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 11px 0px;
          }


    }
    .btn{
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