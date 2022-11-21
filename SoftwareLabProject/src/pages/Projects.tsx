import React from 'react';
import './../App.css'
import {useNavigate, useLocation} from 'react-router-dom';
import { Button, Grid, TextField} from '@material-ui/core';
import { BorderAllOutlined, FirstPage } from '@material-ui/icons';

function Projects(){
    const navigate = useNavigate();
    const {state} = useLocation();
    const {ID, USERNAME} = state;
    
    interface project_type{
        name: string;
        hardware: number[];
        capacity: number[];
    }
    const [projects, setProjects] = React.useState<project_type[] | null>([]);

    React.useEffect(() => {

        function getProjects(ID: any){
            if(ID === undefined){
                console.log("NO ID? UNDEFINED");
                return [];
            }
    
            fetch('/getProjects', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({'userID':ID}),
              })
              .then((response) => response.json())
              .then((data)=>{
                console.log(data);
                const list: project_type[] = [];
                data.forEach((project: project_type) =>{
                    list.push({'name':project.name,'hardware':project.hardware, 'capacity': project.capacity})
                })
                setProjects(list);
                
    
              })
              .catch((error)=>{
                if(error.response){
                    console.log(error);
                    console.log(error.response.statuts);
                    console.log(error.response.headers);
                  }
              })
          }

        const projectlist = getProjects(ID);
        console.log(`hello heres data from ${projectlist}`);
        
      }, [ID]);


      
    return(
        <div className='App'>
            <div style = {{display:'inline-flex', float:'left', marginLeft:20}}>
                {USERNAME === 'loginUser' ? <h1>Welcome {ID} !</h1> : <h1>Welcome {USERNAME} !</h1>}
            </div>
            { projects?.map((project: { name: any; }) => <Projectview key={project.name} project={project} />) }
            <div style = {{display:'inline-flex', float:'right', margin:20}}>
                <Button variant = 'contained' color = 'primary' onClick = {()=> navigate('/')}> Sign Out</Button>
            </div>
        </div>
    );
}

function Projectview(props: any){

    const [available_hardware_1, setHardware_1] = React.useState(props.project.hardware[0]);
    const [available_hardware_2, setHardware_2] = React.useState(props.project.hardware[1]);
  

    return(<div>
        <Grid container spacing = {2} justifyContent = "flex-start" style = {{flexDirection:'row', borderBlockStyle: 'solid', height: '160px'}}>
            <Grid item xs = {4} sm = {2} style = {{margin:0}}>
                <h2> {props.project.name}</h2>
            </Grid>
            <Grid item xs = {4} sm = {2} justifyContent = "center" style = {{flexDirection: 'column', padding:'30px'}}>
                <h3 style = {{'whiteSpace': 'nowrap'}}>HWSET1: {available_hardware_1}/{props.project.capacity[0]}</h3>
                <h3 style = {{'whiteSpace': 'nowrap'}}>HWSET2: {available_hardware_2}/{props.project.capacity[1]}</h3>
            </Grid>
            <Grid item xs = {4} sm = {2}  style = {{padding: 20}}>
                <TextField variant = 'outlined' id = "hardwareset_1"  label = "Enter QTY" type = "number"  margin = "dense" >

                </TextField>
                <TextField variant = 'outlined' id = "hardwareset_2" label = "Enter QTY" type = "number" margin = "dense">

                </TextField>
            </Grid>
            <Grid item xs = {4} sm = {2}  style = {{flexDirection: 'column', padding:20}}>
                <Button variant = "outlined" style = {{margin:10, width: '100%'}}> Check In</Button>
                <Button variant = "outlined" style = {{margin:10, width: '100%'}}> Check In</Button>
            </Grid>
            <Grid item xs = {4} sm = {2} style = {{flexDirection: 'column', padding:20}}>
                <Button variant = "outlined" style = {{margin:10, width: '100%'}}> Check Out</Button>
                <Button variant = "outlined" style = {{margin:10, width: '100%'}}> Check Out</Button>
            </Grid>
            <Grid item xs = {4} sm = {2} justifyContent = "center" alignContent = "center" style = {{flexDirection: 'column', padding:50}}>
                <Button variant = "contained" color = "primary" style = {{height: '40px', width:'100%'}}> LEAVE </Button>
            </Grid>
        </Grid>
    </div>);
}

export default Projects;
