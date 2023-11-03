import { Component } from '@angular/core';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.scss'],
})
export class UploadExcelComponent {

  constructor(private storage: Storage){
  }

  loadExcel($event: any){
    const file = $event.target.files[0];
    const excelRef = ref(this.storage, `excels/${file.name}`);

    uploadBytes(excelRef, file).then(x =>{
      console.log(x);
    }).catch(err => console.log(err))
  }
}