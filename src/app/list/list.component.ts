import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

interface Task {
  taskName: string;
  isCompleted: boolean;
  isEditable: boolean;
}


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  
  constructor(){ }

  ngOnInit() : void {
    this.getFromLocalStorage();
  }


  taskArray : Task[] = [];
  onSubmit(form : NgForm){

      console.log(form);

      this.taskArray.push({
        taskName:form.controls['task'].value,
        isCompleted:false,
        isEditable:false
      })

      this.saveToLocalStorage()

      form.reset(); 
    }

    onDelete(ind : number){
        console.log(ind);

        this.taskArray.splice(ind,1)

        this.saveToLocalStorage()
    }

    onCheck(ind : number){
      console.log(this.taskArray)

      this.taskArray[ind].isCompleted = !this.taskArray[ind].isCompleted

      this.saveToLocalStorage()
    }

    onEdit(ind :number){
        this.taskArray[ind].isEditable=true
        this.saveToLocalStorage()
    }

    onSave(ind:number , newTask:string){
        this.taskArray[ind].taskName=newTask;
        this.taskArray[ind].isEditable=false;
        this.saveToLocalStorage()
    }

    saveToLocalStorage(){
      let stringJSON = JSON.stringify(this.taskArray)
      localStorage.setItem('todolist',stringJSON);
    }

    getFromLocalStorage(){
      let itemsJSONString = localStorage.getItem('todolist')
      if(itemsJSONString!=null){
        this.taskArray = JSON.parse(itemsJSONString)
      }
    }
}
