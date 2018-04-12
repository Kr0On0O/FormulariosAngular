import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import {Observable} from 'rxjs/Rx'
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {
  forma:FormGroup;

  usuario:Object={
    nombrecompleto:{
      nombre:"fernando",
      apellido:"herrera",
    },
    correo:"fernando.herrera85@gmail.com",
    pasatiempos:["Correr","Dormir","Comer"]
  }

  constructor() {
    console.log(this.usuario);

    this.forma=new FormGroup({
      'nombrecompleto':new FormGroup({
        'nombre':new FormControl('',[
          Validators.required,
          Validators.minLength(3)
        ]),
        'apellido':new FormControl('',[
          Validators.required,
          this.noHerrera
        ])
      }),

      'correo':new FormControl('',[
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
      ]),
      'pasatiempos':new FormArray([
        new FormControl('Correr',Validators.required)
      ]),
      'username':new FormControl('',[
        Validators.required,
        this.existeUsuario
      ]),
      'pasword1':new FormControl('',Validators.required),
      'pasword2':new FormControl('',Validators.required)
    })
    this.forma.controls['pasword2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ])

    this.forma.valueChanges.subscribe(data=>{console.log(data);})
    // this.forma.setValue(this.usuario);
  }
  agregarPasatiempo(){
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('Dormir',Validators.required)
    )
  }

  noHerrera(control:FormControl):{[s:string]:boolean}{
    if (control.value==="herrera"){
      return {
        noherrera:true
      }
    }
    return null;
  }

  noIgual(control:FormControl):{[s:string]:boolean}{
    let forma:any=this;
    if(control.value!== forma.controls['pasword1'].value){
      return{
        noiguales:true
      }
    }
    return null;
  }

existeUsuario(control:FormControl):Promise<any>|Observable<any>{
let promise=new Promise(
  (resolve,reject)=>{
    setTimeout(()=>{
      if(control.value=="strider"){
        resolve({existe:true})
      }else{
        resolve(null)
      }
    },3000)
  }
)
return promise

}
  guardarCambios(){
    console.log(this.forma.value);
    console.log(this.forma);
    // this.forma.reset(this.usuario);
  }
}
